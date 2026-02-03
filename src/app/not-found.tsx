"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-8 text-center min-h-[50vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="relative"
            >
                {/* Background Glow */}
                <h1 className="text-[120px] md:text-[180px] font-bold leading-none select-none text-transparent bg-clip-text bg-linear-to-b from-primary to-transparent opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl">
                    404
                </h1>
                {/* Main Text */}
                <h1 className="text-8xl md:text-9xl font-bold text-white tracking-tighter relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    404
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-4 px-4"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest border-b border-gray-800 pb-4 inline-block">
                    <span className="text-destructive mr-2">Error:</span> Module Not Found
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto leading-relaxed font-mono text-sm md:text-base">
                    The requested resource is attempting to access a memory block that does not exist.
                    <span className="block mt-2 text-gray-500 text-xs">ERR_CODE: IDX_OUT_OF_BOUNDS</span>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-8"
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-gray-600 mb-2 uppercase tracking-widest">Suggested Action</p>
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-3 px-8 py-3 text-sm font-mono font-medium tracking-wide text-primary border border-primary/50 bg-primary/5 hover:bg-primary/10 rounded-sm transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    >
                        <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
                        <span>return_home()</span>
                    </Link>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse delay-700"></div>
        </div>
    );
}
