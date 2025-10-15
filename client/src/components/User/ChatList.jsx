import React, { useState } from "react";
import { Avatar, Badge, Input } from "antd";

const ChatList = ({ selectedUser, setSelectedUser }) => {
  const [search, setSearch] = useState("");

  const userList = [
    {
      _id: 1,
      name: "Rohan",
      lastname: "Chide",
      status: "offline",
      avatar:
        "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png",
    },
    {
      _id: 2,
      name: "Mayur",
      lastname: "Chide",
      status: "online",
      avatar:
        "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png",
    },
    {
      _id: 3,
      name: "Vaishnavi",
      lastname: "L",
      status: "offline",
      avatar:
        "https://cdn.pixabay.com/photo/2022/08/19/19/29/anime-7397617_960_720.png",
    },
    {
      _id: 4,
      name: "Anjali",
      lastname: "S",
      status: "online",
      avatar:
        "https://cdn.pixabay.com/photo/2022/08/19/19/29/anime-7397617_960_720.png",
    },
    {
      _id: 5,
      name: "Kanak",
      lastname: "P",
      status: "offline",
      avatar:
        "https://cdn.pixabay.com/photo/2022/08/19/19/29/anime-7397617_960_720.png",
    },
    {
      _id: 6,
      name: "Jeet",
      lastname: "Chide",
      status: "online",
      avatar:
        "https://cdn.pixabay.com/photo/2023/05/03/10/36/ai-generated-7967242_960_720.png",
    },
  ];

  // Filter users based on search input
  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-[400px] bg-gray-900 gap-3  ounded-md shadow-lg overflow-hidden  rounded-lg">
      {/* Search Bar */}
      <div className="h-[80px] bg-gray-800 border-b flex items-center justify-center px-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full bg-gray-700 text-black border-none placeholder-gray-400"
          style={{ height: "45px" }}
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-shadow duration-200
                ${
                  isSelected
                    ? "bg-blue-600 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
            >
              <Badge
                dot
                status={user.status === "online" ? "success" : "default"}
                offset={[-2, 32]}
              >
                <Avatar
                  size={50}
                  src={user.avatar}
                  className="shadow-md"
                  style={{ border: "2px solid #00ffff" }}
                />
              </Badge>

              <div className="flex flex-col">
                <h1 className="text-white font-semibold text-lg">
                  {user.name} {user.lastname}
                </h1>
                <p
                  className={`text-sm ${
                    user.status === "online"
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {user.status}
                </p>
              </div>
            </div>
          );
        })}

        {filteredUsers.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
