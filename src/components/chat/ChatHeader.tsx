import { Terminal, Trash2, Minimize2 } from "lucide-react";

interface ChatHeaderProps {
	onClose: () => void;
	onClear: () => void;
}

export default function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
	return (
		<div className="flex items-center justify-between p-3 border-b border-primary/30 bg-primary/10">
			<div className="flex items-center gap-2 text-primary">
				<Terminal size={18} />
				<span className="text-sm font-bold tracking-wider">
					PORTFOLIO_BOT_V1
				</span>
			</div>
			<div className="flex items-center gap-2">
				<button
					onClick={onClear}
					className="text-primary/70 hover:text-red-500 transition-colors cursor-pointer"
					title="Clear Chat"
				>
					<Trash2 size={18} />
				</button>
				<button
					onClick={onClose}
					className="text-primary/70 hover:text-primary transition-colors cursor-pointer"
				>
					<Minimize2 size={18} />
				</button>
			</div>
		</div>
	);
}
