/* eslint-disable react-hooks/purity */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Bot } from "lucide-react";
import { findBestMatch } from "../utils/brain";
import { suggestions } from "../utils/data";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", text: "Hello! I'm Emmanuel. How can I help you with Hemmyevo today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userText = text;
    setInput("");
    
    // User Message
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Artificial Intelligence Delay
    setTimeout(() => {
      const result = findBestMatch(userText);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", text: result.answer };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans relative overflow-hidden flex items-center justify-center">
      
      {/* --- MOCK LANDING PAGE BACKGROUND (So you can see the widget floating) --- */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-200 h-200 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-200 h-200 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">Hemmyevo Store</h1>
             <p className="text-xl text-white/50">Premium Fashion. delivered.</p>
        </div>
      </div>

      {/* --- FLOATING WIDGET CONTAINER --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-95 h-150 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* --- Header --- */}
              <div className="p-4 bg-linear-to-r from-purple-900/50 to-blue-900/50 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center border border-white/20">
                      <Bot size={20} className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Emmanuel (AI)</h3>
                    <p className="text-xs text-white/50">Customer Success</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* --- Messages --- */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-linear-to-b from-transparent to-black/20">
                 {/* Timestamp */}
                 <div className="text-center text-[10px] text-white/20 font-medium uppercase tracking-widest my-4">Today</div>
                 
                 {messages.map((msg) => (
                   <motion.div 
                     key={msg.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                   >
                     <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                       msg.role === "user" 
                         ? "bg-white text-black rounded-br-none" 
                         : "bg-white/10 border border-white/5 text-gray-100 rounded-bl-none"
                     }`}>
                       {msg.text}
                     </div>
                   </motion.div>
                 ))}

                 {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100" />
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                 )}
                 <div ref={messagesEndRef} />
              </div>

              {/* --- Input Area --- */}
              <div className="p-4 border-t border-white/10 bg-black/40">
                {/* Suggestions */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3 pb-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/30 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Text Field */}
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full focus-within:border-purple-500/50 transition-colors">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Ask Emmanuel..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white px-4 py-3 placeholder-white/30"
                  />
                  <button 
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className={`mr-1 p-2 rounded-full transition-all ${
                       input.trim() ? "bg-purple-600 text-white" : "text-white/20"
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </div>
                
                {/* Footer Branding */}
                <div className="text-center mt-3">
                  <p className="text-[10px] text-white/20">
                    Made by <span className="text-white/40 font-medium">Atilola Emmanuel Oluwatoba</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- TOGGLE BUTTON (BUBBLE) --- */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-neutral-800 text-white" : "bg-linear-to-tr from-purple-600 to-blue-600 text-white"
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>

    </div>
  );
}