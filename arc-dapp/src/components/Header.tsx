import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-5 z-50">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-2xl bg-arc-500/20" />
          <img
            src="https://cdn.prod.website-files.com/685311a976e7c248b5dfde95/688f6e47eca8d8e359537b5f_logo-ondark.svg"
            alt="Arc"
            className="w-12 h-12 relative z-10"
          />
        </div>
      </motion.div>

      <div>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </div>
    </div>
  );
}
