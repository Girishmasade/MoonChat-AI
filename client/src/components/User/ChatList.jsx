import React, { useEffect, useState } from "react";
import { Avatar, Badge, Input, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setOnlineusers } from "../../redux/app/chatSlice";
import { useGetChatListQuery } from "../../redux/api/chatsApi";
import { socket } from "../../socket.io/socketclient";

const ChatList = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const authUser = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");

  const userId = authUser?._id;

  const { data, isLoading, isError, refetch } = useGetChatListQuery(userId);
  const userList = data?.statuscode?.data || [];

  // Filter search
  const filteredUsers = userList.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (userId) {
      socket.auth = { userId };
      socket.connect();
      socket.emit("joinRoom", userId);

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineusers(users));
      });

      socket.on("userStatusChange", () => refetch());
    }

    return () => {
      socket.off("getOnlineUsers");
      socket.disconnect();
    };
  }, [userId, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-10 w-[400px]">
        Failed to load chat list.
      </p>
    );
  }

  return (
    <div className="flex flex-col w-[400px] bg-gray-900 gap-3 rounded-lg shadow-lg overflow-hidden">
      {/* 🔍 Search Bar */}
      <div className="h-[80px] bg-gray-800 border-b flex items-center justify-center px-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full bg-gray-700 text-white border-none placeholder-gray-400"
          style={{ height: "45px" }}
        />
      </div>

      {/* 💬 User List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);

            return (
              <div
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-blue-600 border border-blue-400 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <Badge
                  dot
                  status={isOnline ? "success" : "default"}
                  offset={[-2, 32]}
                >
                  <Avatar
                    size={50}
                    src={
                      user.avatar ||
                      "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png"
                    }
                    className="shadow-md"
                    style={{
                      border: isOnline ? "2px solid #00ff99" : "2px solid #555",
                    }}
                  />
                </Badge>

                <div className="flex flex-col">
                  <h1 className="text-white font-semibold text-lg">
                    {user.username || "Unnamed"}
                  </h1>
                  <p
                    className={`text-sm ${
                      isOnline ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center mt-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
