import { apiSlice } from "../app/apiSlice";
const CHAT_API = `/aiChat`;
const AI_USER_ID = import.meta.env.VITE_AI_USER_ID;

export const aiChatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendChat: builder.mutation({
      query: (formData) => ({
        url: `${CHAT_API}/send-ai-messages/${AI_USER_ID}`,
        method: "POST",
        body: formData,
      })
    })
  })
})

export const {useSendChatMutation} = aiChatApi