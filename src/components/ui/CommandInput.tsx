"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import aboutData from "@/app/data/about.json";
import skillsData from "@/app/data/skills.json";
import contactData from "@/app/data/contact.json";

// --- Theme Definitions ---
const THEMES: Record<string, Record<string, string>> = {
	synthwave: {
		"--primary": "#a855f7", // Neon Violet
		"--secondary": "#06b6d4", // Neon Cyan
		"--background": "#000000",
		"--foreground": "#ffffff",
		"--muted": "#262626",
	},
	matrix: {
		"--primary": "#00ff00", // Matrix Green
		"--secondary": "#008f11", // Darker Green
		"--background": "#0d0208", // Very dark
		"--foreground": "#00ff41",
		"--muted": "#003b00",
	},
	ubuntu: {
		"--primary": "#E95420", // Ubuntu Orange
		"--secondary": "#772953", // Ubuntu Purple
		"--background": "#300a24", // Aubergine
		"--foreground": "#ffffff",
		"--muted": "#5e2750",
	},
	hacker: {
		"--primary": "#0f0",
		"--secondary": "#0a0",
		"--background": "#000",
		"--foreground": "#0f0",
		"--muted": "#111",
	},
};

// --- File System Definitions ---
type FileSystemNode = {
	type: "file" | "directory";
	content?: string;
	children?: Record<string, FileSystemNode>;
};

const fileSystem: Record<string, FileSystemNode> = {
	"~": {
		type: "directory",
		children: {
			"projects": {
				type: "directory",
				children: projectsData.reduce((acc, project) => {
					const fileName = project.title.toLowerCase().replace(/\s+/g, "_") + ".txt";
					acc[fileName] = {
						type: "file",
						content: `Title: ${project.title}\nDescription: ${project.description}\nTech: ${project.tech.join(", ")}\nLink: ${project.link || "N/A"}`,
					};
					return acc;
				}, {} as Record<string, FileSystemNode>),
			},
			"about.md": {
				type: "file",
				content: `Name: ${aboutData.profile.name}\nBio: ${aboutData.paragraphs}\nLocation: Chennai, India\nInterests: ${aboutData.profile.interests.join(", ")}`,
			},
			"skills.json": {
				type: "file",
				content: JSON.stringify(skillsData, null, 2),
			},
			"contact.txt": {
				type: "file",
				content: `Email: ${contactData.email}\nGitHub: 	${contactData.githubLink}\nLinkedIn: ${contactData.linkedinLink}`,
			},
		},
	},
};

const CommandInput = () => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState<string[]>([]);
	const [currentPath, setCurrentPath] = useState("~");
	const inputRef = useRef<HTMLInputElement>(null);

	// Helper to get current directory node
	const getCurrentDirNode = (): FileSystemNode | undefined => {
		if (currentPath === "~") return fileSystem["~"];
		
		const parts = currentPath.split("/").filter(p => p && p !== "~");
		let current = fileSystem["~"];
		
		for (const part of parts) {
			if (current.children && current.children[part]) {
				current = current.children[part];
			} else {
				return undefined;
			}
		}
		return current;
	};

	const handleThemeChange = (themeName: string) => {
		const theme = THEMES[themeName];
		if (theme) {
			const root = document.documentElement;
			Object.entries(theme).forEach(([key, value]) => {
				root.style.setProperty(key, value);
			});
			return `Theme changed to ${themeName}`;
		}
		return `Theme '${themeName}' not found. Available: ${Object.keys(THEMES).join(", ")}`;
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			const fullCommand = input.trim();
			const [cmd, ...args] = fullCommand.split(" ");
			const arg = args.join(" ");
			let response = "";

			switch (cmd.toLowerCase()) {
				case "help":
					response =
						"Available commands:\n" +
						"  help                - Show this help message\n" +
						"  theme <name>        - Change theme (matrix, ubuntu, synthwave)\n" +
						"  ls                  - List files in current directory\n" +
						"  cd <dir>            - Change directory\n" +
						"  cat <file>          - View file content\n" +
						"  clear               - Clear terminal\n" +
						"  about, skills, projects, contact - Scroll to sections";
					break;
				
				case "theme":
					response = handleThemeChange(arg.toLowerCase());
					break;

				case "ls":
					const dir = getCurrentDirNode();
					if (dir && dir.children) {
						const items = Object.entries(dir.children).map(([name, node]) => {
							return node.type === "directory" ? `${name}/` : name;
						});
						response = items.join("  ");
					} else {
						response = "Error: Cannot list contents.";
					}
					break;

				case "cd":
					if (!arg || arg === "~") {
						setCurrentPath("~");
					} else if (arg === "..") {
						if (currentPath !== "~") {
							const parts = currentPath.split("/");
							parts.pop();
							setCurrentPath(parts.join("/") || "~");
						}
					} else {
						const currentDir = getCurrentDirNode();
						if (currentDir && currentDir.children && currentDir.children[arg] && currentDir.children[arg].type === "directory") {
							setCurrentPath(currentPath === "~" ? `~/${arg}` : `${currentPath}/${arg}`);
						} else {
							response = `cd: no such directory: ${arg}`;
						}
					}
					break;

				case "cat":
					const currentDirNode = getCurrentDirNode();
					if (currentDirNode && currentDirNode.children && currentDirNode.children[arg]) {
						const file = currentDirNode.children[arg];
						if (file.type === "file") {
							response = file.content || "";
						} else {
							response = `cat: ${arg}: Is a directory`;
						}
					} else {
						response = `cat: ${arg}: No such file`;
					}
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
					response = `Command not found: ${cmd}. Type 'help' for available commands.`;
			}

			if (response) {
				// Handle multi-line responses
				const responseLines = response.split("\n");
				setOutput((prev) => [...prev, `addy.srivats ${currentPath} > ${fullCommand}`, ...responseLines]);
			} else if (fullCommand) {
				setOutput((prev) => [...prev, `addy.srivats ${currentPath} > ${fullCommand}`]);
			}

			setInput("");
		}
	};

	useEffect(() => {
		if (output.length > 0) {
			// Auto-scroll could be implemented here if we had a ref to the container
		}
	}, [output]);

	return (
		<div className="mt-8 font-mono text-sm">
			<div className="space-y-1 mb-2 text-gray-400">
				{output.map((line, i) => (
					<div key={i} className="whitespace-pre-wrap">{line}</div>
				))}
			</div>
			<div className="flex items-center text-primary">
				<span className="mr-2 whitespace-nowrap">{`addy.srivats ${currentPath} >`}</span>
				<input
					ref={inputRef}
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-600 min-w-0"
					placeholder="Type 'help'..."
					autoFocus
				/>
			</div>
		</div>
	);
};

export default CommandInput;
