"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import projectsData from "@/app/data/projects.json";

interface Project {
	title: string;
	description: string;
	tech: string[];
	github?: string;
	link?: string;
}

const projects: Project[] = projectsData;

const Projects = () => {
	return (
		<section id="projects" className="py-20 border-t border-gray-900">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<h2 className="text-2xl md:text-3xl font-bold mb-12 text-primary flex items-center">
					<span className="mr-2 text-secondary">03.</span> Projects
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.reverse().map((project, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-primary/50 transition-colors group flex flex-col"
						>
							<div className="flex justify-between items-start mb-4">
								<h3 className="text-xl font-bold text-gray-200 group-hover:text-primary transition-colors">
									{project.title}
								</h3>
								<div className="flex space-x-3 text-gray-400">
									{project.github && (
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-white transition-colors"
										>
											<Github size={20} />
										</a>
									)}
									{project.link && (
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-white transition-colors"
										>
											<ExternalLink size={20} />
										</a>
									)}
								</div>
							</div>

							<p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed text-wrap w-full">
								{project.description}
							</p>

							<div className="flex flex-wrap gap-2 mt-auto">
								{project.tech.map((t) => (
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

export default Projects;
