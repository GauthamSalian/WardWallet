"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function Page() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <Navbar />

      <main>
        <Link href="/create-proposal">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Create a New Proposal
          </button>
        </Link>
      </main>
    </>
  );
}
