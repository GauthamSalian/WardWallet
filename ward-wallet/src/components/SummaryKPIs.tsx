"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface KPIData {
  timestamp: string;
  kpis: {
    totalProposals: number;
    activeProposals: number;
    totalVotes: number;
    openReports: number;
    wardCount: number;
    totalCategories: number;
  };
  summary: {
    rewardPoolBalance: string;
    lastSynced: string;
  };
}

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: string;
  color: string;
  onClick?: () => void;
  isLoading?: boolean;
}

function KPICard({
  title,
  value,
  icon,
  color,
  onClick,
  isLoading,
}: KPICardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, rgba(22, 199, 132, 0.1), rgba(${
          color === "green"
            ? "34, 211, 238"
            : color === "red"
              ? "239, 68, 68"
              : "124, 58, 237"
        }, 0.1))`,
        border: `1px solid ${color === "green" ? "#16c784" : color === "red" ? "#ef4444" : "#7c3aed"}`,
        borderRadius: "12px",
        padding: "20px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        minWidth: "200px",
        flex: 1,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform =
            "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 12px 24px rgba(0,0,0,0.2)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <div>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>
            {title}
          </div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#fff" }}>
            {isLoading ? "..." : value}
          </div>
        </div>
        <div style={{ fontSize: "24px" }}>{icon}</div>
      </div>
    </div>
  );
}

export function SummaryKPIs() {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/summary");
        const kpiData = await res.json();
        setData(kpiData);
      } catch (err) {
        console.error("Error fetching KPIs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!data && loading) {
    return (
      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "12px",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              minWidth: "200px",
              height: "100px",
              background: "#1a1a2e",
              borderRadius: "12px",
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
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        paddingBottom: "12px",
        scrollBehavior: "smooth",
      }}
    >
      <KPICard
        title="Total Proposals"
        value={data?.kpis.totalProposals || 0}
        icon="📋"
        color="purple"
        onClick={() => router.push("/?filter=all")}
        isLoading={loading}
      />
      <KPICard
        title="Active Proposals"
        value={data?.kpis.activeProposals || 0}
        icon="🟢"
        color="green"
        onClick={() => router.push("/?filter=active")}
        isLoading={loading}
      />
      <KPICard
        title="Total Votes Cast"
        value={data?.kpis.totalVotes || 0}
        icon="✋"
        color="purple"
        isLoading={loading}
      />
      <KPICard
        title="Open Reports"
        value={data?.kpis.openReports || 0}
        icon="🚩"
        color={data?.kpis.openReports ? "red" : "green"}
        onClick={() => router.push("/summary?tab=reports")}
        isLoading={loading}
      />
      <KPICard
        title="Wards"
        value={data?.kpis.wardCount || 0}
        icon="🗺️"
        color="purple"
        isLoading={loading}
      />
      <KPICard
        title="Categories"
        value={data?.kpis.totalCategories || 0}
        icon="📂"
        color="purple"
        isLoading={loading}
      />
      <KPICard
        title="Reward Pool"
        value={data?.summary.rewardPoolBalance || "0 ETH"}
        icon="💰"
        color="green"
        isLoading={loading}
      />
    </div>
  );
}
