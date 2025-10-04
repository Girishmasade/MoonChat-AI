import React from "react";
import { follow } from "../../utils/footerFollow";

const Footer = () => {
  return (
    <div className="border-t mt-10 lg:mt-0">
      <div className="px-8 py-10 grid lg:grid-cols-4 lg:justify-center lg:text-center">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="inline-flex h-8 w-8 items-center justify-center text-white rounded-md bg-gradient-to-br from-violet-500 to-violet-500 text-primary-foreground font-bold">
              C
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              Chatter
            </h1>
          </div>
          <p className="mt-2 text-gray-400 text-start">
            Real-time chat platform with secure messaging, emoji reactions, and
            file sharing.
          </p>
        </div>

        <div className="space-y-3 text-white mt-3">
          <h1 className=" text-xl font-semibold mb-3">Company</h1>
          <ul>
            <li className="mt-2">
              <a href="#" className="hover:text-gray-400">About</a>
            </li>
            <li className="mt-2">
              <a href="#"  className="hover:text-gray-400">Privacy</a>
            </li>
            <li className="mt-2">
              <a href="#"  className="hover:text-gray-400">Terms</a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-white mt-3">
          <h1 className="text-xl font-semibold mb-3">Follow</h1>
          <div className="flex gap-3  lg:items-center lg:justify-center">
            {follow.map((item, index) => {
                const Icon = item.icon
              return (
                <a
                  key={index}
                  href={item.Path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl border p-1 rounded-md hover:bg-violet-700"
                >
                  <Icon/>
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 text-gray-400 mt-3">
            <p className="text-sm">© 2025 Chatter, Inc. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default Footer;
