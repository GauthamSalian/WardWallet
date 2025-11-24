"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegLightbulb, FaChartLine, FaUsers } from "react-icons/fa";

const items = [
  {
    title: "Proposal Builder",
    desc: "Craft proposals with clarity & structure.",
    icon: <FaRegLightbulb />,
  },
  {
    title: "Interaction Tracker",
    desc: "Monitor votes, funds and contract events.",
    icon: <FaChartLine />,
  },
  {
    title: "Community Insights",
    desc: "Analytics & trending community metrics.",
    icon: <FaUsers />,
  },
];

export default function ThreePanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((it, i) => (
        <Link href="/" key={i} className="block">
          <MotionCard index={i} item={it} />
        </Link>
      ))}
    </div>
  );
}

/* Motion + Tilt Card */
function MotionCard({ item, index }: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Tilt animation based on cursor
  const handleMove = (e: any) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(
      2
    )}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  };

  const resetTilt = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ scale: 1.03, y: -6 }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer relative overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Soft Glow Background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-500/10 opacity-40"></div>

      <div className="relative z-10">
        <div className="text-3xl text-purple-300 mb-3">{item.icon}</div>
        <h3 className="font-semibold text-xl text-purple-200">{item.title}</h3>
        <p className="text-gray-300 mt-2">{item.desc}</p>
      </div>
    </motion.div>
  );
}
