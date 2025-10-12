import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  BellFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Space, theme } from "antd";
import Sidebar from "./Sidebar";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#001529", // Ant Design default sidebar color
        }}
      >
        {/* Logo Section */}
        <div
          className="flex items-center justify-center py-6"
          style={{
            height: "100px",
            background: "transparent",
            textAlign: "center",
          }}
        >
          <img
            src="/Logo.png"
            alt="NovaChat AI"
            style={{
              paddingTop: "10px",
              width: collapsed ? "50px" : "140px",
              height: "auto",
              transition: "all 0.3s ease",
              filter: "drop-shadow(0 0 6px rgba(0, 255, 255, 0.6))",
            }}
          />
        </div>

        {/* Sidebar Menu */}
        <Sidebar />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 48,
              height: 48,
            }}
          />

          <div className="flex gap-5 pr-5">
            <Space size={2} style={{paddingTop: "10px"}}>
              <Badge count={3} size="small" offset={[0, 4]}>
                <BellFilled style={{ fontSize: "25px", color: "#555" }} />
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

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
