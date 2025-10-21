import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { AiOutlineSave, AiFillEdit } from "react-icons/ai";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/app/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  // Fetch profile data with refetch capability
  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetProfileQuery();

  const userProfile = profileData?.data?.user ?? {};

  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Populate form when profile data is available
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
        // Update Redux state
        dispatch(setCredentials({ user: response.user }));
        // Update form fields immediately
        form.setFieldsValue(response.user);
      }

      // Refetch profile to sync query
      await refetchProfile();

      setEditing(false);
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update profile";
      message.error(errorMessage);
    }
  };

  // Show spinner while fetching profile
  if (!profileData || isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-white rounded-lg p-6 shadow-md bg-gray-800">
      <h2 className="text-2xl font-semibold mb-2">Account Settings</h2>
      <p className="text-sm text-gray-400 mb-6 border-b border-gray-700 pb-2">
        Manage your account information and preferences
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="w-full"
      >
        <Form.Item label="Username" name="username">
          <Input
            disabled={!editing}
            placeholder="Enter your username"
            className="bg-gray-700 border-none text-white placeholder-gray-400 h-10 disabled:text-gray-400 disabled:placeholder-gray-500"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="First Name" name="name">
            <Input
              disabled={!editing}
              placeholder="Enter your first name"
              className="bg-gray-700 border-none text-white placeholder-gray-400 h-10 disabled:text-gray-400 disabled:placeholder-gray-500"
            />
          </Form.Item>

          <Form.Item label="Last Name" name="lastname">
            <Input
              disabled={!editing}
              placeholder="Enter your last name"
              className="bg-gray-700 border-none text-white placeholder-gray-400 h-10 disabled:text-gray-400 disabled:placeholder-gray-500"
            />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input
              disabled
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 border-none text-gray-400 placeholder-gray-500 h-10"
            />
          </Form.Item>

          <Form.Item label="Contact No." name="contact">
            <Input
              disabled={!editing}
              type="tel"
              placeholder="Enter your contact number"
              className="bg-gray-700 border-none text-white placeholder-gray-400 h-10 disabled:text-gray-400 disabled:placeholder-gray-500"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {!editing ? (
            <Button
              onClick={toggleEdit}
              className="bg-gray-600 hover:bg-gray-500 text-white border-none flex gap-2 items-center"
            >
              <AiFillEdit /> Edit
            </Button>
          ) : (
            <>
              <Button
                onClick={toggleEdit}
                className="bg-gray-600 hover:bg-gray-500 text-white border-none"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={isUpdating}
                className="bg-blue-600 hover:bg-blue-500 text-white border-none flex gap-2 items-center"
              >
                <AiOutlineSave /> Save Changes
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Profile;
