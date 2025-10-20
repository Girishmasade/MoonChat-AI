import { apiSlice } from "../app/apiSlice";

const NOTIFICATION_URL = "/notifications";
export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATION_URL}/send-notification`,
        method: "POST",
        body: data
      }),
    }),
    getNotification: builder.query({
        query: () => ({
            url: `${NOTIFICATION_URL}/get-notification`,
            method: "GET"
        })
    }),
  }),
});


export const {useSendNotificationMutation, useGetNotificationQuery} = notificationApi