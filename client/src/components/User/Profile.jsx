import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/authApi";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/app/authSlice";

const Profile = () => {
  const { data: profileData } = useGetProfileQuery();
  const getProfileData = profileData?.data?.user;
  // console.log(getProfileData);

  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getProfileData) {
      form.setFieldsValue({
        username: getProfileData.username,
        name: getProfileData.name,
        lastname: getProfileData.lastname,
        contact: getProfileData.contact,
        email: getProfileData.email,
      });
    }
  }, [profileData]);

  const toggleEdit = () => setEditing(!editing);

  const onFinish = async (values) => {
    try {
      const response = await updateProfile(values).unwrap();
      // console.log(response);
      message.success(response.message);
      dispatch(setCredentials({ user: response.user }));
      setEditing(false);
    } catch (error) {
      message.error(error.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col w-full  text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white ">Account Settings</h2>
      <p className="text-sm text-gray-400 mb-6 border-b border-gray-300 pb-2">
        Manage your account information and preferences
      </p>

      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        className="w-full"
        requiredMark={false}
        style={{ color: "#fff" }}
      >
        <Form.Item
          label={<span className="text-white">Username</span>}
          name="username"
        >
          <Input
            disabled={!editing}
            placeholder="Enter your username"
            className="bg-gray-700 border-none text-black placeholder-gray-400 h-10  disabled:text-gray-400 disabled:placeholder-gray-200"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="text-white">First Name</span>}
            name="name"
          >
            <Input
              disabled={!editing}
              placeholder="Enter your first name"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10  disabled:text-gray-400 disabled:placeholder-gray-200"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Last Name</span>}
            name="lastname"
          >
            <Input
              disabled={!editing}
              placeholder="Enter your last name"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10  disabled:text-gray-400 disabled:placeholder-gray-200"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
          >
            <Input
              disabled
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 border-none text-white placeholder-gray-200 h-10 disabled:text-gray-400 disabled:placeholder-gray-200"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Contact No.</span>}
            name="contact"
          >
            <Input
              disabled={!editing}
              type="tel"
              placeholder="Enter your contact number"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10  disabled:text-gray-400 disabled:placeholder-gray-200"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {!editing ? (
            <Button
              onClick={toggleEdit}
              className="bg-gray-600 hover:bg-gray-500 text-white border-none flex gap-3"
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
                loading={updating}
                type="primary"
                className="bg-blue-600 hover:bg-blue-500 text-white border-none flex gap-3"
              >
                <AiOutlineSave />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Profile;
