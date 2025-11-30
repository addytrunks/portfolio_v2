"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileText } from "lucide-react";

import contactData from "@/app/data/contact.json";

const Contact = () => {
  const { email, resumeLink, resumeText } = contactData;

  return (
    <section id="contact" className="py-20 border-t border-gray-900 mb-20 min-h-[60vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">
          <span className="text-secondary">05.</span> Contact
        </h2>

        <div className="flex flex-col items-center space-y-6 mb-12">
          <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
            <Mail className="w-5 h-5 text-secondary group-hover:animate-bounce" />
            <a href={`mailto:${email}`} className="text-xl font-mono">
              {email}
            </a>
          </div>
          
          <a 
            href={resumeLink} 
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-primary transition-colors border border-gray-800 px-4 py-2 rounded-full hover:border-primary/50"
          >
            <FileText className="w-4 h-4" />
            <span>{resumeText}</span>
          </a>
        </div>

        <form className="space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                className="w-full bg-[#111] border border-gray-800 rounded p-3 text-gray-300 focus:border-primary focus:outline-none transition-colors"
                placeholder="Adhithya Srivatsan"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                className="w-full bg-[#111] border border-gray-800 rounded p-3 text-gray-300 focus:border-primary focus:outline-none transition-colors"
                placeholder="adhithya@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Subject</label>
            <input 
              type="text" 
              className="w-full bg-[#111] border border-gray-800 rounded p-3 text-gray-300 focus:border-primary focus:outline-none transition-colors"
              placeholder="Collaboration Opportunity"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Message</label>
            <textarea 
              rows={5}
              className="w-full bg-[#111] border border-gray-800 rounded p-3 text-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Hi, I'm interested in your work on..."
            ></textarea>
          </div>

          <button 
            type="button"
            className="w-full bg-primary/10 border border-primary text-primary font-bold py-4 rounded hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>Send Message</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
