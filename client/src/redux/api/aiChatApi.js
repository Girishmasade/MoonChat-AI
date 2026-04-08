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
      }),
      // After sending, automatically invalidate the cache so getChat refetches
      invalidatesTags: [{ type: "AiChat", id: AI_USER_ID }],
    }),

    getChat: builder.query({
      query: () => `${CHAT_API}/get-ai-messages/${AI_USER_ID}`,
      // Tag this query so invalidation triggers an automatic refetch
      providesTags: [{ type: "AiChat", id: AI_USER_ID }],
    }),

    clearChat: builder.mutation({
      query: (receiverId = AI_USER_ID) => ({
        url: `${CHAT_API}/delete-ai-messages/${receiverId}`,
        method: "DELETE",
      }),
      // After clearing, invalidate cache so getChat refetches empty list
      invalidatesTags: [{ type: "AiChat", id: AI_USER_ID }],
    }),
  }),
});

export const { useSendChatMutation, useGetChatQuery, useClearChatMutation } =
  aiChatApi;