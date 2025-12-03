"use client";

import React from "react";
import { motion } from "framer-motion";

import aboutData from "@/app/data/about.json";

const About = () => {
	const { paragraphs, closing, profile } = aboutData;

	return (
		<section id="about" className="py-20 border-t border-gray-900">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary flex items-center">
					<span className="mr-2 text-secondary">01.</span> About Me
				</h2>

				<div className="flex flex-col md:grid md:grid-cols-3 gap-10">
					<div className="md:col-span-2 space-y-4 text-gray-300 leading-relaxed order-2 md:order-1">
						{paragraphs.map((para, index) => (
							<p key={index}>
								<span className="text-secondary">{">"}</span> {para}
							</p>
						))}
						<p className="text-primary font-mono mt-4">{closing}</p>
					</div>

					<div className="relative group order-1 md:order-2 mb-8 md:mb-0">
						<div className="absolute inset-0 bg-primary rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
						<div className="relative bg-[#111] border border-gray-800 p-4 rounded-lg">
							<div className="text-xs text-gray-500 mb-2">
								user_profile.json
							</div>
							<pre className="text-xs text-green-400 overflow-x-auto">
								{JSON.stringify(profile, null, 2)}
							</pre>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default About;
