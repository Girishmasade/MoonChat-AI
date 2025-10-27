import { apiSlice } from "../app/apiSlice";

const ADMIN_URI = "/admin"

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminSignup: builder.mutation({
            query: (formData) => ({
                url: `${ADMIN_URI}/signup`,
                method: "POST",
                body: formData
            })
        })
    })
})
export const {useAdminSignupMutation} = adminApi
