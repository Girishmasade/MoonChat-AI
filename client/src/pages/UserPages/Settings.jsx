import React, { useState, useEffect } from "react";
import { Tabs, Upload, Image, message, Spin } from "antd";
import { FaCamera } from "react-icons/fa";
import Profile from "../../components/User/Profile";
import Notification from "../../components/User/Notification";
import Privacy from "../../components/User/Privacy";
import { useSelector, useDispatch } from "react-redux";
import { useUploadAvatarMutation } from "../../redux/api/authApi";
import { setCredentials } from "../../redux/app/authSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const token = useSelector((state) => state.auth.token);

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  // Sync avatarPreview when user changes (important for OAuth login)
  useEffect(() => {
    setAvatarPreview(user?.avatar);
  }, [user?.avatar]);

  // Handle avatar upload
  const handleUpload = async (info) => {
    const file = info.file?.originFileObj || info.file;
    if (!file) {
      message.warn("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await uploadAvatar(formData).unwrap();
      const newAvatar = response?.data?.avatar;

      // Update Redux state for immediate UI update
      dispatch(
        setCredentials({
          user: { ...user, avatar: newAvatar },
          token,
        })
      );

      message.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Avatar upload failed:", error?.message || error);
      message.error("Failed to upload avatar");
    }
  };

  const uploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) message.error("You can only upload image files!");
      if (!isLt2M) message.error("Image must be smaller than 2MB!");
      return false; // manual upload
    },
    onChange: handleUpload,
    accept: "image/*",
    disabled: isLoading,
  };

  const items = [
    { key: "1", label: "Profile", children: <Profile /> },
    { key: "2", label: "Notification", children: <Notification /> },
    { key: "3", label: "Privacy", children: <Privacy /> },
  ];

  return (
    <div className="bg-gray-800 text-white w-full rounded-lg p-6 shadow-lg">
      {/* User info */}
      <div className="flex items-center bg-gray-700 rounded-lg p-5 gap-6">
        <div className="relative w-[90px] h-[90px]">
          {isLoading ? (
            <div className="flex items-center justify-center w-[90px] h-[90px] rounded-full bg-gray-600">
              <Spin />
            </div>
          ) : (
            <Image
              src={
                avatarPreview ||
                user?.avatar ||
                "https://cdn.pixabay.com/photo/2023/06/02/15/46/ai-generated-8035998_1280.png"
              }
              preview={false}
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #00FFFF",
              }}
            />
          )}
          <Upload {...uploadProps} className="absolute bottom-0 right-0">
            <div className="bg-gray-900 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-600 transition">
              <FaCamera className="text-cyan-400 text-lg" />
            </div>
          </Upload>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{user?.username || "-"}</h2>
          <p className="text-sm text-gray-300">{user?.email || "-"}</p>
          <p className="text-sm text-gray-400 mt-1">
            Member Since{" "}
            <span className="font-semibold text-gray-200">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("default", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-gray-700 rounded-lg p-4">
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarGutter={32}
          centered
          destroyOnHidden
          className="custom-dark-tabs"
        />
      </div>
    </div>
  );
};

export default Settings;
