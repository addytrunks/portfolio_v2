"use client";

import React from "react";
import { motion } from "framer-motion";

interface TerminalLayoutProps {
  children: React.ReactNode;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black p-2 md:p-8 flex items-center justify-center font-mono relative overflow-hidden">
      {/* CRT Overlay */}
      <div className="crt fixed inset-0 pointer-events-none z-50 opacity-20"></div>
      
      {/* Scanline */}
      <div className="scanline fixed inset-0 pointer-events-none z-40"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl bg-[#0c0c0c] border border-gray-800 rounded-lg shadow-2xl overflow-hidden relative z-10 flex flex-col h-[90vh]"
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-gray-500 text-xs tracking-widest uppercase">
            addy.srivats — -zsh — 80x24
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scroll-smooth">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalLayout;
