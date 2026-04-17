import React, { useState } from "react";

const allUsers = [
  { key: 1, name: "Arjun Kumar",  email: "arjun@acmecorp.io",   plan: "Enterprise", role: "Admin",  joined: "Jan 12, 2025", lastActive: "Just now",   status: "Active"    },
  { key: 2, name: "Sara Mehta",   email: "sara@techflow.io",    plan: "Pro",        role: "Member", joined: "Mar 4, 2025",  lastActive: "2 hrs ago",  status: "Active"    },
  { key: 3, name: "Priya Rao",    email: "priya@devhub.co",     plan: "Pro",        role: "Viewer", joined: "Jun 18, 2025", lastActive: "1 day ago",  status: "Inactive"  },
  { key: 4, name: "Vikram Nair",  email: "vikram@nexora.ai",    plan: "Enterprise", role: "Admin",  joined: "Feb 2, 2025",  lastActive: "3 days ago", status: "Suspended" },
  { key: 5, name: "Dev Patel",    email: "dev@invoiceloop.com", plan: "Starter",    role: "Member", joined: "Apr 10, 2026", lastActive: "5 min ago",  status: "Active"    },
  { key: 6, name: "Riya Lal",     email: "riya@startup.co",     plan: "Free",       role: "Member", joined: "Apr 11, 2026", lastActive: "1 hr ago",   status: "Active"    },
  { key: 7, name: "Neha Singh",   email: "neha@designco.io",    plan: "Pro",        role: "Viewer", joined: "Dec 5, 2024",  lastActive: "2 days ago", status: "Active"    },
];

const avatarPalette = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-red-100 text-red-700",
  "bg-lime-100 text-lime-700",
];

const initials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const planBadge = {
  Enterprise: "bg-violet-900/50 text-violet-300 border border-violet-700/40",
  Pro:        "bg-blue-900/50 text-blue-300 border border-blue-700/40",
  Starter:    "bg-lime-900/50 text-lime-300 border border-lime-700/40",
  Free:       "bg-gray-800 text-gray-400 border border-gray-700",
};

const statusBadge = {
  Active:    "bg-green-900/50 text-green-400 border border-green-700/40",
  Inactive:  "bg-gray-800 text-gray-400 border border-gray-700",
  Suspended: "bg-red-900/50 text-red-400 border border-red-700/40",
};

const summaryChips = [
  { label: "Total",     val: 3284, color: "text-gray-300" },
  { label: "Active",    val: 2891, color: "text-green-400" },
  { label: "Inactive",  val: 341,  color: "text-gray-400"  },
  { label: "Suspended", val: 52,   color: "text-red-400"   },
];

const TABLE_HEADERS = ["User", "Plan", "Role", "Joined", "Last Active", "Status", "Actions"];

const Users = () => {
  const [search, setSearch]   = useState("");
  const [planF, setPlanF]     = useState("All");
  const [statusF, setStatusF] = useState("All");
  const [tab, setTab]         = useState("All");

  const filtered = allUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan   = planF   === "All" || u.plan   === planF;
    const matchStatus = statusF === "All" || u.status === statusF;
    const matchTab    = tab === "All" || (tab === "Admins" ? u.role === "Admin" : u.role !== "Admin");
    return matchSearch && matchPlan && matchStatus && matchTab;
  });

  return (
    <div className="max-w-5xl p-2">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-50">User Management</h2>
        <p className="text-sm text-gray-500 mt-1">Manage all registered users and their plans</p>
      </div>

      {/* Summary chips */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {summaryChips.map((c) => (
          <div key={c.label} className="px-3.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs">
            <span className="text-gray-500">{c.label} </span>
            <span className={`font-semibold ${c.color}`}>{c.val.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-44 bg-[#0b0e11] border border-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 placeholder-gray-500 outline-none focus:border-gray-600 transition"
        />
        <select
          value={planF}
          onChange={(e) => setPlanF(e.target.value)}
          className="bg-[#0b0e11] border border-gray-800 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-gray-600 transition cursor-pointer w-36"
        >
          {["All", "Enterprise", "Pro", "Starter", "Free"].map((v) => (
            <option key={v} value={v}>{v === "All" ? "All plans" : v}</option>
          ))}
        </select>
        <select
          value={statusF}
          onChange={(e) => setStatusF(e.target.value)}
          className="bg-[#0b0e11] border border-gray-800 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-gray-600 transition cursor-pointer w-36"
        >
          {["All", "Active", "Inactive", "Suspended"].map((v) => (
            <option key={v} value={v}>{v === "All" ? "All status" : v}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-0">
        {["All", "Admins", "Members"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-medium cursor-pointer bg-transparent border-none border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0b0e11]">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-3.5 py-2.5 text-left text-[10px] uppercase tracking-wider text-gray-500 font-medium border-b border-gray-800"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr
                key={u.key}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-100"
              >
                {/* User */}
                <td className="px-3.5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarPalette[i % avatarPalette.length]}`}>
                      {initials(u.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100 m-0">{u.name}</p>
                      <p className="text-xs text-gray-500 m-0">{u.email}</p>
                    </div>
                  </div>
                </td>
                {/* Plan */}
                <td className="px-3.5 py-3">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${planBadge[u.plan]}`}>
                    {u.plan}
                  </span>
                </td>
                {/* Role */}
                <td className="px-3.5 py-3 text-sm text-gray-400">{u.role}</td>
                {/* Joined */}
                <td className="px-3.5 py-3 text-xs text-gray-500">{u.joined}</td>
                {/* Last Active */}
                <td className="px-3.5 py-3 text-xs text-gray-500">{u.lastActive}</td>
                {/* Status */}
                <td className="px-3.5 py-3">
                  <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${statusBadge[u.status]}`}>
                    {u.status}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-3.5 py-3">
                  <div className="flex gap-1.5">
                    <button className="px-2.5 py-1 text-xs rounded-md border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-500 bg-transparent transition cursor-pointer">
                      View
                    </button>
                    {u.status === "Suspended" ? (
                      <button className="px-2.5 py-1 text-xs rounded-md border border-blue-700/50 text-blue-400 hover:bg-blue-900/30 bg-transparent transition cursor-pointer">
                        Restore
                      </button>
                    ) : (
                      <button className="px-2.5 py-1 text-xs rounded-md border border-red-900/50 text-red-400 hover:bg-red-900/20 bg-transparent transition cursor-pointer">
                        Suspend
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
          <span className="text-xs text-gray-500">
            Showing {filtered.length} of {allUsers.length} users
          </span>
          <div className="flex gap-1">
            {["← Prev", "1", "2", "3", "Next →"].map((p) => (
              <button
                key={p}
                className={`px-2.5 py-1 text-xs rounded-md border transition cursor-pointer ${
                  p === "1"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Users;