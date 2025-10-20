import { apiSlice } from "../app/apiSlice";

const AUTH_URL = `/auth`;

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        body: userData,
      }),
    }),

    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: `${AUTH_URL}/upload-avatar`,
        method: "POST",
        body: formData,
      }),
    }),

    getProfile: builder.query({
      query: () => `${AUTH_URL}/profile`,
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/update-details`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUploadAvatarMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
