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

    googleLogin: builder.query({
      query: () => ({
        url: `${AUTH_URL}/google`,
        method: "GET",
      })
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

    forgetPass: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/forget-password`,
        method: "PATCH",
        body
      }),
    }),
  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleLoginQuery,
  useUploadAvatarMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgetPassMutation
} = authApi;
