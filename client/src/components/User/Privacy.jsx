import { Button, Switch, Modal } from "antd";
import React, { useState } from "react";
import {
  AiOutlineDatabase,
  AiOutlineMessage,
  AiOutlineEye,
  AiOutlineWarning,
} from "react-icons/ai";

const privacyItems = [
  {
    key: "dataCollection",
    icon: <AiOutlineDatabase className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Data Collection",
    description: "Allow collection of usage data to improve the service",
  },
  {
    key: "chatHistory",
    icon: <AiOutlineMessage className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Chat History",
    description: "Save chat history for future reference",
  },
  {
    key: "profileVisibility",
    icon: <AiOutlineEye className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Profile Visibility",
    description: "Make your profile visible to other users",
  },
];

const Privacy = () => {
  const [switches, setSwitches] = useState({
    dataCollection: false,
    chatHistory: true,
    profileVisibility: false,
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const toggle = (key) =>
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col w-full text-white p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white">
        Privacy Settings
      </h2>
      <p className="text-sm text-gray-400 mt-1 mb-5 sm:mb-6 pb-3 border-b border-gray-700">
        Control your privacy and data sharing preferences
      </p>

      {/* Toggle rows */}
      <div className="flex flex-col gap-2 sm:gap-3 mb-6">
        {privacyItems.map(({ key, icon, title, description }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 sm:gap-4 hover:bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-gray-700 transition-colors"
          >
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="flex-shrink-0 mt-0.5 sm:mt-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-700 flex items-center justify-center">
                {icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-snug">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Switch
                checked={switches[key]}
                onChange={() => toggle(key)}
                className={switches[key] ? "!bg-cyan-500" : "!bg-gray-600"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-1">
          <AiOutlineWarning className="text-red-400 text-base sm:text-lg flex-shrink-0" />
          <h3 className="text-sm sm:text-base font-semibold text-red-400">
            Danger Zone
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <Button
          danger
          type="primary"
          onClick={() => setConfirmOpen(true)}
          className="!w-full sm:!w-auto !text-sm !font-medium"
        >
          Delete Account
        </Button>
      </div>

      {/* Confirmation modal */}
      <Modal
        open={confirmOpen}
        title={
          <span className="text-red-400 flex items-center gap-2">
            <AiOutlineWarning /> Delete Account
          </span>
        }
        okText="Yes, delete my account"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        onOk={() => {
          // TODO: dispatch delete account action
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to permanently delete your account? All your
          data will be removed and this action <strong>cannot be undone</strong>.
        </p>
      </Modal>
    </div>
  );
};

export default Privacy;