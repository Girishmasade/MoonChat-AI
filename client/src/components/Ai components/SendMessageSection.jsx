import React, { useState } from "react";
import { Input, Tooltip } from "antd";
import EmojiPicker from "emoji-picker-react";
import { FaSmile, FaPaperclip, FaLocationArrow } from "react-icons/fa";

const ChatInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const onSend = () => {
    if (!message.trim()) return;
    console.log("Message sent:", message);
    setMessage("");
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-md shadow-md w-full max-w-3xl mx-auto">
      <Tooltip title="Attach File">
        <button className="text-gray-500 hover:text-gray-700 text-lg p-2 rounded-full">
          <FaPaperclip />
        </button>
      </Tooltip>

      <Tooltip title="Emoji">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-500 hover:text-gray-700 text-lg p-2 rounded-full"
        >
          <FaSmile />
        </button>
      </Tooltip>

      {showEmojiPicker && (
        <div className="absolute bottom-16 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-full border-none focus:ring-0 focus:outline-none"
        onPressEnter={onSend}
      />

      <button
        onClick={onSend}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
      >
        <FaLocationArrow />
      </button>
    </div>
  );
};

export default ChatInput;
