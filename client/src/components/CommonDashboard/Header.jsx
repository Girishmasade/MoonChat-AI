import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode = savedTheme === "dark";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: isDark
          ? "rgba(20,20,20,0.7)"
          : "rgba(255,255,255,0.7)",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      {/* Left Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px",
          fontWeight: "bold",
          color: isDark ? "#fff" : "#000",
        }}
      >
        <div
          style={{
            background: "#9254de",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "6px",
            width: "60px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Moon
        </div>
        Chatt-AI
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          type="text"
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ fontSize: "20px", color: isDark ? "#fff" : "#000" }}
        />
        <Button
          type="primary"
          style={{ background: "#9254de", border: "none" }}
        >
          <Link to={"/signin"}>Login</Link>
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
