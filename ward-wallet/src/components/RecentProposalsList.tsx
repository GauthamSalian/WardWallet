"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Proposal {
  id: string;
  title: string;
  ward: string;
  category: string;
  status: string;
  votes: number;
  createdAt: string;
}

export function RecentProposalsList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProposals() {
      try {
        const res = await fetch("/api/proposals");
        const data = await res.json();
        // Sort by recent and take first 5
        const recent = data
          .sort(
            (a: Proposal, b: Proposal) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
        setProposals(recent);
      } catch (err) {
        console.error("Error fetching proposals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProposals();
  }, []);

  if (loading) return <div style={{ color: "#aaa" }}>Loading...</div>;

  return (
    <div
      style={{
        background: "#1a1a2e",
        border: "1px solid #16c784",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 600 }}>
        Recent Proposals
      </h3>

      {proposals.length === 0 ? (
        <div style={{ color: "#aaa", textAlign: "center", padding: "40px" }}>
          No proposals yet
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                background: "#2d2d44",
                borderRadius: "8px",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "#3d3d54";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "#2d2d44";
              }}
              onClick={() => router.push(`/history/${proposal.id}`)}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {proposal.title}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#aaa",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <span>{proposal.ward}</span>
                  <span>•</span>
                  <span>{proposal.category}</span>
                  <span>•</span>
                  <span>
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "6px 10px",
                    background: "rgba(22, 199, 132, 0.2)",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  ✋ {proposal.votes}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    background:
                      proposal.status === "Open"
                        ? "rgba(22, 199, 132, 0.2)"
                        : proposal.status === "In Review"
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(239, 68, 68, 0.2)",
                    color:
                      proposal.status === "Open"
                        ? "#16c784"
                        : proposal.status === "In Review"
                          ? "#f59e0b"
                          : "#ef4444",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {proposal.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/track"
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "8px 16px",
          background: "transparent",
          border: "1px solid #16c784",
          borderRadius: "6px",
          color: "#16c784",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        View All →
      </Link>
    </div>
  );
}
