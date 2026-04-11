import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem 1.5rem",
        fontFamily: "inherit",
      }}
    >
      {/* Floating illustration */}
      <div style={{ animation: "float 3s ease-in-out infinite", marginBottom: "1.5rem" }}>
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="20" width="90" height="60" rx="6" fill="#E6F1FB" stroke="#B5D4F4" strokeWidth="1" />
          <rect x="15" y="20" width="90" height="14" rx="6" fill="#B5D4F4" />
          <rect x="15" y="26" width="90" height="8" fill="#B5D4F4" />
          <circle cx="26" cy="27" r="3" fill="#85B7EB" />
          <circle cx="36" cy="27" r="3" fill="#85B7EB" />
          <circle cx="46" cy="27" r="3" fill="#85B7EB" />
          <rect x="26" y="44" width="34" height="4" rx="2" fill="#B5D4F4" />
          <rect x="26" y="52" width="54" height="3" rx="1.5" fill="#D3D1C7" />
          <rect x="26" y="58" width="46" height="3" rx="1.5" fill="#D3D1C7" />
          <rect x="26" y="64" width="30" height="3" rx="1.5" fill="#D3D1C7" />
          <circle cx="90" cy="58" r="14" fill="#FCEBEB" stroke="#F7C1C1" strokeWidth="1" />
          <text x="90" y="63" textAnchor="middle" fontSize="16" fontWeight="700" fill="#A32D2D">?</text>
        </svg>
      </div>

      {/* 404 */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: "#0a1f44",
          lineHeight: 1,
          letterSpacing: "-4px",
          animation: "fadeDown .6s ease both",
        }}
      >
        4<span style={{ color: "#185FA5" }}>0</span>4
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#0a1f44",
          margin: "1rem 0 .5rem",
          animation: "fadeUp .6s .1s ease both",
        }}
      >
        Page not found
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 14,
          color: "#8a9ab5",
          lineHeight: 1.65,
          maxWidth: 300,
          margin: "0 auto 2rem",
          animation: "fadeUp .6s .2s ease both",
        }}
      >
        Looks like this page doesn't exist or has been moved. Let's get you back on track.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 22px",
          background: "#185FA5",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          animation: "fadeUp .6s .3s ease both",
          transition: "background .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#0C447C")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#185FA5")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3L5 8l5 5" />
        </svg>
        Go back home
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;