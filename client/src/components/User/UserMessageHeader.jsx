import React, { useState } from "react";
import { Button, Collapse, Image, message } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import UserMessageSection from "./UserMessageSection";
import { useClearChatsMutation } from "../../redux/api/chatsApi";
import { useDispatch, useSelector } from "react-redux";
import { setClearSelectedUser } from "../../redux/app/chatSlice";

const { Panel } = Collapse;

const UserMessageHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userId = useSelector((state) => state.auth.user);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  //  console.log(onlineUsers);

  const isOnline = onlineUsers.includes(selectedUser?._id);
  //  console.log(isOnline);
  const [clearChats, { isLoading }] = useClearChatsMutation();
  const dispatch = useDispatch();
  if (!selectedUser) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center text-gray-400 text-center px-4">
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
            Select a user from the list to start chatting.
          </p>
          <span className="text-sm text-gray-500">
            Your messages will appear here.
          </span>
        </div>
      </div>
    );
  }

  const receiverId = selectedUser?._id;
  // console.log(receiverId);

  // Clear chat handler
  const handleClearChat = async () => {
    try {
      await clearChats(receiverId).unwrap();
      message.success("Chat cleared successfully!");
      setMenuOpen(false);
      dispatch(setClearSelectedUser());
    } catch (error) {
      console.error("Failed to delete chat:", error);
      message.error("Failed to delete chat.");
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-800 text-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 px-4 h-[80px]">
        <div className="flex items-center gap-3">
          <Image
            preview={false}
            alt={`${selectedUser.username}'s avatar`}
            src={
              selectedUser.avatar ||
              "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png"
            }
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #00ffff",
            }}
          />

          <div>
            <h1 className="text-2xl font-semibold leading-tight">
              Chat with{" "}
              <span className="bg-gradient-to-tr from-blue-400 to-cyan-600 bg-clip-text text-transparent">
                {selectedUser.name || selectedUser.username || "User"}{" "}
                {selectedUser.lastname || ""}
              </span>
            </h1>
            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={`font-semibold ${
                  isOnline ? "text-green-400" : "text-gray-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <Button
            type="text"
            icon={<AiOutlineMore className="text-2xl" />}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white hover:text-cyan-400"
          />
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 animate-fadeIn">
              <Collapse ghost>
                <Panel header="Chat Options" key="1">
                  <button
                    onClick={handleClearChat}
                    disabled={isLoading}
                    className={`text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-left ${
                      isLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Clearing..." : "Clear Chat"}
                  </button>
                </Panel>
              </Collapse>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <UserMessageSection selectedUser={selectedUser} />
    </div>
  );
};

export default UserMessageHeader;
