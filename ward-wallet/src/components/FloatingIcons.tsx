"use client";

import { motion } from "framer-motion";
import { FaRegLightbulb, FaChartLine, FaUsers } from "react-icons/fa";

export default function FloatingIcons() {
  const icons = [
    <FaRegLightbulb />,
    <FaChartLine />,
    <FaUsers />,
    <FaRegLightbulb />,
    <FaChartLine />,
  ];

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-30">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 py-6 text-purple-400 text-4xl"
      >
        {icons.map((icon, i) => (
          <div key={i}>{icon}</div>
        ))}
      </motion.div>
    </div>
  );
}
