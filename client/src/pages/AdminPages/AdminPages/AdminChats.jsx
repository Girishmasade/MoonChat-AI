import React, { useState } from "react";

const chats = [
  { id: 1, a: "Arjun K.",  b: "Sara M.",   lastMsg: "Hey, can you share the report?",   time: "2 min ago",  unread: 3 },
  { id: 2, a: "Priya R.",  b: "Vikram N.", lastMsg: "Meeting rescheduled to 4 PM.",     time: "14 min ago", unread: 1 },
  { id: 3, a: "Dev P.",    b: "Riya L.",   lastMsg: "Thanks, I'll check it out.",        time: "1 hr ago",   unread: 0 },
  { id: 4, a: "Neha S.",   b: "Arjun K.", lastMsg: "The build failed again 😅",         time: "2 hrs ago",  unread: 0 },
  { id: 5, a: "Vikram N.", b: "Dev P.",    lastMsg: "Please review the PR when free.",   time: "3 hrs ago",  unread: 0 },
  { id: 6, a: "Riya L.",   b: "Neha S.",  lastMsg: "Got it, I'll update the docs.",     time: "5 hrs ago",  unread: 0 },
];

const messages = [
  { from: "Arjun K.", text: "Hey, can you share the Q1 report?",       time: "10:02 AM", mine: false },
  { from: "Sara M.",  text: "Sure, give me a minute.",                  time: "10:03 AM", mine: true  },
  { from: "Arjun K.", text: "No rush, take your time.",                 time: "10:03 AM", mine: false },
  { from: "Sara M.",  text: "Here it is — just shared via Drive.",      time: "10:06 AM", mine: true  },
  { from: "Arjun K.", text: "Got it, thanks! I'll review and revert.",  time: "10:07 AM", mine: false },
  { from: "Arjun K.", text: "Hey, can you share the report?",           time: "10:09 AM", mine: false },
];

const initials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const avatarPalette = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-red-100 text-red-700",
];

const AdminChats = () => {
  const [selected, setSelected] = useState(chats[0]);
  const [search, setSearch] = useState("");

  const filtered = chats.filter(
    (c) =>
      c.a.toLowerCase().includes(search.toLowerCase()) ||
      c.b.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-4 h-[calc(100vh-100px)] p-1">

      {/* Left panel */}
      <div className="w-72 shrink-0 flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

        <div className="p-4 pb-3 border-b border-gray-800">
          <h2 className="text-base font-semibold text-gray-50 mb-2.5">Chats</h2>
          <input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b0e11] border border-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 placeholder-gray-500 outline-none focus:border-gray-600 transition"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer border-b border-gray-800 transition-colors duration-150 ${
                selected.id === c.id ? "bg-gray-800" : "hover:bg-gray-800/50"
              }`}
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarPalette[i % avatarPalette.length]}`}>
                {initials(c.a)}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-200 truncate">{c.a} ↔ {c.b}</span>
                  {c.unread > 0 && (
                    <span className="text-[10px] bg-blue-600 text-white rounded-full px-1.5 py-0.5 font-semibold ml-1 shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-xs text-gray-500 truncate max-w-[140px]">{c.lastMsg}</span>
                  <span className="text-[10px] text-gray-500 shrink-0 ml-1">{c.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-800">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold shrink-0">
            {initials(selected.a)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-50 m-0">{selected.a} ↔ {selected.b}</p>
            <p className="text-xs text-gray-500 m-0">View-only — admin monitor</p>
          </div>
          <div className="ml-auto text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
            {messages.length} messages
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2.5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[65%]">
                {!m.mine && (
                  <p className="text-[11px] text-gray-500 mb-1">{m.from}</p>
                )}
                <div
                  className={`px-3 py-2 text-sm text-gray-100 leading-relaxed ${
                    m.mine
                      ? "bg-blue-600 rounded-t-xl rounded-bl-xl rounded-br-sm"
                      : "bg-gray-800 rounded-t-xl rounded-br-xl rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
                <p className={`text-[10px] text-gray-500 mt-1 ${m.mine ? "text-right" : "text-left"}`}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="px-5 py-3 border-t border-gray-800 bg-[#0b0e11] text-xs text-gray-500 text-center">
          You are viewing this conversation as an admin. Messages cannot be sent.
        </div>
      </div>

    </div>
  );
};

export default AdminChats;