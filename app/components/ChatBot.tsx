"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Show typing indicator
        setIsTyping(true);

        // 1 second artificial delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) throw new Error("Failed to fetch");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = "";

            if (reader) {
                // Remove typing indicator and add empty assistant message for streaming
                setIsTyping(false);
                setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    assistantContent += chunk;

                    setMessages((prev) => {
                        const lastMessage = prev[prev.length - 1];
                        if (lastMessage.role === "assistant") {
                            return [...prev.slice(0, -1), { ...lastMessage, content: assistantContent }];
                        }
                        return prev;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
            ]);
        }
    };

    const TypingIndicator = () => (
        <div className="flex justify-start">
            <div className="bg-white text-zinc-500 p-3 rounded-2xl rounded-tl-none border border-zinc-200/80 shadow-sm flex gap-1.5 items-center">
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="mb-3 w-[calc(100vw-2rem)] sm:w-96 h-[480px] sm:h-[520px] max-h-[82vh] bg-white/95 backdrop-blur-2xl border border-zinc-200/90 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-200/80 shadow-sm bg-white flex items-center justify-center">
                                    <Image
                                        src="/BotIcon/boticon.gif"
                                        alt="Bot Icon"
                                        width={36}
                                        height={36}
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <h3 className="text-zinc-900 font-bold text-sm">ElevenX Assistant</h3>
                                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                                className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition p-1.5 rounded-lg"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-50/40">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[82%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/20 font-medium"
                                            : "bg-white text-zinc-800 rounded-tl-none border border-zinc-200/80 shadow-sm"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="p-3 border-t border-zinc-100 bg-white"
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything about ElevenX..."
                                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-sm rounded-xl py-2.5 pl-4 pr-11 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    aria-label="Send message"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition shadow-sm"
                                >
                                    <Send size={15} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Floating Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    delay: 0.6,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat assistant"
                className="relative group focus-visible:outline-none"
            >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden flex items-center justify-center drop-shadow-md">
                    <Image
                        src="/BotIcon/boticon.gif"
                        alt="Chat Bot"
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
            </motion.button>
        </div>
    );
};

export default ChatBot;
