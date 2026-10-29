"use client";

import { motion } from "framer-motion";
import experienceData from "@/app/data/experience.json";

const Experience = () => {
	return (
		<section id="experience" className="py-20 border-t border-gray-900">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<h2 className="text-2xl md:text-3xl font-bold mb-12 text-primary flex items-center">
					<span className="mr-2 text-secondary">02.</span> Experience
				</h2>

				<div className="space-y-6">
					{experienceData.map((job, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.2 }}
							viewport={{ once: true }}
							className="bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-primary/50 transition-colors group"
						>
							<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-4">
								<div>
									<h3 className="text-xl font-bold text-gray-200 group-hover:text-primary transition-colors">
										{job.role}
										<span className="text-secondary"> @ {job.company}</span>
									</h3>
									<p className="text-xs text-gray-500 mt-1">{job.location}</p>
								</div>
								<span className="text-xs font-mono text-gray-500 whitespace-nowrap">
									{job.date}
								</span>
							</div>

							<p className="text-gray-300 text-sm mb-4 leading-relaxed">
								{job.summary}
							</p>

							<ul className="space-y-2 mb-6">
								{job.points.map((point, i) => (
									<li key={i} className="text-gray-400 text-sm leading-relaxed flex">
										<span className="text-secondary mr-2 shrink-0">{">"}</span>
										<span>{point}</span>
									</li>
								))}
							</ul>

							<div className="flex flex-wrap gap-2">
								{job.tech.map((t) => (
									<span
										key={t}
										className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-1 rounded"
									>
										{t}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default Experience;
