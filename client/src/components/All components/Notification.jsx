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
  Avatar,
} from "antd";
import { BellFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/app/chatSlice";

const { Text, Title } = Typography;

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, name: "Harsh", lastname: "Lambhe", avatar: "", isRead: false },
    { id: 2, name: "Amit", lastname: "Sharma", avatar: "", isRead: false },
    { id: 3, name: "Priya", lastname: "Verma", avatar: "", isRead: true },
    { id: 4, name: "Rahul", lastname: "Sachdev", avatar: "", isRead: false },
    { id: 5, name: "Rohan", lastname: "Chide", avatar: "", isRead: false },
  ]);

  const handleOpenChange = (flag) => setOpen(flag);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (user) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === user.id ? { ...n, isRead: true } : n))
    );
    dispatch(setSelectedUser(user));
    setOpen(false);
    navigate(`/chats/${user.id}`);
  };

  const notificationContent = (
    <Card
      bordered={false}
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
        <Button
          size="small"
          type="text"
          style={{ color: "#40a9ff" }}
          onClick={handleMarkAllRead}
        >
          Mark all read
        </Button>
      </div>

      <Divider style={{ backgroundColor: "#333", margin: "6px 0" }} />

      {notifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span style={{ color: "white" }}>No new notifications</span>}
          style={{ margin: "20px 0" }}
        />
      ) : (
        <div
          style={{
            maxHeight: 260,
            overflowY: "auto",
            paddingRight: "4px",
          }}
        >
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "6px",
                background: item.isRead ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = item.isRead
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(255, 255, 255, 0.08)")
              }
            >
              <Avatar
                size={40}
                src={item.avatar || ""}
                style={{ backgroundColor: "#1677ff", color: "#fff" }}
              >
                {item.name.charAt(0)}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text style={{ color: "#e6e6e6", fontWeight: item.isRead ? "400" : "600" }}>
                  New message from <span style={{ color: "#40a9ff" }}>{item.name} {item.lastname}</span>
                </Text>
              </div>
              {!item.isRead && (
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#40a9ff",
                    flexShrink: 0,
                  }}
                ></span>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );

  return (
    <Space size={2}>
      <Dropdown
        menu={notificationContent}
        trigger={["click"]}
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
        arrow
      >
        <Badge
          count={notifications.filter((n) => !n.isRead).length}
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
