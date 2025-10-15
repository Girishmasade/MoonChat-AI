import React, { useEffect, useRef, useState } from "react";
import SendUsersMessagesSection from "./SendUsersMessagesSection";

const UserMessageSection = ({ selectedUser }) => {
  const [messages, setMessages] = useState([
    { senderId: "1", messages: "Hey there!", media: [] },
    { senderId: selectedUser?._id, messages: "Hello! How are you?", media: [] },
  ]);
  const currentUserId = "1"; // mock logged-in user
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      senderId: currentUserId,
      messages: messageText,
      media: [],
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: selectedUser?._id,
          messages: "Got your message 😊",
          media: [],
        },
      ]);
    }, 700);
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white h-full overflow-y-auto">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-600">
        {messages.map((item, index) => {
          const isSender = item.senderId === currentUserId;
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-2xl shadow-md ${
                  isSender
                    ? "bg-blue-600 rounded-br-none"
                    : "bg-gray-700 rounded-bl-none"
                }`}
              >
                {item.messages}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input area */}
      <SendUsersMessagesSection onSend={handleSendMessage} selectedUser={selectedUser} />
    </div>
  );
};

export default UserMessageSection;
