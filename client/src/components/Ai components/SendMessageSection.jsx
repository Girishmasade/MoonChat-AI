import React, { useState } from "react";
import { Input, Tooltip, Upload, message as AntMessage } from "antd";
import EmojiPicker from "emoji-picker-react";
import { FaSmile, FaPaperclip, FaLocationArrow } from "react-icons/fa";
import { useSendChatMutation } from "../../redux/api/aiChatApi";
import { useSelector } from "react-redux";

const ChatInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [sendChat, { isLoading }] = useSendChatMutation();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSend = async () => {
    if (!message.trim() && fileList.length === 0) return;

    const formData = new FormData();
    formData.append("senderId", user?._id);
    formData.append("messages", message);

    fileList.forEach((file) => {
      formData.append("media", file.originFileObj);
    });

    try {
      const response = await sendChat(formData).unwrap();
      console.log(response);
      
      if (response?.data?.AiMessage) {
        setMessage("");
        setFileList([]);
        setShowEmojiPicker(false);
      }
    } catch (error) {
      console.error("Error sending chat:", error);
      AntMessage.error("Failed to send message");
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center gap-2 p-2 bg-white rounded-md shadow-md w-full max-w-3xl mx-auto">

      <Tooltip title="Attach File">
        <Upload
          multiple
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false} 
          showUploadList={false}
        >
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-lg p-2 rounded-full"
          >
            <FaPaperclip />
          </button>
        </Upload>
      </Tooltip>

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
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-full border-none focus:ring-0 focus:outline-none"
        onPressEnter={handleSend}
        disabled={isLoading}
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={isLoading || (!message.trim() && fileList.length === 0)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
      >
        {isLoading ? (
          <span className="text-sm">...</span>
        ) : (
          <FaLocationArrow />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
