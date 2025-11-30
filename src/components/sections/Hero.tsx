"use client";

import React from "react";
import { motion } from "framer-motion";
import CommandInput from "../ui/CommandInput";

import heroData from "@/app/data/hero.json";

const Hero = () => {
  const { name, role, welcome_message } = heroData;

  return (
    <section id="hero" className="min-h-[60vh] flex flex-col justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-primary text-sm md:text-lg mb-2 tracking-widest">
          <span className="text-gray-500">const</span> developer <span className="text-gray-500">=</span>
        </h2>
        
        <h1 className="text-3xl md:text-6xl font-bold mb-4 text-glow text-white">
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-2xl text-gray-400 mb-8 font-light"
        >
          <span className="text-secondary">"</span>{role}<span className="text-secondary">"</span>
        </motion.div>

        <div className="max-w-md">
          <p className="text-gray-500 mb-4 text-sm whitespace-pre-line">
            {welcome_message}
          </p>
          <CommandInput />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
