import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Layout } from "antd";
import Sidebar from "./Sidebar";
import NotificationButton from "./Notification";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Desktop: collapsed/expanded | Mobile: drawer open/closed
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile via window width (simple, no extra dep)
  const isMobile = () => window.innerWidth < 768;

  const handleMenuToggle = () => {
    if (isMobile()) {
      setDrawerOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <Layout className="min-h-screen">

      {/* ── Desktop Sider (hidden on mobile via CSS) ── */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        collapsedWidth={80}
        className="hidden md:block"
        style={{
          background: "#001529",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Sidebar />
      </Sider>

      {/* ── Mobile Drawer Sidebar ── */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={220}
        styles={{
          body: { padding: 0, background: "#001529" },
          header: { display: "none" },
        }}
        className="md:hidden"
      >
        <Sidebar />
      </Drawer>

      {/* ── Main Section ── */}
      <Layout
        style={{
          background: "#0b0e11",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          // Prevent content from going under a fixed sidebar on desktop
          transition: "margin-left 0.2s",
        }}
      >
        {/* ── Header ── */}
        <Header
          style={{
            padding: "0 12px",
            background: "#0b0e11",
            borderBottom: "1px solid #1c1f26",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
            height: "56px",
          }}
        >
          {/* Hamburger / collapse toggle */}
          <Button
            type="text"
            icon={
              collapsed || drawerOpen
                ? <MenuUnfoldOutlined />
                : <MenuFoldOutlined />
            }
            onClick={handleMenuToggle}
            style={{ fontSize: "18px", color: "#fff", flexShrink: 0 }}
          />

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-5 pr-1 sm:pr-4">
            <div className="pt-2">
              <NotificationButton />
            </div>

            <Avatar
              src={user?.avatar || undefined}
              shape="circle"
              size="default"
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
                border: "2px solid #22d3ee",
                flexShrink: 0,
              }}
              onClick={() => navigate("/settings")}
            />
          </div>
        </Header>

        {/* ── Content ── */}
        <Content
          style={{
            padding: "12px",
            background: "#0b0e11",
            color: "#fff",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;