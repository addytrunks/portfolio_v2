"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, Globe, Layers, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

import skillsData from "@/app/data/skills.json";

const iconMap: { [key: string]: React.ReactNode } = {
  "Terminal": <Terminal className="w-4 h-4" />,
  "Globe": <Globe className="w-4 h-4" />,
  "Cpu": <Cpu className="w-4 h-4" />,
  "Database": <Database className="w-4 h-4" />
};

const skillCategories = skillsData.map(cat => ({
  ...cat,
  icon: iconMap[cat.icon]
}));

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("languages");

  return (
    <section id="skills" className="py-20 border-t border-gray-900 min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary flex items-center">
          <span className="mr-2 text-secondary">02.</span> System Diagnostics
        </h2>

        <div className="flex flex-col md:flex-row gap-8 bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 md:p-10 relative overflow-hidden">
          {/* Background Grid Animation */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-5 pointer-events-none">
            {[...Array(400)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-primary/20 aspect-square" />
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex md:flex-col gap-2 md:w-1/4 z-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-thin scrollbar-thumb-gray-800">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-mono transition-all whitespace-nowrap",
                  activeCategory === cat.id 
                    ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {activeCategory === cat.id && (
                  <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[300px] relative z-10 bg-black/50 rounded-lg border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
              <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                Module: {skillCategories.find(c => c.id === activeCategory)?.label}
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></div>
                <div className="text-xs text-green-500 font-mono">ONLINE</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                {skillCategories.find(c => c.id === activeCategory)?.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-[#111] border border-gray-800 p-3 rounded hover:border-secondary/50 transition-colors cursor-default overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-gray-300 font-mono text-sm group-hover:text-white transition-colors">
                        {skill}
                      </span>
                      <Layers className="w-3 h-3 text-gray-600 group-hover:text-secondary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
