import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { AiOutlineSave, AiFillEdit, AiOutlineClose, AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/app/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetProfileQuery();

  const userProfile = profileData?.data?.user ?? {};

  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      form.setFieldsValue({
        username: userProfile.username || "",
        name: userProfile.name || "",
        lastname: userProfile.lastname || "",
        contact: userProfile.contact || "",
        email: userProfile.email || "",
      });
    }
  }, [userProfile, form]);

  const toggleEdit = () => setEditing((prev) => !prev);

  const onFinish = async (values) => {
    try {
      const response = await updateProfile(values).unwrap();
      message.success(response?.message || "Profile updated successfully");

      if (response?.user) {
        dispatch(setCredentials({ user: response.user }));
        form.setFieldsValue(response.user);
      }

      await refetchProfile();
      setEditing(false);
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update profile";
      message.error(errorMessage);
    }
  };

  if (!profileData || isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] sm:min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  /* Avatar initials */
  const initials =
    `${userProfile.name?.[0] ?? ""}${userProfile.lastname?.[0] ?? ""}`.toUpperCase() ||
    userProfile.username?.[0]?.toUpperCase() ||
    "U";

  const inputBase =
    "!bg-gray-700 !border !border-gray-600 !text-white !placeholder-gray-400 !h-10 !rounded-lg transition-all duration-200 focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500";
  const inputDisabled =
    "!bg-gray-750 !border !border-gray-700 !text-gray-300 !placeholder-gray-500 !h-10 !rounded-lg cursor-not-allowed";
  const inputLocked =
    "!bg-gray-600 !border !border-gray-600 !text-gray-400 !h-10 !rounded-lg cursor-not-allowed opacity-70";

  return (
    <div className="w-full min-h-screen bg-gray-900 p-3 sm:p-5 lg:p-8">
      <div className=" mx-auto">

        {/* ── Header Card ── */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            {/* Avatar */}
            <div className="flex-shrink-0 self-center sm:self-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg ring-4 ring-gray-700">
                {initials}
              </div>
            </div>

            {/* Name & username */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                {userProfile.name && userProfile.lastname
                  ? `${userProfile.name} ${userProfile.lastname}`
                  : userProfile.username || "Your Profile"}
              </h1>
              {userProfile.username && (
                <p className="text-sm text-gray-400 mt-0.5 truncate">@{userProfile.username}</p>
              )}
              {userProfile.email && (
                <p className="text-xs text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-1 truncate">
                  <AiOutlineMail className="flex-shrink-0" />
                  <span className="truncate">{userProfile.email}</span>
                </p>
              )}
            </div>

            {/* Edit toggle (top-right on desktop, hidden here on mobile — shown in footer) */}
            <div className="hidden sm:flex flex-shrink-0">
              {!editing ? (
                <button
                  onClick={toggleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200"
                >
                  <AiFillEdit className="text-base" />
                  Edit Profile
                </button>
              ) : (
                <span className="px-3 py-1.5 bg-blue-900/40 text-blue-300 text-xs rounded-full border border-blue-700 font-medium">
                  Editing…
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">Account Information</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {editing ? "Make your changes and save." : "View and manage your details."}
              </p>
            </div>
            {/* Status badge */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${editing ? "bg-amber-900/30 text-amber-300 border-amber-700" : "bg-green-900/30 text-green-400 border-green-700"}`}>
              {editing ? "Unsaved" : "Saved"}
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            {/* Username */}
            <Form.Item
              label={<span className="text-gray-300 text-sm font-medium">Username</span>}
              name="username"
              className="mb-4"
            >
              <Input
                disabled={!editing}
                placeholder="Enter your username"
                prefix={<AiOutlineUser className="text-gray-400 mr-1" />}
                className={editing ? inputBase : inputDisabled}
              />
            </Form.Item>

            {/* First + Last Name — stacked on xs, side-by-side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Form.Item
                label={<span className="text-gray-300 text-sm font-medium">First Name</span>}
                name="name"
                className="mb-4"
              >
                <Input
                  disabled={!editing}
                  placeholder="First name"
                  className={editing ? inputBase : inputDisabled}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300 text-sm font-medium">Last Name</span>}
                name="lastname"
                className="mb-4"
              >
                <Input
                  disabled={!editing}
                  placeholder="Last name"
                  className={editing ? inputBase : inputDisabled}
                />
              </Form.Item>
            </div>

            {/* Email + Contact — same grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Form.Item
                label={
                  <span className="text-gray-300 text-sm font-medium flex items-center gap-1">
                    Email
                    <span className="text-xs text-gray-500 font-normal">(read-only)</span>
                  </span>
                }
                name="email"
                className="mb-4"
              >
                <Input
                  disabled
                  type="email"
                  placeholder="Email address"
                  prefix={<AiOutlineMail className="text-gray-500 mr-1" />}
                  className={inputLocked}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300 text-sm font-medium">Contact No.</span>}
                name="contact"
                className="mb-4"
              >
                <Input
                  disabled={!editing}
                  type="tel"
                  placeholder="Phone number"
                  prefix={<AiOutlinePhone className="text-gray-400 mr-1" />}
                  className={editing ? inputBase : inputDisabled}
                />
              </Form.Item>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-700">
              {!editing ? (
                /* Mobile: full-width edit; desktop: auto width */
               ""
              ) : (
                <>
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 font-medium"
                  >
                    <AiOutlineClose />
                    Cancel
                  </button>
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={isUpdating}
                    className="!w-full sm:!w-auto !flex !items-center !justify-center !gap-2 !px-5 !py-2.5 !bg-blue-600 hover:!bg-blue-500 !text-white !text-sm !rounded-lg !border-none !font-medium !h-auto !transition-all !duration-200"
                  >
                    <AiOutlineSave />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Your information is stored securely and never shared.
        </p>
      </div>
    </div>
  );
};

export default Profile;