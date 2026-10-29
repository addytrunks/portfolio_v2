"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import publicationsData from "@/app/data/publications.json";

const Publications = () => {
	return (
		<section id="publications" className="py-20 border-t border-gray-900">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<h2 className="text-2xl md:text-3xl font-bold mb-12 text-primary flex items-center">
					<span className="mr-2 text-secondary">06.</span> Publications
				</h2>

				<div className="space-y-6">
					{publicationsData.map((pub, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.2 }}
							viewport={{ once: true }}
							className="bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-primary/50 transition-colors group"
						>
							<div className="flex items-start space-x-4">
								<div className="p-3 bg-white/5 rounded-full shrink-0">
									<FileText className="w-6 h-6 text-secondary" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex justify-between items-start gap-4 mb-2">
										<h3 className="text-lg font-bold text-gray-200 group-hover:text-primary transition-colors">
											{pub.title}
										</h3>
										<a
											href={pub.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white transition-colors shrink-0"
											aria-label="Read paper"
										>
											<ExternalLink size={20} />
										</a>
									</div>
									<p className="text-xs font-mono text-secondary mb-4">
										{pub.venue} · {pub.date}
									</p>
									<p className="text-gray-400 text-sm mb-4 leading-relaxed">
										{pub.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{pub.tags.map((t) => (
											<span
												key={t}
												className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-1 rounded"
											>
												{t}
											</span>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default Publications;
