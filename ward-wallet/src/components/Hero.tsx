"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-28 pb-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
        >
          Ward Wallet
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Reimagining Local Governance with Trust & Transparency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-7 flex items-center justify-center gap-4"
        >
          <a
            href="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg transform hover:scale-[1.02] transition"
          >
            Enter Dashboard
          </a>

          <a
            href="/create-proposal"
            className="px-6 py-3 rounded-lg border border-white/10 bg-white/4 hover:bg-white/6 transition"
          >
            Submit Proposal
          </a>
        </motion.div>

        {/* floating mock preview */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <div className="w-[360px] md:w-[520px] rounded-2xl p-1 bg-gradient-to-r from-purple-700/20 to-blue-700/10 border border-white/6 shadow-2xl transform-gpu">
            <div className="rounded-xl overflow-hidden bg-gradient-to-b from-[#061124] to-[#071a2a] p-6">
              <div className="h-44 rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/10 flex items-center justify-center">
                <span className="text-sm text-gray-400">Dashboard preview</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
