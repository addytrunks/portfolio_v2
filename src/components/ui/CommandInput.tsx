"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CommandInput = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      let response = "";

      switch (command) {
        case "help":
          response = "Available commands: help, about, skills, projects, contact, clear";
          break;
        case "about":
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          response = "Navigating to About section...";
          break;
        case "skills":
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          response = "Navigating to Skills section...";
          break;
        case "projects":
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          response = "Navigating to Projects section...";
          break;
        case "contact":
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          response = "Navigating to Contact section...";
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        case "":
          response = "";
          break;
        default:
          response = `Command not found: ${command}. Type 'help' for available commands.`;
      }

      if (response) {
        setOutput((prev) => [...prev, `> ${input}`, response]);
      } else if (input) {
         setOutput((prev) => [...prev, `> ${input}`]);
      }
      
      setInput("");
    }
  };

  useEffect(() => {
    if (output.length > 0) {
      // Auto-scroll to bottom of terminal output if needed
    }
  }, [output]);

  return (
    <div className="mt-8 font-mono text-sm">
      <div className="space-y-1 mb-2 text-gray-400">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="flex items-center text-primary">
        <span className="mr-2">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-600"
          placeholder="Type 'help' for commands..."
          autoFocus
        />
      </div>
    </div>
  );
};

export default CommandInput;
