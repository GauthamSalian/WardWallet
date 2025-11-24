"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ScreenshotSection({ title, description, image, reverse }: any) {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-10 ${reverse ? "md:flex-row-reverse" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/2"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/8 bg-white/3">
          <img
            src={image}
            alt={title}
            className="w-full h-72 object-cover"
            style={{ display: "block", aspectRatio: "16/9" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="w-full md:w-1/2"
      >
        <h3 className="text-3xl font-bold text-purple-200 mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>

        <div className="flex gap-3">
          <a href="/" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow">
            Open Dashboard
          </a>
          <a href="/create-proposal" className="px-4 py-2 rounded-lg border border-white/8 bg-white/4">
            Submit Proposal
          </a>
        </div>
      </motion.div>
    </div>
  );
}
