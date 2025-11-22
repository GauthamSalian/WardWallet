"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaRegLightbulb, FaChartLine, FaUsers } from "react-icons/fa";

const features = [
  {
    title: "Proposal Builder",
    desc: "Create transparent proposals with structured formats.",
    icon: <FaRegLightbulb />,
  },
  {
    title: "Interaction Tracker",
    desc: "Live insights into votes, fund flow and contract events.",
    icon: <FaChartLine />,
  },
  {
    title: "Community Insights",
    desc: "View engagement and collaboration analytics.",
    icon: <FaUsers />,
  },
];

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#06061c] to-[#0b0f2b] text-white px-6 py-12">
      
      {/* HEADER */}
      <div className="text-center mt-10 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent"
        >
          Ward Wallet
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg text-gray-300 mt-4"
        >
          Reimagining Local Governance with Trust & Transparency
        </motion.p>
      </div>

      {/* FEATURE SECTIONS */}
      <div className="max-w-6xl mx-auto space-y-16">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            
            {/* CARD */}
            <Link href="/" className="w-full md:w-1/2">
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: "0px 20px 40px rgba(124,58,237,0.25)",
                }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer"
              >
                <div className="text-4xl text-purple-300">{item.icon}</div>
                <h2 className="text-2xl font-semibold mt-4">{item.title}</h2>
                <p className="text-gray-300 mt-2">{item.desc}</p>
              </motion.div>
            </Link>

            {/* SCREENSHOT PLACEHOLDER */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-xl h-64 flex items-center justify-center"
            >
              <span className="text-gray-400">Screenshot Placeholder</span>
            </motion.div>

          </motion.div>
        ))}
      </div>

    </main>
  );
}
