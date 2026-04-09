import React from "react";
import { follow } from "../../utils/footerFollow";

const Footer = () => {
  return (
    <div className="border-t border-[#F5D06F]/20 mt-10 lg:mt-0 bg-[#020617]">
      <div className="px-8 py-10 grid lg:grid-cols-4 lg:justify-center lg:text-center">
        
        {/* LOGO + DESC */}
        <div className="space-y-3">
          <div className="flex items-center gap-1">
            <p className="inline-flex h-8 w-[60px] items-center justify-center rounded-md 
              bg-gradient-to-br from-[#F5D06F] to-[#E6B85C] text-black font-bold">
              Moon
            </p>
            <h1 className="text-lg font-semibold tracking-tight 
              bg-gradient-to-r from-[#1E3A8A] to-[#F5D06F] 
              bg-clip-text text-transparent">
              Chatt-AI
            </h1>
            {/* <img src="/Logo.png" alt="MoonChat-AI Logo" className="w-50 h-20"/> */}
          </div>

          <p className="mt-2 text-gray-400 text-start">
            Real-time chat platform with secure messaging, emoji reactions, and
            file sharing.
          </p>
        </div>

        {/* COMPANY */}
        <div className="space-y-3 mt-3">
          <h1 className="text-xl font-semibold mb-3 text-[#F5D06F]">
            Company
          </h1>
          <ul>
            <li className="mt-2">
              <a href="/about" className="text-gray-400 hover:text-[#F5D06F] transition">
                About
              </a>
            </li>
            <li className="mt-2">
              <a href="/privacy" className="text-gray-400 hover:text-[#F5D06F] transition">
                Privacy
              </a>
            </li>
            <li className="mt-2">
              <a href="/terms" className="text-gray-400 hover:text-[#F5D06F] transition">
                Terms
              </a>
            </li>
          </ul>
        </div>

        {/* FOLLOW */}
        <div className="space-y-3 mt-3">
          <h1 className="text-xl font-semibold mb-3 text-[#F5D06F]">
            Follow
          </h1>

          <div className="flex gap-3 lg:items-center lg:justify-center">
            {follow.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.Path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl border border-[#F5D06F]/30 p-2 rounded-md 
                  text-[#F5D06F] hover:bg-[#F5D06F] hover:text-black 
                  transition-all duration-300"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="space-y-3 text-gray-400 mt-3">
          <p className="text-sm">
            © 2025 <span className="text-[#F5D06F]">MoonChat-AI</span>. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Footer;