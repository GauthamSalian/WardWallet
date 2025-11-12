"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { GetProjectHistory } from "@/components/GetProjectHistory";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProposalDetailPage({ params }: PageProps) {
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setProposalId(p.id);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          style={{ textAlign: "center", padding: "80px 20px", color: "#aaa" }}
        >
          Loading proposal...
        </div>
      </>
    );
  }

  if (!proposalId) {
    return (
      <>
        <Navbar />
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "#ef4444",
          }}
        >
          Proposal not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100svh",
          padding: "48px 28px 80px",
          color: "#e7e8ff",
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(34,211,238,0.16), transparent 60%), radial-gradient(800px 600px at 50% 100%, rgba(245,158,11,0.12), transparent 60%), #070816",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Project history component - this handles all the data fetching and display */}
          <GetProjectHistory proposalId={proposalId as `0x${string}`} />
        </div>
      </div>
    </>
  );
}
