"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Proposal {
  id: string;
  title: string;
  ward: string;
  category: string;
  status: string;
  votes: number;
  createdAt: string;
}

export function RealProposalsList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProposals() {
      try {
        const res = await fetch("/api/proposals/all");
        const data = await res.json();
        setProposals(data.proposals?.slice(0, 3) || []); // Show top 3
      } catch (err) {
        console.error("Error fetching proposals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProposals();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
        return { bg: "rgba(22, 199, 132, 0.2)", text: "#16c784" };
      case "in review":
        return { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" };
      case "approved":
        return { bg: "rgba(34, 211, 238, 0.2)", text: "#22d3ee" };
      case "rejected":
        return { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" };
      default:
        return { bg: "rgba(124, 58, 237, 0.2)", text: "#7c3aed" };
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Citizen: "#16c784",
      Government: "#22d3ee",
      Infrastructure: "#f59e0b",
      Health: "#ef4444",
      Education: "#667eea",
    };
    return colors[category] || "#9aa0c3";
  };

  if (loading) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: "#1a1a2e",
              borderRadius: "16px",
              padding: "18px",
              minHeight: "180px",
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {proposals.map((proposal) => {
        const statusColor = getStatusColor(proposal.status);
        const categoryColor = getCategoryColor(proposal.category);

        return (
          <Link
            key={proposal.id}
            href={`/proposals/${proposal.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                position: "relative",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(34,211,238,0.25)",
                borderRadius: "16px",
                padding: "18px",
                minHeight: "180px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                transition:
                  "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(124,58,237,0.45)";
                el.style.boxShadow =
                  "0 16px 36px rgba(0,0,0,0.45), 0 0 28px rgba(124,58,237,0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(34,211,238,0.25)";
                el.style.boxShadow = "0 10px 24px rgba(0,0,0,0.35)";
              }}
            >
              {/* Background gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: "-1px",
                  borderRadius: "17px",
                  background: `radial-gradient(60% 60% at 30% 20%, rgba(124,58,237,0.25), transparent 60%), radial-gradient(60% 60% at 80% 80%, rgba(34,211,238,0.22), transparent 60%)`,
                  opacity: 0.55,
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Title */}
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {proposal.title}
                </h3>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "12px",
                    fontSize: "12px",
                    color: "#9aa0c3",
                  }}
                >
                  <span
                    style={{
                      padding: "3px 8px",
                      background: `rgba(${categoryColor
                        .substring(1)
                        .match(/.{2}/g)
                        ?.map((x) => parseInt(x, 16))
                        .join(", ")}, 0.2)`,
                      borderRadius: "4px",
                      color: categoryColor,
                    }}
                  >
                    {proposal.category}
                  </span>
                  <span>•</span>
                  <span>{proposal.ward}</span>
                </div>

                {/* Description/info */}
                <div
                  style={{
                    fontSize: "12px",
                    color: "#aaa",
                    marginBottom: "16px",
                    opacity: 0.8,
                  }}
                >
                  Created {new Date(proposal.createdAt).toLocaleDateString()}
                </div>

                {/* Footer - Status and Votes */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      background: statusColor.bg,
                      color: statusColor.text,
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {proposal.status}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    ✋ <span>{proposal.votes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
