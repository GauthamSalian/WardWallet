"use client"; // important for react-fast-marquee in Next.js App Router

import React from "react";
import Marquee from "react-fast-marquee";
import { FaRegFileAlt, FaEthereum } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";

const transactions = [
  { icon: <FaRegFileAlt />, text: "Proposal #42 Created" },
  { icon: <FaEthereum />, text: "5.0 ETH Released to Contractor 0x8f..." },
  { icon: <FaVoteYea />, text: "Vote Cast by Citizen 0x1a..." },
  { icon: <FaRegFileAlt />, text: "Proposal #43 Created" },
  { icon: <FaEthereum />, text: "2.5 ETH Released to Citizen 0x9b..." },
];

export default function LiveTicker() {
  return (
    <div
      style={{
        backgroundColor: "#000", // pure black
        color: "#39FF14", // neon green
        fontFamily: "monospace",
        padding: "8px 0",
        borderTop: "1px solid #39FF14",
        borderBottom: "1px solid #39FF14",
      }}
    >
      <Marquee gradient={false} direction="right" speed={50}>
        {transactions.map((item, index) => (
          <span
            key={index}
            style={{
              marginRight: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.icon}
            <span style={{ marginLeft: "8px" }}>{item.text}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
