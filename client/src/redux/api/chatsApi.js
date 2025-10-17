import { apiSlice } from "../app/apiSlice";

const CHAT_URL = "/chats";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (userData) => ({
        url: `${CHAT_URL}/add-contacts`,
        method: "POST",
        body: userData,
      }),
    }),
    getContacts: builder.query({
      query: () => ({
        url: `${CHAT_URL}/all-contacts`,
        method: "GET",
      }),
    }),
    getChatList: builder.query({
      query: (listId) => ({
        url: `${CHAT_URL}/contact-list/${listId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: ({id, formData}) => ({
        url: `${CHAT_URL}/send-message/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    getMessage: builder.query({
      query: (contactId) => ({
        url: `${CHAT_URL}/get-message/${contactId}`,
        method: "GET"
      })
    })
  }),
});

export const {
  useAddContactMutation,
  useGetContactsQuery,
  useGetChatListQuery,
  useSendMessageMutation,
  useGetMessageQuery
} = chatApi;
