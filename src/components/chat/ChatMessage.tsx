import { cn } from "@/lib/utils";
import { Message } from "./types";

interface ChatMessageProps {
	message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
	return (
		<div
			className={cn(
				"flex flex-col max-w-[85%]",
				message.role === "user"
					? "self-end items-end"
					: "self-start items-start",
			)}
		>
			<div
				className={cn(
					"px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
					message.role === "user"
						? "bg-primary/20 text-primary-foreground border border-primary/30 rounded-br-sm"
						: "bg-muted/90 text-muted-foreground border border-muted rounded-bl-sm",
				)}
			>
				{message.content}
			</div>
			<span className="text-[10px] text-muted-foreground mt-1 uppercase">
				{message.role === "user" ? "YOU" : "BOT"}
			</span>
		</div>
	);
}
