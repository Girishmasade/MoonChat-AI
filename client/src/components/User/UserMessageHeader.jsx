import React from "react";
import { Image } from "antd";
import UserMessageSection from "./UserMessageSection";

const UserMessageHeader = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center text-center text-gray-400 px-4">
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 16v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1m18-4v-1a2 2 0 00-2-2H5a2 2 0 00-2 2v1m18-4V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1"
            />
          </svg>
          <h1 className="text-2xl font-bold text-white">No User Selected</h1>
          <p className="text-gray-400 text-base">
            Select a user from the list to start chatting instantly.
          </p>
          <span className="text-sm text-gray-500">
            Your conversations will appear here.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between border-b px-2">
        <div className="flex gap-3 h-[80px] pt-2 items-center">
          <Image
            preview={false}
            alt={`${selectedUser.name}'s avatar`}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #00ffff",
            }}
            src={
              selectedUser.avatar ||
              "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png"
            }
          />

          <div className="bg-gray-800 flex flex-col">
            <h1 className="text-2xl font-bold mb-1">
              Chat with{" "}
              <span className="bg-gradient-to-tr from-blue-400 to-cyan-600 text-transparent bg-clip-text">
                {selectedUser.name || "User"} {selectedUser.lastname || ""}
              </span>
            </h1>
            <p>
              Status:{" "}
              <span
                className={`${
                  selectedUser.status === "online"
                    ? "text-green-500"
                    : "text-gray-400"
                } font-semibold`}
              >
                {selectedUser.status || "offline"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <UserMessageSection selectedUser={selectedUser} />
    </div>
  );
};

export default UserMessageHeader;
