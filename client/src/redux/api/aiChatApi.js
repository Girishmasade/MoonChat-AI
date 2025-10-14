import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // use /react if using hooks

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CHAT_API = `${BACKEND_URL}/aiChat`;
 const AI_USER_ID = import.meta.env.VITE_AI_USER_ID;

export const aiChatApi = createApi({
  reducerPath: "aichatapi",
  baseQuery: fetchBaseQuery({
    baseUrl: CHAT_API,
  }),
  endpoints: (builder) => ({
    sendChat: builder.mutation({
      query: (userData) => ({
        url: `/send-ai-messages/${AI_USER_ID}`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useSendChatMutation } = aiChatApi;
