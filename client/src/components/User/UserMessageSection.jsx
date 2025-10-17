import React, { useState, useEffect } from "react";
import { useGetMessageQuery } from "../../redux/api/chatsApi";
import { useSelector } from "react-redux";
import { socket } from "../../socket.io/socketclient";
import SendUsersMessagesSection from "./SendUsersMessagesSection";

const UserMessageSection = () => {
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  
  const selctedUser = useSelector((state) => state.chat.selectedUser)
  const reciverId = selctedUser._id
  const { data, isLoading, isError, refetch } = useGetMessageQuery(reciverId);
  
  const userId = user?._id;

  const dattta = data?.data?.messages
  console.log(dattta);
  

  useEffect(() => {
    if (data?.data?.messages) {
      setMessages(data.data.messages);
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (!userId) return;

    socket.auth = { userId: userId };
    socket.connect();

    socket.emit("joinRoom", userId);
    // console.log("🟢 Joined socket room:", userId);

    const handleNewMessage = (newMessage) => {
      // console.log("📩 New message from socket:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
      socket.disconnect();
      // console.log("🔌 Socket disconnected from MessageSection");
    };
  }, [userId]);

  if (isLoading) return <div className="p-6">Loading messages...</div>;
  if (isError) return <div className="p-6">Failed to load messages.</div>;

  return (
    <div className="flex flex-col bg-gray-900 text-white h-full overflow-y-auto">
      {/* File Upload */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((item, index) => {
          const isSender = item.senderId === user?._id;

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
                {/* Message text */}
                {item.messages}

                {/* Media rendering */}
                {item.media?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {item.media.map((file, idx) => {
                      const ext = file.split(".").pop().toLowerCase();
                      if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
                        // Image
                        return (
                          <img
                            key={idx}
                            src={file}
                            alt="media"
                            className="max-w-full rounded-md"
                          />
                        );
                      } else if (["mp4", "webm", "ogg"].includes(ext)) {
                        // Video
                        return (
                          <video
                            key={idx}
                            src={file}
                            controls
                            className="max-w-full rounded-md"
                          />
                        );
                      } else if (["mp3", "wav"].includes(ext)) {
                        // Audio
                        return (
                          <audio
                            key={idx}
                            src={file}
                            controls
                            className="w-full"
                          />
                        );
                      } else {
                        // Other file
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
