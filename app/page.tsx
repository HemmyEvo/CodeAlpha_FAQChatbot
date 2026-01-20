"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot, ShoppingBag, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
// Import the local AI logic we created
import { findBestMatch } from "../utils/brain"; 

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export default function ChatbotPage() {
  // --- State ---
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Hello! Welcome to Hemmyevo Store. 👋 I'm your AI assistant. Ask me about our products, shipping, or returns!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // --- Refs ---
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Auto-scroll to bottom ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- Handler ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput(""); // Clear input immediately

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate "Thinking" Delay (makes it feel natural)
    setTimeout(() => {
      // 3. Get Answer from Brain
      const result = findBestMatch(userText);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: result.answer,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800); // 800ms delay
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* --- Background Effects --- */}
      <div className="absolute top-[-20%] right-[-10%] w-150 h-150 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- Header --- */}
      <header className="flex-none flex items-center justify-between p-4 md:px-6 border-b border-white/5 bg-black/20 backdrop-blur-lg z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
            </div>
            <div>
              <h1 className="font-semibold text-sm md:text-base">Hemmyevo Support</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-white/40">Online</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setMessages([messages[0]])} // Reset to initial welcome
          className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Restart Chat"
        >
          <RefreshCcw size={18} />
        </button>
      </header>

      {/* --- Chat Area --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide z-10">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={msg.id}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-end gap-2 max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                msg.role === "user" ? "bg-white/10" : "bg-linear-to-tr from-blue-600 to-cyan-600"
              }`}>
                {msg.role === "user" ? <User size={14} className="text-white/70" /> : <Bot size={14} className="text-white" />}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === "user" 
                  ? "bg-white text-black rounded-br-none" 
                  : "bg-white/5 border border-white/10 text-gray-100 rounded-bl-none backdrop-blur-md"
              }`}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
             <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-cyan-600 flex items-center justify-center">
                <Bot size={14} className="text-white" />
             </div>
             <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
               <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100" />
               <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200" />
             </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* --- Input Area --- */}
      <div className="flex-none p-4 md:p-6 bg-black/20 backdrop-blur-md border-t border-white/5 z-20">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-white/5 border border-white/10 rounded-3xl p-2 pl-4 shadow-xl focus-within:border-blue-500/50 transition-colors">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 py-3 min-h-11"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              input.trim() 
                ? "bg-blue-600 text-white shadow-lg hover:scale-105 active:scale-95" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-white/20 mt-3">
          AI can make mistakes. Please verify important info.
        </p>
      </div>

    </div>
  );
}