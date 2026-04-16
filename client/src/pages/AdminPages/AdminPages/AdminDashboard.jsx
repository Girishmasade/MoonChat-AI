import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  FaUserFriends, FaRobot, FaServer,
  FaDatabase, FaMemory, FaShieldAlt,
} from "react-icons/fa";
import {
  LuMessageCircleMore, LuBrainCircuit,
  LuTrendingUp, LuTrendingDown, LuActivity,
} from "react-icons/lu";
import {
  MdOutlineFlag, MdOutlinePersonAdd,
  MdOutlineAutoGraph, MdAnalytics,
} from "react-icons/md";
import {
  HiOutlineUserGroup, HiOutlineCog,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { IoFlashOutline } from "react-icons/io5";
import "./AdminDashboard.css";

/* ── Mock chart data ── */
const aiUsageData = [
  { name: "Mon",  requests: 1800, tokens: 4200 },
  { name: "Tue",  requests: 2400, tokens: 5100 },
  { name: "Wed",  requests: 2100, tokens: 4800 },
  { name: "Thu",  requests: 3200, tokens: 6900 },
  { name: "Fri",  requests: 2900, tokens: 6200 },
  { name: "Sat",  requests: 3600, tokens: 7800 },
  { name: "Sun",  requests: 3100, tokens: 7100 },
];

const chatActivityData = [
  { name: "Mon",  messages: 320,  active: 180 },
  { name: "Tue",  messages: 480,  active: 220 },
  { name: "Wed",  messages: 390,  active: 195 },
  { name: "Thu",  messages: 620,  active: 310 },
  { name: "Fri",  messages: 550,  active: 275 },
  { name: "Sat",  messages: 710,  active: 355 },
  { name: "Sun",  messages: 640,  active: 320 },
];

/* ── Stat card configs ── */
const statsConfig = [
  {
    id: "users",
    label: "Total Users",
    value: "1,234",
    trend: "+12.5%",
    trendDir: "up",
    icon: <FaUserFriends />,
    color: "blue",
  },
  {
    id: "chats",
    label: "Active Chats",
    value: "8,921",
    trend: "+8.3%",
    trendDir: "up",
    icon: <LuMessageCircleMore />,
    color: "purple",
  },
  {
    id: "ai",
    label: "AI Requests",
    value: "12,340",
    trend: "+23.1%",
    trendDir: "up",
    icon: <LuBrainCircuit />,
    color: "amber",
  },
  {
    id: "flags",
    label: "Flagged Content",
    value: "23",
    trend: "-4.2%",
    trendDir: "down",
    icon: <MdOutlineFlag />,
    color: "rose",
  },
];

/* ── Activity feed ── */
const activityFeed = [
  {
    text: <><strong>John Doe</strong> sent a new message in #general</>,
    time: "2 minutes ago",
    icon: <LuMessageCircleMore />,
    color: "blue",
  },
  {
    text: <><strong>AI Engine</strong> processed 150 requests this hour</>,
    time: "8 minutes ago",
    icon: <FaRobot />,
    color: "purple",
  },
  {
    text: <><strong>Sarah Wilson</strong> registered a new account</>,
    time: "15 minutes ago",
    icon: <MdOutlinePersonAdd />,
    color: "green",
  },
  {
    text: <>Content flagged in conversation <strong>#C-2849</strong></>,
    time: "32 minutes ago",
    icon: <MdOutlineFlag />,
    color: "amber",
  },
  {
    text: <>System backup completed <strong>successfully</strong></>,
    time: "1 hour ago",
    icon: <FaServer />,
    color: "green",
  },
  {
    text: <><strong>API rate limit</strong> threshold reached (90%)</>,
    time: "1.5 hours ago",
    icon: <IoFlashOutline />,
    color: "rose",
  },
];

/* ── System status items ── */
const systemStatus = [
  { label: "API Server",    icon: <FaServer />,    status: "ok",   statusText: "Operational",  bg: "rgba(56,189,248,0.1)",  color: "#38bdf8" },
  { label: "AI Engine",     icon: <FaRobot />,     status: "ok",   statusText: "Running",      bg: "rgba(167,139,250,0.1)", color: "#a78bfa" },
  { label: "Database",      icon: <FaDatabase />,  status: "ok",   statusText: "Healthy",      bg: "rgba(34,197,94,0.1)",   color: "#4ade80" },
  { label: "Memory Usage",  icon: <FaMemory />,    status: "warn", statusText: "78% Used",     bg: "rgba(251,191,36,0.1)",  color: "#fbbf24" },
  { label: "Security",      icon: <FaShieldAlt />, status: "ok",   statusText: "No Threats",   bg: "rgba(34,197,94,0.1)",   color: "#4ade80" },
];

/* ── Quick actions ── */
const quickActions = [
  { label: "View Users",     icon: <HiOutlineUserGroup />,        path: "/admin-users" },
  { label: "View Chats",     icon: <LuMessageCircleMore />,       path: "/admin-chats" },
  { label: "Analytics",      icon: <MdAnalytics />,               path: "/admin-analytics" },
  { label: "Settings",       icon: <HiOutlineCog />,              path: "/admin-settings" },
  { label: "Reports",        icon: <HiOutlineDocumentReport />,   path: "/admin-analytics" },
];

/* ── Custom Recharts Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <p style={{ color: "#94a3b8", fontWeight: 600, margin: "0 0 6px", fontSize: "0.78rem" }}>
        {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, margin: "2px 0", fontSize: "0.82rem" }}>
          {entry.name}: <strong>{entry.value.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   AdminDashboard Component
   ══════════════════════════════════════════════════════ */
const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const greeting = () => {
    const h = clock.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedDate = clock.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="admin-dash">

      {/* ── Header ── */}
      <div className="admin-dash__header">
        <div className="admin-dash__greeting">
          <h2>{greeting()}, {user?.name || "Admin"} 👋</h2>
          <p>{formattedDate}</p>
        </div>
        <div className="admin-dash__live-badge">
          <span className="admin-dash__live-dot" />
          System Live
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="admin-dash__stats">
        {statsConfig.map((s) => (
          <div key={s.id} className={`stat-card stat-card--${s.color}`}>
            <div className="stat-card__top">
              <div className={`stat-card__icon stat-card__icon--${s.color}`}>
                {s.icon}
              </div>
              <span
                className={`stat-card__trend stat-card__trend--${s.trendDir}`}
              >
                {s.trendDir === "up" ? <LuTrendingUp /> : <LuTrendingDown />}
                {s.trend}
              </span>
            </div>
            <span className="stat-card__value">{s.value}</span>
            <span className="stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="admin-dash__charts">

        {/* AI Usage Chart */}
        <div className="glass-card">
          <div className="glass-card__header">
            <div>
              <h3 className="glass-card__title">AI Usage</h3>
              <p className="glass-card__subtitle">Requests & token consumption this week</p>
            </div>
            <div className="chart-legend">
              <span className="chart-legend__item">
                <span className="chart-legend__dot" style={{ background: "#38bdf8" }} />
                Requests
              </span>
              <span className="chart-legend__item">
                <span className="chart-legend__dot" style={{ background: "#a78bfa" }} />
                Tokens
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={aiUsageData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#38bdf8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#a78bfa" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="requests" stroke="#38bdf8" strokeWidth={2.5} fill="url(#gradBlue)" />
              <Area type="monotone" dataKey="tokens"   stroke="#a78bfa" strokeWidth={2}   fill="url(#gradPurple)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chat Activity Chart */}
        <div className="glass-card">
          <div className="glass-card__header">
            <div>
              <h3 className="glass-card__title">Chat Activity</h3>
              <p className="glass-card__subtitle">Messages & active sessions this week</p>
            </div>
            <div className="chart-legend">
              <span className="chart-legend__item">
                <span className="chart-legend__dot" style={{ background: "#818cf8" }} />
                Messages
              </span>
              <span className="chart-legend__item">
                <span className="chart-legend__dot" style={{ background: "#22d3ee" }} />
                Active
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chatActivityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="messages" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={18} />
              <Bar dataKey="active"   fill="#22d3ee" radius={[6, 6, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row: Activity + System Status ── */}
      <div className="admin-dash__bottom">

        {/* Recent Activity Timeline */}
        <div className="glass-card">
          <div className="glass-card__header">
            <div>
              <h3 className="glass-card__title">Recent Activity</h3>
              <p className="glass-card__subtitle">Latest events across the platform</p>
            </div>
            <LuActivity style={{ color: "#64748b", fontSize: 18 }} />
          </div>
          <div>
            {activityFeed.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className={`activity-dot activity-dot--${a.color}`}>
                  {a.icon}
                </div>
                <div className="activity-content">
                  <p className="activity-content__text">{a.text}</p>
                  <p className="activity-content__time">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="glass-card">
          <div className="glass-card__header">
            <div>
              <h3 className="glass-card__title">System Status</h3>
              <p className="glass-card__subtitle">Infrastructure health overview</p>
            </div>
            <MdOutlineAutoGraph style={{ color: "#64748b", fontSize: 18 }} />
          </div>
          <div>
            {systemStatus.map((s, i) => (
              <div className="status-item" key={i}>
                <div className="status-item__left">
                  <div
                    className="status-item__icon"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <span className="status-item__label">{s.label}</span>
                </div>
                <span className={`status-badge status-badge--${s.status}`}>
                  <span className="status-badge__dot" />
                  {s.statusText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="admin-dash__actions">
        {quickActions.map((a, i) => (
          <button
            key={i}
            className="action-btn"
            onClick={() => navigate(a.path)}
          >
            <span className="action-btn__icon">{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;