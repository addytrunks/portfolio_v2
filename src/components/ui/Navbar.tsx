"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Github, Linkedin} from "lucide-react";
import { useRouterHash } from "@/hooks/useRouterHash";

const navItems = [
  { name: "home", path: "/", hash:"" },
  { name: "about", path: "/#about" , hash:"about"},
  { name: "skills", path: "/#skills" , hash:"skills"},
  { name: "projects", path: "/#projects" , hash:"projects"},
  { name: "achievements", path: "/#achievements" , hash:"achievements"},
  { name: "contact", path: "/#contact" , hash:"contact"},
];

const Navbar = () => {
  const pathname = usePathname();
  const hash = useRouterHash();

  return (
    <nav className="mb-4 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-2 rounded-b-lg border-b border-gray-800/50">
      <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path} className="group relative flex items-center">
            <span className="text-gray-500 mr-1 group-hover:text-primary transition-colors">{">"}</span>
            <span className=
            {cn(
              "text-gray-300 group-hover:text-primary transition-colors",
              hash === item.hash && "text-primary font-bold text-glow"
            )}> 
              {item.name}
            </span>
            {hash === item.hash && (
              <motion.span
                layoutId="cursor"
                className="ml-1 w-2 h-4 bg-primary inline-block animate-pulse"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <a 
          href="https://github.com/addytrunks" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <a 
          href="https://linkedin.com/in/adhithya-srivatsan-359973211/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
