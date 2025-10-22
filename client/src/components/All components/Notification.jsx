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
  const [notificationsData, setNotificationsData] = useState([]);

  const { data, isLoading, isError, refetch } = useGetNotificationQuery();
  const [clearNotification] = useClearNotificationMutation();
  const [clearSingleNotification] = useClearSingleNotificationMutation();

  useEffect(() => {
    if (data?.data?.notifications) {
      const audio = new Audio("/sounds/notification.mp3")
      audio.play().catch(error => console.log("error in notification", error))
      setNotificationsData(data.data.notifications);
      refetch()
    }
  }, [data]);

  const handleOpenChange = (flag) => setOpen(flag);

  const handleMarkAllRead = () => {
    setNotificationsData((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = async () => {
    try {
      await clearNotification().unwrap();
      setNotificationsData([]);
    } catch (error) {
      console.error("Failed to clear all notifications", error);
    }
  };

  const handleClearSingle = async (id) => {
    try {
      await clearSingleNotification(id).unwrap();
      setNotificationsData((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Failed to clear notification", error);
    }
  };

  const handleNotificationClick = (item) => {
    setNotificationsData((prev) =>
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
          <Button size="small" type="text" style={{ color: "#40a9ff" }} onClick={handleClearAll}>
            Clear All
          </Button>
          <Button size="small" type="text" style={{ color: "#40a9ff" }} onClick={handleMarkAllRead}>
            Mark all read
          </Button>
        </div>
      </div>

      <Divider style={{ backgroundColor: "#333", margin: "6px 0" }} />

      {isLoading ? (
        <Text style={{ color: "#ccc" }}>Loading...</Text>
      ) : isError ? (
        <Text style={{ color: "red" }}>Failed to load notifications</Text>
      ) : notificationsData.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span style={{ color: "white" }}>No new notifications</span>}
          style={{ margin: "20px 0" }}
        />
      ) : (
        <div style={{ maxHeight: 260, overflowY: "auto", paddingRight: "4px" }}>
          {notificationsData.map((item) => (
            <div
              key={item._id}
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
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
              onMouseOut={(e) =>
                (e.currentTarget.style.background = item.isRead
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(255, 255, 255, 0.08)")
              }
            >
              <Avatar
                size={40}
                src={item.senderId?.avatar || ""}
                style={{ backgroundColor: "#1677ff", color: "#fff" }}
              >
                {item.senderId?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text style={{ color: "#e6e6e6", fontWeight: item.isRead ? "400" : "600" }}>
                  {item.content}
                </Text>
                <br />
                <Text style={{ color: "#888", fontSize: "12px" }}>
                  From: {item.senderId?.username}
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {!item.isRead && (
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#40a9ff",
                      flexShrink: 0,
                    }}
                  />
                )}
                <DeleteOutlined
                  style={{ color: "#ff4d4f", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearSingle(item._id);
                  }}
                />
              </div>
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
          count={notificationsData.filter((n) => !n.isRead).length}
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
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Badge>
      </Dropdown>
    </Space>
  );
};

export default Notification;
