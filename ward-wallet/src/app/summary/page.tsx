"use client";
import { Navbar } from "@/components/Navbar";
import { SummaryKPIs } from "@/components/SummaryKPIs";
import { QuickActions } from "@/components/QuickActions";
import { ActivityChart } from "@/components/ActivityChart";
import { DistributionCharts } from "@/components/DistributionCharts";
import { RecentProposalsList } from "@/components/RecentProposalsList";

export default function SummaryPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100svh",
          padding: "48px 28px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          color: "#e7e8ff",
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(34,211,238,0.16), transparent 60%), radial-gradient(800px 600px at 50% 100%, rgba(245,158,11,0.12), transparent 60%), #070816",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid effect */}
        <div
          style={{
            position: "absolute",
            inset: "-200%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0 / 40px 40px",
            filter: "blur(0.3px)",
            opacity: 0.25,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(1200px, 100%)",
            maxWidth: "100%",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: 800 }}
            >
              📊 Summary
            </h1>
            <p style={{ margin: 0, color: "#9aa0c3", fontSize: "14px" }}>
              Real-time insights into proposal activity, community engagement,
              and system health
            </p>
          </div>

          {/* KPI Strip */}
          <div style={{ marginBottom: "32px" }}>
            <SummaryKPIs />
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: "32px" }}>
            <QuickActions />
          </div>

          {/* Activity Over Time Chart */}
          <div style={{ marginBottom: "32px" }}>
            <ActivityChart />
          </div>

          {/* Distribution Charts */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              📈 Distribution & Analytics
            </h2>
            <DistributionCharts />
          </div>

          {/* Recent Proposals List */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              🚀 Recent Activity
            </h2>
            <RecentProposalsList />
          </div>

          {/* Footer / Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              color: "#9aa0c3",
              borderTop: "1px solid rgba(124,58,237,0.2)",
              paddingTop: "16px",
            }}
          >
            <div>Last synced: {new Date().toLocaleTimeString()}</div>
            <div>Data updates every 30 seconds</div>
          </div>
        </div>
      </div>
    </>
  );
}
