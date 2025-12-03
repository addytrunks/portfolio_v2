import { Loader2 } from "lucide-react";

export default function ChatLoader() {
	return (
		<div className="self-start flex items-center gap-2 text-primary/50 text-xs">
			<Loader2 size={12} className="animate-spin" />
			<span>PROCESSING...</span>
		</div>
	);
}
