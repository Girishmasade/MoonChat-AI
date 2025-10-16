import { Button, Form, Input } from "antd";
import React from "react";
import { AiOutlineSave } from "react-icons/ai";

const Profile = () => {
  return (
    <div className="flex flex-col w-full  text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white ">Account Settings</h2>
      <p className="text-sm text-gray-400 mb-6 border-b border-gray-300 pb-2">
        Manage your account information and preferences
      </p>

      <Form
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
            placeholder="Enter your username"
            className="bg-gray-700 border-none text-black placeholder-gray-400 h-10"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="text-white">First Name</span>}
            name="firstName"
          >
            <Input
              placeholder="Enter your first name"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Last Name</span>}
            name="lastName"
          >
            <Input
              placeholder="Enter your last name"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Contact No.</span>}
            name="contact"
          >
            <Input
              type="tel"
              placeholder="Enter your contact number"
              className="bg-gray-700 border-none text-black placeholder-gray-400 h-10"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button className="bg-gray-600 hover:bg-gray-500 text-white border-none">
            Cancel
          </Button>

          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-500 text-white border-none flex gap-3"
          >
            <AiOutlineSave />
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
