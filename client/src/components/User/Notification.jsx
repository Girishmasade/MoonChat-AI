import { Switch } from "antd";
import React, { useState } from "react";
import { AiOutlineMail, AiOutlineBell, AiOutlineDesktop, AiOutlineSound } from "react-icons/ai";

const notificationItems = [
  {
    key: "email",
    icon: <AiOutlineMail className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Email Notifications",
    description: "Receive notifications via email",
  },
  {
    key: "push",
    icon: <AiOutlineBell className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Push Notifications",
    description: "Receive push notifications on your device",
  },
  {
    key: "desktop",
    icon: <AiOutlineDesktop className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Desktop Notifications",
    description: "Show notifications on your desktop",
  },
  {
    key: "marketing",
    icon: <AiOutlineSound className="text-cyan-400 text-lg sm:text-xl" />,
    title: "Marketing Communications",
    description: "Receive updates about new features and tips",
  },
];

const Notification = () => {
  const [switches, setSwitches] = useState({
    email: false,
    push: false,
    desktop: false,
    marketing: false,
  });

  const toggle = (key) =>
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col w-full text-white p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white">
        Notification Settings
      </h2>
      <p className="text-sm text-gray-400 mt-1 mb-5 sm:mb-6 pb-3 border-b border-gray-700">
        Manage how and when you receive notifications
      </p>

      <div className="flex flex-col gap-2 sm:gap-3">
        {notificationItems.map(({ key, icon, title, description }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 sm:gap-4 bg-gray-750 hover:bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-gray-700 transition-colors"
          >
            {/* Icon + text */}
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

            {/* Switch */}
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
    </div>
  );
};

export default Notification;