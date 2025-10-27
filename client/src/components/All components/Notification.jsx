import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Space,
  Dropdown,
  Card,
  Typography,
  Empty,
  Divider,
  Avatar,
  message,
} from "antd";
import { BellFilled, DeleteOutlined } from "@ant-design/icons";
import {
  useGetNotificationQuery,
  useClearNotificationMutation,
  useClearSingleNotificationMutation,
} from "../../redux/api/notificationApi";

const { Text, Title } = Typography;

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  console.log(notifications);

  const { data, isLoading, isError } = useGetNotificationQuery();
  const [clearNotification] = useClearNotificationMutation();
  const [clearSingleNotification] = useClearSingleNotificationMutation();

  useEffect(() => {
    if (data?.data?.notifications) {
      setNotifications(data.data.notifications);
    }
  }, [data]);

  const handleOpenChange = (flag) => setOpen(flag);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = async () => {
    try {
      await clearNotification().unwrap();
      setNotifications([]);
      message.success("All notifications cleared!");
    } catch {
      message.error("Failed to clear notifications");
    }
  };

  const handleClearSingle = async (id) => {
    try {
      await clearSingleNotification(id).unwrap();
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      message.success("Notification removed");
    } catch {
      message.error("Failed to remove notification");
    }
  };

  const handleNotificationClick = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === item._id ? { ...n, isRead: true } : n))
    );
    setOpen(false);
  };

  const notificationContent = (
    <Card
      style={{
        width: 380,
        background: "linear-gradient(160deg, #0f0f0f, #1a1a1a)",
        color: "white",
        boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        borderRadius: "14px",
        padding: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Title level={5} style={{ color: "#fff", margin: 0 }}>
          🔔 Notifications
        </Title>
        <div className="flex gap-2">
          <Button
            size="small"
            type="text"
            style={{ color: "#40a9ff" }}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
          <Button
            size="small"
            type="text"
            style={{ color: "#40a9ff" }}
            onClick={handleMarkAllRead}
          >
            Mark all read
          </Button>
        </div>
      </div>

      <Divider style={{ backgroundColor: "#333", margin: "6px 0" }} />

      {isLoading ? (
        <Text style={{ color: "#ccc" }}>Loading...</Text>
      ) : isError ? (
        <Text style={{ color: "red" }}>Failed to load notifications</Text>
      ) : notifications.length === 0 ? (
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
            maxHeight: 260,
            overflowY: "auto",
            paddingRight: "4phttp://localhost:5173/chat-dashboardx",
          }}
        >
          {notifications.map((item) => (
            <div
              key={item._id}
              className="notification-item"
              style={{
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "6px",
                background: item.isRead
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onClick={() => handleNotificationClick(item)}
            >
              <Avatar
                size={40}
                src={item.senderId?.avatar || undefined}
                style={{ backgroundColor: "#1677ff", color: "#fff" }}
              >
                {item.senderId?.username?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#e6e6e6",
                    fontWeight: item.isRead ? "400" : "600",
                  }}
                >
                  {item.content}
                </Text>
                <br />
                <Text style={{ color: "#888", fontSize: "12px" }}>
                  From: {item.senderId?.username}
                </Text>
              </div>
              <DeleteOutlined
                style={{ color: "#ff4d4f", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearSingle(item._id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );

  return (
    <Space size={2}>
      <Dropdown
        popupRender={() => notificationContent}
        trigger={["click"]}
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
        arrow
      >
        <Badge
          count={notifications?.filter((n) => !n.isRead)?.length || 0}
          size="small"
          offset={[-2, 4]}
          style={{ backgroundColor: "#1677ff" }}
        >
          <BellFilled
            style={{
              fontSize: "26px",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          />
        </Badge>
      </Dropdown>
    </Space>
  );
};

export default Notification;
