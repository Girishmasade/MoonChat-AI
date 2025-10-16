import React, { useState } from "react";
import { Tabs, Upload, Image } from "antd";
import { FaCamera } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";
import Profile from "../../components/User/Profile";
import Notification from "../../components/User/Notification";
import Privacy from "../../components/User/Privacy";

const Settings = () => {
  const [avatar, setAvatar] = useState(
    "https://cdn.cgdream.ai/_next/image?url=https%3A%2F%2Fapi.cgdream.ai%2Frails%2Factive_storage%2Fblobs%2Fredirect%2FeyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNUg0emc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ%3D%3D--41792ecff90196b3250799db6edfb71a67d0443d%2F3ab99f35-d687-4d63-8178-04b725dc20ea_0.png&w=1080&q=95"
  );

  const handleUpload = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      // Create preview using local URL
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const uploadProps = {
    showUploadList: false,
    beforeUpload: () => false, // Prevent auto-upload
    onChange: handleUpload,
    accept: "image/*",
  };

  const items = [
    {
      key: "1",
      label: "Profile",
      children: <Profile />,
    },
    {
      key: "2",
      label: "Notification",
      children: <Notification />,
    },
    {
      key: "3",
      label: "Privacy",
      children: <Privacy />,
    },
  ];

  return (
    <div className="bg-gray-700 w-full rounded-md p-6">
      <div className="flex items-center bg-gray-500 rounded-lg p-4 gap-6">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={avatar}
            preview={true}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #00ffff",
            }}
          />

          <Upload {...uploadProps} className="absolute bottom-0 right-0">
            <div className="bg-white p-1 rounded-full cursor-pointer shadow hover:bg-gray-200">
              <FaCamera className="text-blue-600 text-lg" />
            </div>
          </Upload>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold text-black">Girish M</h2>
          <p className="text-sm italic text-black">girishm@gmail.com</p>
          <p className="text-sm text-gray-800">
            Member Since <span className=" font-semibold">January 2024</span>
          </p>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarGutter={32}
          centered
          className="custom-dark-tabs"
        />
      </div>
    </div>
  );
};

export default Settings;
