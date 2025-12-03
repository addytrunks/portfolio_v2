import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ClearHistoryModalProps {
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ClearHistoryModal({
	onConfirm,
	onCancel,
}: ClearHistoryModalProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className="bg-zinc-900 border border-red-500/50 rounded-lg p-4 max-w-[280px] w-full shadow-[0_0_20px_rgba(239,68,68,0.2)]"
			>
				<h3 className="text-red-500 font-bold mb-2 flex items-center gap-2">
					<Trash2 size={16} />
					CLEAR HISTORY?
				</h3>
				<p className="text-zinc-400 text-xs mb-4 leading-relaxed">
					This will permanently delete your chat history. This action cannot be undone.
				</p>
				<div className="flex gap-2 justify-end">
					<button
						onClick={onCancel}
						className="px-3 py-1.5 rounded text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
					>
						CANCEL
					</button>
					<button
						onClick={onConfirm}
						className="px-3 py-1.5 rounded text-xs bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all"
					>
						CONFIRM
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}
