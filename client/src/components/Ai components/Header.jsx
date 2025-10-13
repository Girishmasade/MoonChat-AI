import React from "react";
import { Image } from "antd";

const HeaderComponent = () => {
  return (
    <div className="px-4 py-2 border-b border-cyan-500 h-[80px] flex items-center gap-6">
      <div className="flex gap-4 items-center">
       
        <Image
          preview={true}
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
    </div>
  );
};

export default HeaderComponent;
