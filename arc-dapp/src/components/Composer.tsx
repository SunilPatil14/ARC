
import { motion } from "framer-motion";

export default function Composer({ newMsg, setNewMsg, onSend, loading } : any) {
  return (
    <div className="flex gap-3 items-center mt-4">
      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 rounded-full bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-arc-500"
      />
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onSend}
        disabled={!newMsg || loading}
        className="px-5 py-3 rounded-full bg-linear-to-r from-arc-500 to-arc-600 border border-arc-500/40 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send"}
      </motion.button>
    </div>
  );
}
