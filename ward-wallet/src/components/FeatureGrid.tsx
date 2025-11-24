"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPenFancy, FaChartBar, FaFolderOpen, FaList } from "react-icons/fa";

const features = [
  { title: "Create Proposal", desc: "Raise an issue for your ward", link: "/create-proposal", icon: <FaPenFancy /> },
  { title: "Track Interactions", desc: "Monitor votes & transactions", link: "/track", icon: <FaChartBar /> },
  { title: "My Proposals", desc: "View all proposals you created", link: "/my-proposals", icon: <FaFolderOpen /> },
  { title: "Summary", desc: "Community-wide insights", link: "/summary", icon: <FaList /> },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-3xl text-center text-purple-200 font-semibold mb-10">
        Main Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <Link href={f.link} key={idx}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg transition-all shadow-lg hover:shadow-purple-600/20"
            >
              <div className="text-3xl text-purple-300 mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg text-white">{f.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{f.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
