import React, { useState } from "react";
import SendMessageSection from "./SendMessageSection";

const MessageSection = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
    { sender: "user", text: "Can you tell me about NovaChat AI?" },
    {
      sender: "ai",
      text: "Sure! NovaChat AI is your smart chat assistant built for intelligent conversations.",
    },
  ]);

  return (
    <div className="flex flex-col bg-gray-900 text-white h-full overflow-y-auto">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((item, index) => (
          <div
            className={`flex ${
              item.sender === "user" ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-2xl ${
                item.sender === "user"
                  ? "bg-blue-600 rounded-br-none"
                  : "bg-gray-700 rounded-bl-none"
              }`}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <SendMessageSection/>
    </div>
  );
};

export default MessageSection;
