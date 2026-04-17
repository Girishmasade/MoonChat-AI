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

/* ── Mock chart data ── */
const aiUsageData = [
  { name: "Mon", requests: 1800, tokens: 4200 },
  { name: "Tue", requests: 2400, tokens: 5100 },
  { name: "Wed", requests: 2100, tokens: 4800 },
  { name: "Thu", requests: 3200, tokens: 6900 },
  { name: "Fri", requests: 2900, tokens: 6200 },
  { name: "Sat", requests: 3600, tokens: 7800 },
  { name: "Sun", requests: 3100, tokens: 7100 },
];

const chatActivityData = [
  { name: "Mon", messages: 320, active: 180 },
  { name: "Tue", messages: 480, active: 220 },
  { name: "Wed", messages: 390, active: 195 },
  { name: "Thu", messages: 620, active: 310 },
  { name: "Fri", messages: 550, active: 275 },
  { name: "Sat", messages: 710, active: 355 },
  { name: "Sun", messages: 640, active: 320 },
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
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    glowColor: "hover:shadow-blue-500/10",
  },
  {
    id: "chats",
    label: "Active Chats",
    value: "8,921",
    trend: "+8.3%",
    trendDir: "up",
    icon: <LuMessageCircleMore />,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    glowColor: "hover:shadow-purple-500/10",
  },
  {
    id: "ai",
    label: "AI Requests",
    value: "12,340",
    trend: "+23.1%",
    trendDir: "up",
    icon: <LuBrainCircuit />,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    glowColor: "hover:shadow-amber-500/10",
  },
  {
    id: "flags",
    label: "Flagged Content",
    value: "23",
    trend: "-4.2%",
    trendDir: "down",
    icon: <MdOutlineFlag />,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/20",
    glowColor: "hover:shadow-rose-500/10",
  },
];

/* ── Activity feed ── */
const activityFeed = [
  {
    text: <><strong className="text-white">John Doe</strong> sent a new message in #general</>,
    time: "2 minutes ago",
    icon: <LuMessageCircleMore />,
    dotBg: "bg-blue-500/10",
    dotColor: "text-blue-400",
  },
  {
    text: <><strong className="text-white">AI Engine</strong> processed 150 requests this hour</>,
    time: "8 minutes ago",
    icon: <FaRobot />,
    dotBg: "bg-purple-500/10",
    dotColor: "text-purple-400",
  },
  {
    text: <><strong className="text-white">Sarah Wilson</strong> registered a new account</>,
    time: "15 minutes ago",
    icon: <MdOutlinePersonAdd />,
    dotBg: "bg-green-500/10",
    dotColor: "text-green-400",
  },
  {
    text: <>Content flagged in conversation <strong className="text-white">#C-2849</strong></>,
    time: "32 minutes ago",
    icon: <MdOutlineFlag />,
    dotBg: "bg-amber-500/10",
    dotColor: "text-amber-400",
  },
  {
    text: <>System backup completed <strong className="text-white">successfully</strong></>,
    time: "1 hour ago",
    icon: <FaServer />,
    dotBg: "bg-green-500/10",
    dotColor: "text-green-400",
  },
  {
    text: <><strong className="text-white">API rate limit</strong> threshold reached (90%)</>,
    time: "1.5 hours ago",
    icon: <IoFlashOutline />,
    dotBg: "bg-rose-500/10",
    dotColor: "text-rose-400",
  },
];

/* ── System status items ── */
const systemStatus = [
  { label: "API Server",   icon: <FaServer />,   status: "ok",   statusText: "Operational", iconBg: "bg-sky-400/10",    iconColor: "text-sky-400",    badgeBg: "bg-green-500/10",  badgeColor: "text-green-400",  dotColor: "bg-green-400" },
  { label: "AI Engine",    icon: <FaRobot />,    status: "ok",   statusText: "Running",     iconBg: "bg-violet-400/10", iconColor: "text-violet-400", badgeBg: "bg-green-500/10",  badgeColor: "text-green-400",  dotColor: "bg-green-400" },
  { label: "Database",     icon: <FaDatabase />, status: "ok",   statusText: "Healthy",     iconBg: "bg-green-400/10",  iconColor: "text-green-400",  badgeBg: "bg-green-500/10",  badgeColor: "text-green-400",  dotColor: "bg-green-400" },
  { label: "Memory Usage", icon: <FaMemory />,   status: "warn", statusText: "78% Used",    iconBg: "bg-amber-400/10",  iconColor: "text-amber-400",  badgeBg: "bg-amber-500/10",  badgeColor: "text-amber-400",  dotColor: "bg-amber-400" },
  { label: "Security",     icon: <FaShieldAlt />,status: "ok",   statusText: "No Threats",  iconBg: "bg-green-400/10",  iconColor: "text-green-400",  badgeBg: "bg-green-500/10",  badgeColor: "text-green-400",  dotColor: "bg-green-400" },
];

