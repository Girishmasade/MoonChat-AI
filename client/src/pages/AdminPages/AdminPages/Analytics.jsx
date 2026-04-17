import React, { useState } from "react";

const cardStyle = {
  background: "#111827",
  border: "1px solid #1f2937",
  borderRadius: 12,
  padding: "1.1rem 1.25rem",
};

const kpis = [
  { label: "New signups", value: "482", delta: "↑ 18%", up: true },
  { label: "Trial → paid conv.", value: "34.2%", delta: "↑ 3.1 pts", up: true },
  { label: "Avg revenue / user", value: "₹567", delta: "↑ ₹42", up: true },
  { label: "Feature adoption", value: "61%", delta: "↓ 2 pts", up: false },
];

const months = [
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
];
const signups = [38, 45, 32, 52, 48, 60, 55, 58, 62, 68, 72, 84];
const churns = [8, 6, 10, 7, 9, 6, 8, 7, 6, 5, 7, 5];

const funnelSteps = [
  { label: "Visited", val: 12400, pct: 100, color: "#374151" },
  { label: "Signed up", val: 8928, pct: 72, color: "#185FA5" },
  { label: "Started trial", val: 5952, pct: 48, color: "#378ADD" },
  { label: "Converted", val: 4216, pct: 34, color: "#1D9E75" },
  { label: "Churned", val: 336, pct: 8, color: "#ef4444" },
];

const geo = [
  { flag: "🇮🇳", name: "India", pct: 62 },
  { flag: "🇺🇸", name: "USA", pct: 18 },
  { flag: "🇬🇧", name: "UK", pct: 10 },
  { flag: "🇩🇪", name: "Germany", pct: 6 },
  { flag: "🇸🇬", name: "Singapore", pct: 4 },
];

const ranges = ["7d", "30d", "90d", "1y"];
const maxSignup = Math.max(...signups);

const Analytics = () => {
  const [range, setRange] = useState("30d");

  return (
    <div style={{  padding: "8px 4px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: "#f9fafb",
            }}
          >
            Analytics
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
            Track growth, engagement and conversion
          </p>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: "5px 13px",
                fontSize: 12,
                borderRadius: 7,
                cursor: "pointer",
                border: "1px solid",
                borderColor: range === r ? "#185FA5" : "#1f2937",
                background: range === r ? "#185FA5" : "transparent",
                color: range === r ? "#fff" : "#9ca3af",
                fontWeight: 500,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {kpis.map((k) => (
          <div key={k.label} style={cardStyle}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              {k.label}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                color: "#f9fafb",
              }}
            >
              {k.value}
            </p>
            <p
              style={{
                margin: "5px 0 0",
                fontSize: 12,
                color: k.up ? "#22c55e" : "#ef4444",
              }}
            >
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Funnel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: 12,
          marginBottom: 12,
        }}
      >
        {/* Bar chart */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 600,
                color: "#e5e7eb",
              }}
            >
              Signups vs churns
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                ["#185FA5", "Signups"],
                ["#374151", "Churns"],
              ].map(([c, l]) => (
                <span
                  key={l}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: c,
                      display: "inline-block",
                    }}
                  />
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 5,
              height: 120,
            }}
          >
            {months.map((m, i) => (
              <div
                key={m}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    height: 108,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      borderRadius: "3px 3px 0 0",
                      background:
                        i === months.length - 1 ? "#378ADD" : "#185FA5",
                      height: `${Math.round((signups[i] / maxSignup) * 108)}px`,
                      transition: "height .3s",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      borderRadius: "3px 3px 0 0",
                      background: "#374151",
                      height: `${Math.round((churns[i] / maxSignup) * 108)}px`,
                    }}
                  />
                </div>
                <span style={{ fontSize: 9, color: "#6b7280" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div style={cardStyle}>
          <p
            style={{
              margin: "0 0 1rem",
              fontSize: 13,
              fontWeight: 600,
              color: "#e5e7eb",
            }}
          >
            Conversion funnel
          </p>
          {funnelSteps.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 9,
              }}
            >
              <span
                style={{
                  width: 88,
                  fontSize: 12,
                  color: "#9ca3af",
                  flexShrink: 0,
                }}
              >
                {s.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 7,
                  background: "#1f2937",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${s.pct}%`,
                    height: "100%",
                    background: s.color,
                    borderRadius: 4,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  width: 40,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {s.val.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Geo */}
        <div style={cardStyle}>
          <p
            style={{
              margin: "0 0 1rem",
              fontSize: 13,
              fontWeight: 600,
              color: "#e5e7eb",
            }}
          >
            Top geographies
          </p>
          {geo.map((g) => (
            <div
              key={g.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 9,
              }}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>
                {g.flag}
              </span>
              <span style={{ width: 72, fontSize: 12, color: "#d1d5db" }}>
                {g.name}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: "#1f2937",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${g.pct}%`,
                    height: "100%",
                    background: "#185FA5",
                    borderRadius: 3,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  width: 28,
                  textAlign: "right",
                }}
              >
                {g.pct}%
              </span>
            </div>
          ))}
        </div>

        {/* Revenue breakdown */}
        <div style={cardStyle}>
          <p
            style={{
              margin: "0 0 1rem",
              fontSize: 13,
              fontWeight: 600,
              color: "#e5e7eb",
            }}
          >
            Revenue breakdown
          </p>
          {[
            { label: "Enterprise", val: "₹38,400", color: "#534AB7" },
            { label: "Pro", val: "₹32,760", color: "#185FA5" },
            { label: "Starter", val: "₹9,800", color: "#1D9E75" },
            { label: "Add-ons", val: "₹3,240", color: "#9ca3af" },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "9px 0",
                borderBottom: "1px solid #1f2937",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "#d1d5db",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: r.color,
                    display: "inline-block",
                  }}
                />
                {r.label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: r.color }}>
                {r.val}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "#9ca3af" }}>Total MRR</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#f9fafb" }}>
              ₹84,200
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
