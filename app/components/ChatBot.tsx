"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Bot, Loader2 } from "lucide-react";

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
            <div className="bg-zinc-800 text-zinc-100 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                />
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                />
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                />
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-80 md:w-96 h-[500px] bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-zinc-900 flex justify-between items-center bg-gradient-to-r from-zinc-900 to-zinc-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                    <Image src="/BotIcon/boticon.gif" alt="Bot Icon" width={32} height={32} className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">ElevenX Assistant</h3>
                                    <p className="text-xs text-green-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white transition p-1 hover:bg-white/10 rounded-md"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="p-4 border-t border-white/10 bg-zinc-900"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full bg-zinc-800 border border-white/5 text-white text-sm rounded-xl py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 transition"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 transition"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    delay: 1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative group"
            >
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-24 h-24 overflow-hidden flex items-center justify-center">
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
