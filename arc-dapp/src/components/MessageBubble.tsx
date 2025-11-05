import { motion } from "framer-motion";
import Avatar from "./Avatar";

export default function MessageBubble({ m, isMine }: { m: any; isMine: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26 }}
      className={`w-full flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[78%] flex gap-3 ${isMine ? "flex-row-reverse" : ""}`}>
        {!isMine && <Avatar address={m.sender} />} {/* ✅ Fixed */}
        <div
          className={`p-4 rounded-2xl border ${
            isMine
              ? "bg-gradient-to-r from-arc-500 to-arc-600 border-arc-500/40 shadow-glow text-right"
              : "bg-white/6 border-white/8 text-left"
          }`}
        >
          <div className="text-xs text-cyan-300 font-semibold mb-1">{m.ens}</div>
          <div className="text-sm text-white break-words">{m.text}</div>
          <div className="text-xs text-muted-300 mt-2">{m.time}</div>
        </div>
        {isMine && <Avatar address={m.sender} />} {/* ✅ Fixed */}
      </div>
    </motion.div>
  );
}
