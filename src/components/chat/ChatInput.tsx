import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
	input: string;
	setInput: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
}

export default function ChatInput({
	input,
	setInput,
	onSubmit,
	isLoading,
}: ChatInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto-resize textarea
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + "px";
		}
	}, [input]);

	return (
		<form
			onSubmit={onSubmit}
			className="p-3 border-t border-primary/30 bg-background/50"
		>
			<div className="flex items-end gap-2">
				<span className="text-primary pb-2">{">"}</span>
				<textarea
					ref={textareaRef}
					className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-primary/30 text-sm resize-none max-h-[100px] py-2 custom-scrollbar"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							onSubmit(e);
						}
					}}
					placeholder="Enter command..."
					rows={1}
				/>
				<button
					type="submit"
					disabled={isLoading || !input.trim()}
					className={cn(
						isLoading || !input.trim()
							? "opacity-50 cursor-not-allowed"
							: "text-primary hover:text-primary/80 disabled:opacity-50 transition-colors pb-2 cursor-pointer",
					)}
				>
					<Send size={16} />
				</button>
			</div>
		</form>
	);
}
