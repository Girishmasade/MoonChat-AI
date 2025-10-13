import React, { useState } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import {
  BellFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Space } from "antd";
import Sidebar from "./Sidebar";

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout
      style={{
      }}
    >
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
          background: "#001529",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Sidebar />
      </Sider>

      {/* Main Section */}
      <Layout
        style={{
          background: "#0b0e11",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // ✅ Ensures the layout fills full height
        }}
      >
        {/* Header */}
        <Header
          style={{
            padding: "0 16px",
            background: "#0b0e11",
            borderBottom: "1px solid #1c1f26",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
            height: "64px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "18px",
              color: "#fff",
            }}
          />

          <div className="flex gap-5 pr-5 items-center">
            <Space size={2}>
              <Badge count={3} size="small" offset={[0, 4]}>
                <BellFilled style={{ fontSize: "22px", color: "#fff" }} />
              </Badge>
            </Space>

            <Space size={24}>
              <Avatar
                shape="circle"
                size="large"
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#1677ff",
                  cursor: "pointer",
                }}
              />
            </Space>
          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: "10px 10px",
            background: "#0b0e11",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
