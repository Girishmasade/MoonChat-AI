import Chats from "../../models/chats.models.js";

export const getChatHistory = async (conversationId) => {
    const chatsData = await Chats.find({conversationId})
    .sort({createdAt: -1})
    .limit(10)

    return chatsData.reverse().map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
} 