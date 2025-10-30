import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { addArcNetwork } from "./chains/addArcNetwork";
import { motion } from "framer-motion";

const contractAddress = "0x1fE4265F349fa8E9c6AC31a47212b5D61A287f5c";
const abi = [
  "function message() view returns (string)",
  "function updateMessage(string)",
];

export default function App() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && chainId !== 5042002) {
      addArcNetwork();
    }
  }, [isConnected, chainId]);

  async function getMessage() {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const currentMsg = await contract.message();
      setMsg(currentMsg);
    } catch (err) {
      console.error("Error reading message:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateMessage() {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.updateMessage(newMsg);
      await tx.wait();
      setMsg(newMsg);
      setNewMsg("");
    } catch (err) {
      console.error("Error updating message:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#030712] overflow-hidden relative text-white font-inter">
      {/* 🔵 Background glow effects */}
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

      {/* 🔝 Header bar (logo + wallet connect) */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 z-50">
        {/* Arc logo with subtle glow */}
        <motion.div
          className="relative flex items-center"
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <img
            src="https://cdn.prod.website-files.com/685311a976e7c248b5dfde95/688f6e47eca8d8e359537b5f_logo-ondark.svg"
            alt="Arc Network Logo"
            className="w-26 h-26 relative z-10 drop-shadow-[0_0_14px_rgba(34,211,238,0.6)]"
          />
        </motion.div>

        {/* Wallet connect button */}
        <ConnectButton showBalance={false} chainStatus="icon" />
      </div>

      {/* 💎 Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(0,255,255,0.15)] max-w-md md:max-w-xl w-[90%] text-center mt-24"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
          Arc Chain Note
        </h1>
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          Store and update messages directly on{" "}
          <span className="text-cyan-400 font-semibold">Arc Testnet</span>.
        </p>

        {address && (
          <div className="text-sm text-gray-400 mb-4">
            Connected:{" "}
            <span className="text-cyan-400">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>{" "}
            <span className="text-blue-400">
              {chainId === 5042002 ? "on Arc Testnet" : "other network"}
            </span>
          </div>
        )}

        {/* ⚙️ Buttons and inputs */}
        <div className="space-y-4 mt-4 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getMessage}
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90 border border-cyan-400/40 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get Message"}
          </motion.button>

          {msg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-blue-300 font-medium mt-2"
            >
              Message:{" "}
              <span className="text-white font-semibold">{msg}</span>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row justify-center gap-2 mt-4 w-full md:w-auto">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Enter new message"
              className="px-4 py-3 rounded-full md:rounded-l-full md:rounded-r-none w-full md:w-64 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateMessage}
              disabled={!newMsg || loading}
              className="px-6 py-3 rounded-full md:rounded-r-full md:rounded-l-none bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 border border-cyan-400/40 transition-all disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ⚡ Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500 z-10 text-center px-4">
        © {new Date().getFullYear()} — Built with 💙 on{" "}
        <span className="text-cyan-400 font-semibold">Arc Network</span>
      </footer>
    </div>
  );
}
