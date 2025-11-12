"use client";
import { useEffect, useState } from "react";

interface ActivityData {
  date: string;
  proposals: number;
  votes: number;
}

interface ActivityResponse {
  range: string;
  timeseries: ActivityData[];
}

export function ActivityChart() {
  const [data, setData] = useState<ActivityData[]>([]);
  const [range, setRange] = useState("7");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/summary/activity?range=${range}`);
        const activityData: ActivityResponse = await res.json();
        setData(activityData.timeseries);
      } catch (err) {
        console.error("Error fetching activity:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [range]);

  const maxVotes = Math.max(...data.map((d) => d.votes), 1);
  const maxProposals = Math.max(...data.map((d) => d.proposals), 1);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
          Activity Over Time
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          {["7", "30", "90"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: "6px 12px",
                background: range === r ? "#16c784" : "transparent",
                border: `1px solid ${range === r ? "#16c784" : "#666"}`,
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
          Loading chart...
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            height: "200px",
            gap: "8px",
            paddingBottom: "16px",
          }}
        >
          {data.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                gap: "4px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "140px",
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                {/* Votes bar */}
                <div
                  style={{
                    height: `${(d.votes / maxVotes) * 140}px`,
                    width: "35%",
                    background:
                      "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "4px 4px 0 0",
                    minHeight: d.votes > 0 ? "4px" : "0px",
                  }}
                  title={`Votes: ${d.votes}`}
                />
                {/* Proposals bar */}
                <div
                  style={{
                    height: `${(d.proposals / maxProposals) * 140}px`,
                    width: "35%",
                    background:
                      "linear-gradient(180deg, #16c784 0%, #12d9c4 100%)",
                    borderRadius: "4px 4px 0 0",
                    minHeight: d.proposals > 0 ? "4px" : "0px",
                  }}
                  title={`Proposals: ${d.proposals}`}
                />
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#888",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {new Date(d.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          marginTop: "16px",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "2px",
            }}
          />
          <span>Votes</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "linear-gradient(180deg, #16c784 0%, #12d9c4 100%)",
              borderRadius: "2px",
            }}
          />
          <span>Proposals</span>
        </div>
      </div>
    </div>
  );
}
