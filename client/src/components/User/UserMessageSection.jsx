import React, { useState, useEffect } from "react";
import { useGetMessageQuery } from "../../redux/api/chatsApi";
import { useSelector } from "react-redux";
import { socket } from "../../socket.io/socketclient";
import SendUsersMessagesSection from "./SendUsersMessagesSection";
import { message } from "antd";
import { useMarkAsReadMutation, useGetNotificationQuery } from "../../redux/api/notificationApi";

const UserMessageSection = () => {
  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const receiverId = selectedUser?._id;
  const userId = user?._id;

  const { data, isLoading, isError, refetch } = useGetMessageQuery(receiverId);
  const [messages, setMessages] = useState([]);

  // Notifications data
  const { data: notificationData } = useGetNotificationQuery();
  const [notificationsData, setNotificationsData] = useState([]);
  const [markAsRead] = useMarkAsReadMutation();

  // Sync messages from API
  useEffect(() => {
    if (data?.data?.messages) {
      setMessages(data.data.messages);
    }
  }, [data]);

  // Sync notifications from API
  useEffect(() => {
    if (notificationData?.data?.notifications) {
      setNotificationsData(notificationData.data.notifications);
    }
  }, [notificationData]);

  // Mark notifications as read when opening a chat
  useEffect(() => {
    if (!receiverId || !notificationsData.length) return;

    const unreadNotifications = notificationsData.filter(
      (n) => !n.isRead && n.senderId?._id === receiverId
    );

    unreadNotifications.forEach((n) => {
      markAsRead(n._id)
        .unwrap()
        .then(() => {
          setNotificationsData((prev) =>
            prev.map((notif) =>
              notif._id === n._id ? { ...notif, isRead: true } : notif
            )
          );
        })
        .catch((err) => console.error("Failed to mark as read", err));
    });
  }, [receiverId, notificationsData, markAsRead]);

  // Socket setup
  useEffect(() => {
    if (!userId) return;

    socket.auth = { userId };
    socket.connect();
    socket.emit("joinRoom", userId);

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
      socket.disconnect();
    };
  }, [userId]);

  if (isLoading) return <div className="p-6">Loading messages...</div>;
  if (isError) return <div className="p-6">Failed to load messages.</div>;

  return (
    <div className="flex flex-col bg-gray-900 text-white h-full overflow-y-auto">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((item, index) => {
          const isSender = item.senderId === userId;

          return (
            <div
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              key={index}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-2xl ${
                  isSender
                    ? "bg-blue-600 rounded-br-none"
                    : "bg-gray-700 rounded-bl-none"
                }`}
              >
                {item.message || item.messages}

                {item.media?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {item.media.map((file, idx) => {
                      const ext = file.split(".").pop().toLowerCase();
                      if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
                        return (
                          <img
                            key={idx}
                            src={file}
                            alt="media"
                            className="max-w-full rounded-md"
                          />
                        );
                      } else if (["mp4", "webm", "ogg"].includes(ext)) {
                        return (
                          <video
                            key={idx}
                            src={file}
                            controls
                            className="max-w-full rounded-md"
                          />
                        );
                      } else if (["mp3", "wav"].includes(ext)) {
                        return (
                          <audio
                            key={idx}
                            src={file}
                            controls
                            className="w-full"
                          />
                        );
                      } else {
                        return (
                          <a
                            key={idx}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-sm text-gray-200"
                          >
                            {file.split("/").pop()}
                          </a>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <SendUsersMessagesSection refetchMessages={refetch} />
    </div>
  );
};

export default UserMessageSection;
