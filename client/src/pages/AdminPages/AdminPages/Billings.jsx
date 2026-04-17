import React from "react";
import { Tag } from "antd";

const cardStyle = {
  background: "#111827",
  border: "1px solid #1f2937",
  borderRadius: 12,
  padding: "1.1rem 1.25rem",
};

const statCard = (label, value, delta, deltaUp, accent) => (
  <div style={{ ...cardStyle, borderTop: `2px solid ${accent}`, flex: 1 }}>
    <p style={{ margin: 0, fontSize: 12, color: "#6b7280", marginBottom: 6 }}>{label}</p>
    <p style={{ margin: 0, fontSize: 26, fontWeight: 600, color: "#f9fafb" }}>{value}</p>
    {delta && (
      <p style={{ margin: "6px 0 0", fontSize: 12, color: deltaUp ? "#22c55e" : "#ef4444" }}>
        {deltaUp ? "↑" : "↓"} {delta}
      </p>
    )}
  </div>
);

const invoices = [
  { customer: "Acme Corp",    plan: "Enterprise", date: "Apr 1, 2026", amount: "₹18,400", status: "Paid" },
  { customer: "TechFlow",     plan: "Pro",        date: "Apr 1, 2026", amount: "₹6,900",  status: "Paid" },
  { customer: "InvoiceLoop",  plan: "Starter",    date: "Apr 1, 2026", amount: "₹3,600",  status: "Failed" },
  { customer: "DevHub",       plan: "Pro",        date: "Mar 1, 2026", amount: "₹6,900",  status: "Paid" },
  { customer: "Nexora",       plan: "Enterprise", date: "Mar 1, 2026", amount: "₹18,400", status: "Pending" },
];

const statusColor = { Paid: "green", Failed: "red", Pending: "orange" };

const plans = [
  { name: "Free",       users: 110, pct: 8,  color: "#374151" },
  { name: "Starter",    users: 238, pct: 16, color: "#1D9E75" },
  { name: "Pro",        users: 824, pct: 55, color: "#185FA5" },
  { name: "Enterprise", users: 310, pct: 21, color: "#534AB7" },
];

const Billings = () => (
  <div style={{  padding: "8px 4px" }}>

    {/* Header */}
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#f9fafb" }}>Billing & plans</h2>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
        Revenue overview and payment history
      </p>
    </div>

    {/* KPI row */}
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      {statCard("Monthly recurring revenue", "₹84,200", "14.2% this month", true,  "#185FA5")}
      {statCard("Annual run rate",            "₹10.1L",  "on track",         true,  "#1D9E75")}
      {statCard("Failed payments",            "7",       "needs attention",  false, "#ef4444")}
    </div>

    {/* Plan distribution */}
    <div style={{ ...cardStyle, marginBottom: 16 }}>
      <p style={{ margin: "0 0 1rem", fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>
        Plan distribution
      </p>
      {plans.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ width: 80, fontSize: 13, color: "#d1d5db" }}>{p.name}</span>
          <div style={{ flex: 1, height: 7, background: "#1f2937", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${p.pct}%`, height: "100%", background: p.color, borderRadius: 4 }} />
          </div>
          <span style={{ fontSize: 12, color: "#9ca3af", width: 36, textAlign: "right" }}>{p.pct}%</span>
          <span style={{ fontSize: 12, color: "#6b7280", width: 40, textAlign: "right" }}>{p.users}</span>
        </div>
      ))}
    </div>

    {/* Invoices table */}
    <div style={cardStyle}>
      <p style={{ margin: "0 0 1rem", fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>
        Recent invoices
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Customer", "Plan", "Date", "Amount", "Status"].map((h) => (
              <th key={h} style={{ textAlign: "left", fontSize: 11, color: "#6b7280", paddingBottom: 10,
                textTransform: "uppercase", letterSpacing: "0.06rem", fontWeight: 500, borderBottom: "1px solid #1f2937" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1f2937" }}>
              <td style={{ padding: "10px 0", fontSize: 13, color: "#f9fafb", fontWeight: 500 }}>{inv.customer}</td>
              <td style={{ padding: "10px 0", fontSize: 13, color: "#9ca3af" }}>{inv.plan}</td>
              <td style={{ padding: "10px 0", fontSize: 13, color: "#9ca3af" }}>{inv.date}</td>
              <td style={{ padding: "10px 0", fontSize: 13, color: "#f9fafb", fontWeight: 500 }}>{inv.amount}</td>
              <td style={{ padding: "10px 0" }}>
                <Tag color={statusColor[inv.status]} style={{ borderRadius: 20, fontSize: 11 }}>
                  {inv.status}
                </Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

export default Billings;