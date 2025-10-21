import { apiSlice } from "../app/apiSlice";

const NOTIFICATION_URL = "/notifications";
export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATION_URL}/send-notification`,
        method: "POST",
        body: data,
      }),
    }),
    getNotification: builder.query({
      query: () => ({
        url: `${NOTIFICATION_URL}/get-notification`,
        method: "GET",
      }),
    }),

    markAsRead: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/is-read/${id}`,
        method: "PUT",
      }),
    }),

    stopNotification: builder.mutation({
      query: () => ({
        url: `${NOTIFICATION_URL}/stop-notification`,
        method: "PATCH",
      }),
    }),

    clearNotification: builder.mutation({
      query: () => ({
        url: `${NOTIFICATION_URL}/clear`,
        method: "DELETE",
      }),
    }),

    clearSingleNotification: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/clear/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendNotificationMutation,
  useGetNotificationQuery,
  useMarkAsReadMutation,
  useStopNotificationMutation,
  useClearNotificationMutation,
  useClearSingleNotificationMutation,
} = notificationApi;
