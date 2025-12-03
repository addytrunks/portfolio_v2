"use client";
import { motion } from "framer-motion";
import CommandInput from "../ui/CommandInput";

import heroData from "@/app/data/hero.json";

const Hero = () => {
	const { name, role, welcome_message } = heroData;

	return (
		<section
			id="hero"
			className="min-h-[60vh] flex flex-col md:flex-row items-center justify-between py-10 gap-10"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="flex-1"
			>
				<h2 className="text-primary text-sm md:text-lg mb-2 tracking-widest">
					<span className="text-gray-500">const</span> developer{" "}
					<span className="text-gray-500">=</span>
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
					<span className="text-secondary">"</span>
					{role}
					<span className="text-secondary">"</span>
				</motion.div>

				<div className="max-w-md">
					<p className="text-gray-500 mb-4 text-sm whitespace-pre-line">
						{welcome_message}
					</p>
					<CommandInput />
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5, duration: 0.8 }}
				className="hidden md:block w-64 h-64 lg:w-80 lg:h-80 relative group"
			>
				<div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-primary/50 shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_30%,transparent)] group-hover:shadow-[0_0_50px_color-mix(in_srgb,var(--primary)_50%,transparent)] transition-all duration-300">
					<img
						src="/pixel-me.png"
						alt="Pixelated Portrait"
						className="w-full h-full object-cover pixelated hover:scale-110 transition-transform duration-500"
						style={{ imageRendering: "pixelated" }}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none"></div>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
