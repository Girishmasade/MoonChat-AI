import React, { useState } from "react";
import { Button, Collapse, Image, message } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import { useClearChatMutation } from "../../redux/api/aiChatApi";

const { Panel } = Collapse;

const HeaderComponent = () => {
  const [open, setOpen] = useState(false);
  const [clearChat] = useClearChatMutation();
  const receiverId = import.meta.env.VITE_AI_USER_ID;

  const handleClearChat = async () => {
    try {
      const response = await clearChat(receiverId).unwrap();
      message.success("Chat deleted successfully!");
      // console.log("✅ Deleted:", response);
    } catch (error) {
      console.error("❌ Failed to delete:", error);
      message.error("Failed to delete chat");
    }
  };

  const toggleButton = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="px-4 py-2 border-b border-cyan-500 h-[80px] flex items-center justify-between gap-6 shadow-sm">
      <div className="flex gap-4 items-center">
        <Image
          preview={false}
          alt="NovaChat Logo"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #00ffff",
          }}
          src="/star.png"
        />

        <div className="flex flex-col">
          <h1
            className="bg-gradient-to-tr from-blue-700 to-blue-500 text-transparent bg-clip-text text-lg font-semibold"
            style={{
              textShadow:
                "0 0 8px rgba(59,130,246,0.8), 0 0 16px rgba(59,130,246,0.6)",
            }}
          >
            NovaChat-AI
          </h1>
          <p className="text-sm font-normal text-gray-600">
            Real Time Chatting
          </p>
        </div>
      </div>

      <div className="relative">
        <Button
          size="large"
          style={{ background: "none", border: "none", color: "white" }}
          icon={<AiOutlineMore className="text-xl font-bold" />}
          onClick={toggleButton}
        />

        {open && (
          <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 animate-fadeIn">
            <Collapse ghost>
              <Panel header="AI Options" key="1">
                <button
                  onClick={handleClearChat}
                  className="text-gray-600 cursor-pointer hover:text-blue-500"
                >
                  Clear Chat
                </button>
              </Panel>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
