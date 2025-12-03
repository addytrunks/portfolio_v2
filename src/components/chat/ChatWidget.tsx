"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "./types";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ClearHistoryModal from "./ClearHistoryModal";
import ChatLoader from "./ChatLoader";
import ChatEmptyState from "./ChatEmptyState";

export default function ChatWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [showClearConfirm, setShowClearConfirm] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Load chat history from local storage
	useEffect(() => {
		const saved = localStorage.getItem("portfolio_chat_history");
		if (saved) {
			try {
				const { messages: savedMessages, timestamp } = JSON.parse(saved);
				const threeDays = 3 * 24 * 60 * 60 * 1000;
				if (Date.now() - timestamp < threeDays) {
					setMessages(savedMessages);
				} else {
					localStorage.removeItem("portfolio_chat_history");
				}
			} catch (e) {
				console.error("Failed to load chat history", e);
			}
		}
	}, []);

	// Save chat history to local storage
	useEffect(() => {
		if (messages.length > 0) {
			localStorage.setItem(
				"portfolio_chat_history",
				JSON.stringify({
					messages,
					timestamp: Date.now(),
				}),
			);
		}
	}, [messages]);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: input,
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: [...messages, userMessage] }),
			});

			if (!response.ok) throw new Error("Failed to fetch");
			if (!response.body) return;

			const reader = response.body.getReader();
			const decoder = new TextDecoder();

			const assistantMessageId = (Date.now() + 1).toString();
			let assistantContent = "";

			setMessages((prev) => [
				...prev,
				{ id: assistantMessageId, role: "assistant", content: "" },
			]);

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				// Parse AI SDK format: 0:"text"\n
				// Simple parser: split by newline, look for 0: prefix
				const lines = chunk.split("\n");
				for (const line of lines) {
					if (line.startsWith("0:")) {
						try {
							const text = JSON.parse(line.slice(2));
							assistantContent += text;
							setMessages((prev) =>
								prev.map((m) =>
									m.id === assistantMessageId
										? { ...m, content: assistantContent }
										: m,
								),
							);
						} catch (e) {
							// Ignore parse errors for partial chunks
						}
					}
				}
			}
		} catch (error) {
			console.error(error);
			setMessages((prev) => [
				...prev,
				{
					id: Date.now().toString(),
					role: "assistant",
					content: "Error: Could not connect to server.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClearChat = () => {
		setMessages([]);
		localStorage.removeItem("portfolio_chat_history");
		setShowClearConfirm(false);
	};

	// Handle click outside
	const chatRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen]);

	return (
		<div className="fixed bottom-4 right-4 z-50 font-mono">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={chatRef}
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-background/90 border border-primary/50 rounded-lg shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_20%,transparent)] backdrop-blur-sm flex flex-col overflow-hidden"
					>
						<ChatHeader
							onClose={() => setIsOpen(false)}
							onClear={() => setShowClearConfirm(true)}
						/>

						<AnimatePresence>
							{showClearConfirm && (
								<ClearHistoryModal
									onConfirm={handleClearChat}
									onCancel={() => setShowClearConfirm(false)}
								/>
							)}
						</AnimatePresence>

						<div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
							{messages.length === 0 && <ChatEmptyState />}
							{messages.map((m) => (
								<ChatMessage key={m.id} message={m} />
							))}
							{isLoading && <ChatLoader />}
							<div ref={messagesEndRef} />
						</div>

						<ChatInput
							input={input}
							setInput={setInput}
							onSubmit={handleSubmit}
							isLoading={isLoading}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{!isOpen && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setIsOpen(true)}
					className="bg-background border border-primary text-primary p-3 rounded-full shadow-[0_0_15px_color-mix(in_srgb,var(--primary)_30%,transparent)] hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cursor-pointer"
				>
					<MessageCircle size={24} className="group-hover:animate-pulse " />
				</motion.button>
			)}
		</div>
	);
}
