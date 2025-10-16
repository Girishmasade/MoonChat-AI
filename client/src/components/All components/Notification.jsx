import React, { useState } from "react";
import {
  Badge,
  Button,
  Space,
  Dropdown,
  Card,
  Typography,
  Empty,
  Divider,
} from "antd";
import { BellFilled } from "@ant-design/icons";

const { Text, Title } = Typography;

const NotificationButton = () => {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, name: "Harsh", lastname: "Lambhe" },
    { id: 2, name: "Amit", lastname: "Sharma" },
    { id: 3, name: "Priya", lastname: "Verma" },
    { id: 4, name: "Rahul", lastname: "Sachdev" },
    { id: 5, name: "Rohan", lastname: "Chide" },
    { id: 5, name: "Mayur", lastname: "Chide" },
    { id: 5, name: "Jeet", lastname: "Chide" },
    { id: 5, name: "Trupti", lastname: "Chide" },
  ]);

  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  const notificationContent = (
    <Card
      bordered={false}
      style={{
        width: 360,
        background: "linear-gradient(160deg, #0f0f0f, #1a1a1a)",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <Title
          level={5}
          style={{
            color: "#fff",
            margin: 0,
            letterSpacing: "0.5px",
            fontWeight: 500,
          }}
        >
          🔔 Notifications
        </Title>
      </div>

      <Divider style={{ backgroundColor: "#333", margin: "8px 0" }} />

      {/* Notifications */}
      {notifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span style={{ color: "white" }}>No new notifications</span>
          }
          style={{ margin: "20px 0" }}
        />
      ) : (
        <div
          style={{
            maxHeight: 220,
            overflowY: "auto",
            paddingRight: "4px",
          }}
        >
          {notifications.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "6px",
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")
              }
            >
              <Text style={{ color: "#e6e6e6" }}>
                New message from{" "}
                <span style={{ color: "#40a9ff" }}>
                  {item.name} {item.lastname}
                </span>
              </Text>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#40a9ff",
                  flexShrink: 0,
                }}
              ></span>
            </div>
          ))}
        </div>
      )}

      <Divider style={{ backgroundColor: "#333", margin: "10px 0" }} />

      {/* Footer Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <Button
          size="small"
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            borderColor: "#333",
          }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          size="small"
          type="primary"
          style={{
            background: "linear-gradient(135deg, #1677ff, #4096ff)",
            border: "none",
          }}
          onClick={handleMarkAllRead}
        >
          Mark all read
        </Button>
      </div>
    </Card>
  );

  return (
    <Space size={2}>
      <Dropdown
        dropdownRender={() => notificationContent}
        trigger={["click"]}
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
        arrow
      >
        <Badge
          count={notifications.length}
          size="small"
          offset={[-2, 4]}
          style={{ backgroundColor: "#1677ff" }}
        >
          <BellFilled
            style={{
              fontSize: "24px",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Badge>
      </Dropdown>
    </Space>
  );
};

export default NotificationButton;
