import React, { useState, Suspense } from "react";
import {
  Input,
  Tooltip,
  Upload,
  message as AntMessage,
  Spin,
  Button,
} from "antd";
import { FaSmile, FaPaperclip, FaLocationArrow } from "react-icons/fa";
import { useSendMessageMutation } from "../../redux/api/chatsApi";
import { useSelector } from "react-redux";
import { socket } from "../../socket.io/socketclient";

const EmojiPicker = React.lazy(() => import("emoji-picker-react"));

const SendUsersMessagesSection = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const receiverId = selectedUser?._id;

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSend = ({ refetchMessages }) => {
    if (!message.trim() && fileList.length === 0) return;

    const formData = new FormData();
    if (user?._id) formData.append("senderId", user._id);
    if (message.trim()) formData.append("messages", message.trim());
    fileList.forEach((file) =>
      formData.append("media", file.originFileObj || file)
    );

    try {
      const response = sendMessage({ id: receiverId, formData });
      const message = response?.data?.data;
      // console.log(message);

      AntMessage.success("Message sent!");

      if (message) {
        AntMessage.success("Message sent successfully");

        socket.emit("sendMessage", {
          senderId: user._id,
          receiverId: receiverId,
          messages: message.trim(),
          media: fileList.map((f) => f.name),
        });

        socket.emit("newMessage", {
          senderId: message.senderId,
          receiverId: message.receiverId,
          messages: message.messages,
          media: message.media,
        });

        if (refetchMessages) {
          refetchMessages();
        }
        setMessage("");
        setFileList([]);
        setShowEmojiPicker(false);
        setSending(false);
      }
    } catch (error) {
      console.error("Send failed", error.message);
      AntMessage.error("Failed to send message");
    } finally {
      setUploading(false);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center gap-3 p-3 bg-white rounded-xl shadow-md w-full border border-gray-100">
      {/* File Upload */}
      <Tooltip title="Attach File">
        <Upload
        key={fileList.length}
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false}
          multiple
          showUploadList
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        >
          <Button
            type="text"
            className="text-gray-500 hover:text-gray-700 text-lg p-2 rounded-full"
          >
            <FaPaperclip />
          </Button>
        </Upload>
      </Tooltip>

      {/* Emoji Picker */}
      <Tooltip title="Emoji">
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700 text-lg p-2 rounded-full"
        >
          <FaSmile />
        </button>
      </Tooltip>

      {showEmojiPicker && (
        <div className="absolute bottom-14 left-16 z-50">
          <Suspense fallback={<div>Loading...</div>}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </Suspense>
        </div>
      )}

      {/* Message Input */}
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-full border-none focus:ring-0 focus:outline-none"
        onPressEnter={handleSend}
        disabled={isLoading || sending}
        style={{ outline: "none" }}
      />

      {/* Send Button */}
      <SendButton
        onClick={handleSend}
        disabled={isLoading || sending || (!message.trim() && fileList.length === 0)}
        loading={isLoading || sending}
      />
    </div>
  );
};

const SendButton = ({ onClick, disabled, loading }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`${
      disabled ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
    } text-white p-3 rounded-full flex items-center justify-center transition`}
  >
    {loading ? (
      <Spin size="small" style={{ color: "white" }} />
    ) : (
      <FaLocationArrow />
    )}
  </button>
);

export default SendUsersMessagesSection;
