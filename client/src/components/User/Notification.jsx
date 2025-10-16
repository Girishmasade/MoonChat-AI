import { Switch } from "antd";
import React from "react";

const Notification = () => {
  return (
    <div className="flex flex-col w-full  text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-white ">Account Settings</h2>
      <p className="text-sm text-gray-400 mb-6  pb-2">
        Manage your account information and preferences
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Email Notifications
            </h3>
            <p className="text-gray-400 text-sm">
              Receive notifications via email
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Push Notifications
            </h3>
            <p className="text-gray-400 text-sm">
              Receive push notifications on your device
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Desktop Notifications
            </h3>
            <p className="text-gray-400 text-sm">
              Show notifications on your desktop
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Marketing Communications
            </h3>
            <p className="text-gray-400 text-sm">
              Receive updates about new features and tips
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default Notification;
