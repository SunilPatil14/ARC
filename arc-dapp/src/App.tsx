import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { addArcNetwork } from "./chains/addArcNetwork";
import { motion } from "framer-motion";
import { getBlockieDataUrl } from "./utils/blockies";
import { ChevronDown } from "lucide-react";

const contractAddress = "0x758Fe97100ed582b1cc16962Cd3F394ab71CF252";
const abi = [
  "function message() view returns (string)",
  "function updateMessage(string)",
  "function getMessageHistory() view returns (tuple(address sender, string text, uint256 timestamp)[])",
];

export default function App() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isConnected && chainId !== 5042002) addArcNetwork();
    if (isConnected) fetchMessages();
  }, [isConnected, chainId]);

  // ✅ Auto-scroll when new messages appear
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      if (nearBottom) {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      }
    }
  }, [messages]);

  // ✅ Detect scroll position
  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    const atBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 50;
    setShowScrollButton(!atBottom);
  };

  // ✅ Scroll to bottom
  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  };

  // ✅ Fetch messages
  async function fetchMessages() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const history = await contract.getMessageHistory();

      const formatted = await Promise.all(
        history.map(async (m: any) => {
          const date = new Date(Number(m.timestamp) * 1000);
          let ensName = null;
          try {
            ensName = await provider.lookupAddress(m.sender);
          } catch {}
          return {
            sender: m.sender,
            ens: ensName || `${m.sender.slice(0, 6)}...${m.sender.slice(-4)}`,
            text: m.text,
            time: date.toLocaleTimeString(),
          };
        })
      );

      setMessages(formatted);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }

  // ✅ Update message
  async function updateMessage() {
    if (!newMsg.trim()) return;
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.updateMessage(newMsg);
      await tx.wait();
      setNewMsg("");
      fetchMessages();
      scrollToBottom();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#030712] overflow-hidden relative text-white font-inter">
      {/* 🔵 Animated background gradients */}
      <motion.div
        className="absolute w-[900px] h-[900px] bg-gradient-to-tr from-cyan-500/25 to-blue-700/25 blur-[180px] rounded-full top-[-250px] right-[-250px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[750px] h-[750px] bg-gradient-to-tr from-purple-500/25 to-pink-700/25 blur-[160px] rounded-full bottom-[-250px] left-[-250px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* 🪙 Wallet connect (top-right) */}
      <div className="absolute top-6 right-8 z-50">
        <ConnectButton showBalance={false} chainStatus="icon" />
      </div>

      {/* ✨ Arc Network logo (top-left) */}
      <motion.div
        className="absolute top-8 left-8 z-40 flex items-center gap-3"
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="https://cdn.prod.website-files.com/685311a976e7c248b5dfde95/688f6e47eca8d8e359537b5f_logo-ondark.svg"
          alt="Arc Network Logo"
          className="w-20 h-20 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        />
      </motion.div>

      {/* 💎 Chat Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(0,255,255,0.15)] max-w-2xl w-[95%] flex flex-col justify-between"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text mb-4 text-center">
          Arc Chain Chat 💬
        </h1>

        {/* Chat messages */}
        <motion.div
          ref={chatContainerRef}
          onScroll={handleScroll}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="relative flex-1 overflow-y-auto bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 text-left space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/30 max-h-[400px]"
        >
          {messages.length > 0 ? (
            messages.map((m, i) => {
              const isMine = m.sender.toLowerCase() === address?.toLowerCase();
              const avatarUrl = getBlockieDataUrl(m.sender);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-3 ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isMine && (
                    <motion.div
                      whileHover={{ rotate: [0, 10, -10, 0], scale: 1.15 }}
                      transition={{ duration: 1, repeat: 0, ease: "easeInOut" }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 blur-lg rounded-full bg-cyan-400/30 group-hover:bg-blue-500/30 transition-all duration-500"></div>
                      <img
                        src={avatarUrl}
                        alt="avatar"
                        className="relative z-10 w-10 h-10 rounded-full border border-cyan-400/50 shadow-[0_0_18px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-500"
                      />
                    </motion.div>
                  )}

                  <div
                    className={`p-3 rounded-2xl border max-w-[75%] ${
                      isMine
                        ? "bg-gradient-to-r from-cyan-600 to-blue-700 border-cyan-400/40 shadow-glow text-right"
                        : "bg-white/5 border-white/10 text-left"
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold mb-1 ${
                        isMine
                          ? "bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text"
                          : "text-cyan-300"
                      }`}
                    >
                      {m.ens}
                    </div>
                    <div className="text-sm text-white break-words">
                      {m.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{m.time}</div>
                  </div>

                  {isMine && (
                    <motion.div
                      whileHover={{ rotate: [0, 10, -10, 0], scale: 1.15 }}
                      transition={{ duration: 1, repeat: 0, ease: "easeInOut" }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 blur-lg rounded-full bg-cyan-400/30 group-hover:bg-blue-500/30 transition-all duration-500"></div>
                      <img
                        src={avatarUrl}
                        alt="avatar"
                        className="relative z-10 w-10 h-10 rounded-full border border-cyan-400/50 shadow-[0_0_18px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-500"
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm text-center mt-4">
              No messages yet. Be the first to write!
            </p>
          )}

          {/* 🔽 Scroll to bottom button */}
          {showScrollButton && (
            <motion.button
              onClick={scrollToBottom}
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-full shadow-lg border border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </motion.div>

        {/* Input + Send */}
        <div className="flex justify-center gap-2 mt-2">
          <input
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type your message..."
            className="px-4 py-3 rounded-full w-full md:w-72 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={updateMessage}
            disabled={!newMsg || loading}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 border border-cyan-400/40 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500 z-10 text-center px-4">
        © {new Date().getFullYear()} Built with 💙 on{" "}
        <span className="text-cyan-400 font-semibold">Arc Network</span>
      </footer>
    </div>
  );
}