/* ── Quick actions ── */
const quickActions = [
  { label: "View Users",  icon: <HiOutlineUserGroup />,      path: "/admin-users" },
  { label: "View Chats",  icon: <LuMessageCircleMore />,     path: "/admin-chats" },
  { label: "Analytics",   icon: <MdAnalytics />,             path: "/admin-analytics" },
  { label: "Settings",    icon: <HiOutlineCog />,            path: "/admin-settings" },
  { label: "Reports",     icon: <HiOutlineDocumentReport />, path: "/admin-analytics" },
];

/* ── Custom Recharts Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-white/[0.08] rounded-xl px-4 py-3 shadow-2xl shadow-black/40">
      <p className="text-slate-400 font-semibold mb-1.5 text-xs">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs my-0.5" style={{ color: entry.color }}>
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
    <div className="p-6 space-y-6 min-h-screen bg-[#0d1117] text-white">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {greeting()}, {user?.name || "Admin"} 👋
          </h2>
          <p className="text-slate-400 text-sm mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          System Live
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsConfig.map((s) => (
          <div
            key={s.id}
            className={`bg-[#161b22] border ${s.borderColor} rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 hover:shadow-xl ${s.glowColor} hover:-translate-y-0.5`}
          >
            {/* Top row: icon + trend */}
            <div className="flex items-center justify-between">
              <div className={`${s.iconBg} ${s.iconColor} w-10 h-10 rounded-xl flex items-center justify-center text-lg`}>
                {s.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  s.trendDir === "up"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {s.trendDir === "up" ? <LuTrendingUp /> : <LuTrendingDown />}
                {s.trend}
              </span>
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">{s.value}</span>
            <span className="text-slate-400 text-sm">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* AI Usage Chart */}
        <div className="bg-[#161b22] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-white font-semibold text-base">AI Usage</h3>
              <p className="text-slate-500 text-xs mt-0.5">Requests & token consumption this week</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                Requests
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block" />
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
        <div className="bg-[#161b22] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-white font-semibold text-base">Chat Activity</h3>
              <p className="text-slate-500 text-xs mt-0.5">Messages & active sessions this week</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" />
                Messages
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Recent Activity Timeline */}
        <div className="bg-[#161b22] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-base">Recent Activity</h3>
              <p className="text-slate-500 text-xs mt-0.5">Latest events across the platform</p>
            </div>
            <LuActivity className="text-slate-500 text-lg mt-0.5" />
          </div>
          <div className="space-y-4">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`${a.dotBg} ${a.dotColor} w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0`}>
                  {a.icon}
                </div>
                <div>
                  <p className="text-slate-300 text-sm leading-snug">{a.text}</p>
                  <p className="text-slate-500 text-xs mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#161b22] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-base">System Status</h3>
              <p className="text-slate-500 text-xs mt-0.5">Infrastructure health overview</p>
            </div>
            <MdOutlineAutoGraph className="text-slate-500 text-lg mt-0.5" />
          </div>
          <div className="space-y-3">
            {systemStatus.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${s.iconBg} ${s.iconColor} w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0`}>
                    {s.icon}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{s.label}</span>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${s.badgeBg} ${s.badgeColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dotColor}`} />
                  {s.statusText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((a, i) => (
          <button
            key={i}
            onClick={() => navigate(a.path)}
            className="flex items-center gap-2 bg-[#1e2530] hover:bg-[#252d3a] border border-white/[0.07] hover:border-white/[0.15] text-slate-300 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="text-base">{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;