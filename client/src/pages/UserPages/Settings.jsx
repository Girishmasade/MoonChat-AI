import React, { useState, useEffect } from "react";
import { Tabs, Upload, message, Spin } from "antd";
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
  const token = useSelector((state) => state.auth.token);

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  useEffect(() => {
    setAvatarPreview(user?.avatar);
  }, [user?.avatar]);

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

      dispatch(setCredentials({ user: { ...user, avatar: newAvatar }, token }));
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
      return false;
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

  // Fallback initials
  const initials =
    `${user?.name?.[0] ?? ""}${user?.lastname?.[0] ?? ""}`.toUpperCase() ||
    user?.username?.[0]?.toUpperCase() ||
    "U";

  return (
    <div className="w-full min-h-screen bg-gray-900 p-3 sm:p-5 lg:p-8">
      <div className=" mx-auto flex flex-col gap-4 sm:gap-5">

        {/* ── User Info Card ── */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-cyan-400 bg-gray-700 flex items-center justify-center">
                {isLoading ? (
                  <Spin size="small" />
                ) : avatarPreview || user?.avatar ? (
                  <img
                    src={avatarPreview || user?.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xl font-bold">{initials}</span>
                )}
              </div>

              {/* Camera overlay button */}
              <Upload {...uploadProps} className="absolute bottom-0 right-0 block">
                <button
                  type="button"
                  title="Change avatar"
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-900 hover:bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <FaCamera className="text-cyan-400 text-[10px] sm:text-xs" />
                </button>
              </Upload>
            </div>

            {/* User text */}
            <div className="text-center sm:text-left min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-white truncate leading-tight">
                {user?.username || "-"}
              </h2>
              <p className="text-sm text-gray-300 truncate mt-0.5">
                {user?.email || "-"}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
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
        </div>

        {/* ── Tabs Card ── */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <Tabs
            defaultActiveKey="1"
            items={items}
            centered
            destroyOnHidden
            className="custom-dark-tabs"
            tabBarStyle={{
              margin: 0,
              padding: "0 16px",
              borderBottom: "1px solid #374151",
              background: "transparent",
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Settings;