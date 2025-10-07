import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    background:
      theme === "dark"
        ? "rgba(20,20,20,0.7)"
        : "rgba(255,255,255,0.7)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
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
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <div
          style={{
            background: "#9254de",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "6px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          C
        </div>
        Chatter
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          type="text"
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ fontSize: "20px", color: theme === "dark" ? "#fff" : "#000" }}
        />
        <Button type="primary" style={{ background: "#9254de", border: "none" }}>
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
