"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DistributionItem {
  name?: string;
  ward?: string;
  value?: number;
  count?: number;
  votes?: number;
}

interface DistributionData {
  byCategory: DistributionItem[];
  byWard: DistributionItem[];
  byStatus: DistributionItem[];
}

export function DistributionCharts() {
  const [data, setData] = useState<DistributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/summary/distribution");
        const distData = await res.json();
        setData(distData);
      } catch (err) {
        console.error("Error fetching distribution:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div style={{ color: "#aaa" }}>Loading charts...</div>;
  if (!data) return <div style={{ color: "#aaa" }}>No data available</div>;

  const totalCategory =
    data.byCategory?.reduce((sum, c) => sum + (c.value || 0), 0) || 1;
  const totalWard =
    data.byWard?.reduce((sum, w) => sum + (w.count || 0), 0) || 1;

  const colors = [
    "#667eea",
    "#764ba2",
    "#16c784",
    "#12d9c4",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}
    >
      {/* Category Distribution */}
      <div
        style={{
          background: "#1a1a2e",
          border: "1px solid #16c784",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Distribution by Category
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.byCategory?.map((cat, i) => {
            const percentage = ((cat.value || 0) / totalCategory) * 100;
            return (
              <div
                key={i}
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "24px",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      background: colors[i % colors.length],
                      borderRadius: "50%",
                      margin: "0 auto",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      marginBottom: "4px",
                    }}
                  >
                    {cat.name}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      background: "#2d2d44",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${percentage}%`,
                        background: colors[i % colors.length],
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#aaa",
                    minWidth: "40px",
                    textAlign: "right",
                  }}
                >
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Distribution */}
      <div
        style={{
          background: "#1a1a2e",
          border: "1px solid #16c784",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Proposal Status Breakdown
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.byStatus?.map((status, i) => {
            const totalStatus =
              data.byStatus?.reduce((sum, s) => sum + (s.value || 0), 0) || 1;
            const percentage = ((status.value || 0) / totalStatus) * 100;
            return (
              <div
                key={i}
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "24px",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      background: colors[i % colors.length],
                      borderRadius: "50%",
                      margin: "0 auto",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      marginBottom: "4px",
                    }}
                  >
                    {status.name}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      background: "#2d2d44",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${percentage}%`,
                        background: colors[i % colors.length],
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#aaa",
                    minWidth: "40px",
                    textAlign: "right",
                  }}
                >
                  {status.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ward Distribution - Top 10 */}
      <div
        style={{
          background: "#1a1a2e",
          border: "1px solid #16c784",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Top Wards by Activity
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.byWard?.slice(0, 10).map((ward, i) => {
            const percentage = ((ward.count || 0) / totalWard) * 100;
            return (
              <div
                key={i}
                onClick={() => router.push(`/?ward=${ward.ward}`)}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "#2d2d44";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "transparent";
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    minWidth: "80px",
                  }}
                >
                  {ward.ward}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "6px",
                    background: "#2d2d44",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${percentage}%`,
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#aaa",
                    minWidth: "60px",
                    textAlign: "right",
                  }}
                >
                  {ward.count} proposals
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
