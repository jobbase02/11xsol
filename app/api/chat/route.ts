// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { messages } = json;

        // Clean messages for Groq compatibility (it expects simple strings for content)
        // This avoids 400 errors when complex content formats are sent in multi-turn
        const cleanMessages = messages.map((m: any) => ({
            role: m.role,
            content: Array.isArray(m.content)
                ? m.content.map((c: any) => c.text || c.input_text || '').join('')
                : m.content
        }));

        const systemPrompt = `You are Eleven, a premium sales strategist for ElevenX Solutions. Your goal is to convert website visitors into agency clients by sounding professional, tech-savvy, and premium. 

        STRICT RULES:
        1. NO FLUFF: Don't use phrases like "I hope this helps" or "As an AI assistant...". 
        2. SHORT ANSWERS: Maximum 2-3 sentences or a few bullet points per response.
        3. DIRECT: Answer the user's query in the first sentence itself.
        4. CTA (Call to Action): Use a CTA ONLY if the user shows high intent (e.g., asking for pricing or a project). If it's a general query, skip the CTA.
        5. **Match the user's language**: If the user chats in English, reply in professionally elegant English. If the user chats in Hinglish or Hindi, reply in natural, premium Hinglish.
        6. Never be purely robotic; sound like a helpful partner.
        7. MATCH THE USER'S ENERGY: 
            - If the user says "Hello", "Hi", "Hey", "Namaste", "Hi there", "Hello there", "Hey there", respond ONLY with a brief, professional greeting like "Hello! How can ElevenX help you today?" or "Hi there! What's on your mind?"
            - Do NOT talk about services or tech stack unless the user asks "What do you do?" or "Tell me about your services".

        TONE & STYLE:
        - Character: Confident, strategic, yet friendly. 
        - Closing: Always try to guide the user towards booking a "Discovery Call" via Calendly when appropriate.
        
        DATA REFERENCE:
        - Services: Next.js Dev, GSAP Animations, AI Chatbots, etc.
        - Projects: Haldwani Foods, MemberTrack, InvoiceGen, AI Mock Interview.
        - Pricing: Starts at ₹25,000.

        RESPONSE STYLE EXAMPLES:
        User: "What do you do?"
        Bot: "We build premium, animated websites using Next.js and GSAP for startups. Looking to scale your business?"

        User: "How much for a website?"
        Bot: "Our custom projects start at ₹25,000 depending on complexity. Want to book a 15-min discovery call to discuss details?"

        User: "Tell me about Haldwani Foods project."
        Bot: "It's a premium food brand website with integrated ordering and smooth GSAP animations. We focused on high-speed performance."

        You have access to the following knowledge base about ElevenX Solutions:
        ${JSON.stringify(require('../../data/website-content.json').map((p: any) => `URL: ${p.url}\nTitle: ${p.title}\nContent:\n${p.content}`).join('\n\n---\n\n'))}
        
        Use this knowledge to answer user questions accurately.`;

        // Using direct fetch to bypass AI SDK formatting bugs with certain providers like Groq
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...cleanMessages
                ],
                stream: true
            })
        });

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text();
            throw new Error(`Groq API error: ${groqResponse.status} ${errorText}`);
        }

        const reader = groqResponse.body?.getReader();
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let buffer = '';

        // Custom stream transformer for SSE -> Plain Text
        const stream = new ReadableStream({
            async start(controller) {
                if (!reader) {
                    controller.close();
                    return;
                }

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });
                        let lines = buffer.split('\n');
                        buffer = lines.pop() || '';

                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (!trimmed || !trimmed.startsWith('data: ')) continue;

                            const dataStr = trimmed.slice(6).trim();
                            if (dataStr === '[DONE]') continue;

                            try {
                                const data = JSON.parse(dataStr);
                                const content = data.choices[0]?.delta?.content || '';
                                if (content) {
                                    controller.enqueue(encoder.encode(content));
                                }
                            } catch (e) {
                                // Ignore incomplete JSON or malformed lines
                            }
                        }
                    }
                } catch (e) {
                    controller.error(e);
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(stream);

    } catch (error: any) {
        console.error(`Error in chat API: ${error.message || 'Unknown error'}`);
        return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), { status: 500 });
    }
}