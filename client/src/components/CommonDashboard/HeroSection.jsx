import React from "react";
import {
  SmileTwoTone,
} from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { AiFillMessage, AiOutlineLink, AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-16 pt-32 md:py-24 max-w-7xl">
      <div className="grid items-center gap-10 md:grid-cols-2">
        
        {/* LEFT */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border dark:border-[#F5D06F]/30 border-[#F5D06F]/30 px-3 py-2 text-xs sm:text-sm">
            <span className="rounded-full bg-green-500 h-2 w-2" />
            <p className="text-sm text-gray-300">Live, real-time messaging</p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
            Chat Smarter with Our{" "}
            <span className="font-bold px-2 rounded-lg bg-[#F5D06F] text-[#0A2540] animate-blink">
              AI
            </span>{" "}
            Real-Time System
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl">
            Secure messaging, emoji reactions, and file sharing — all in one
            place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={"/signup"}
              className="w-full sm:w-auto text-md font-semibold px-5 py-3 rounded-lg 
              bg-gradient-to-r from-[#F5D06F] to-[#E6B85C] text-black 
              hover:shadow-[0_0_12px_#F5D06F] transition-all"
            >
              Get Started
            </Link>
          </div>

          <div className="flex gap-4 items-center text-sm">
  
  <Avatar.Group
    maxCount={3}
    size="large"
  >
    <Tooltip title="Emoji reactions">
      <Avatar
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #0A2540)",
          border: "2px solid rgba(245, 208, 111, 0.4)",
        }}
        icon={<SmileTwoTone />}
      />
    </Tooltip>

    <Tooltip title="Real-time chats">
      <Avatar
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #0A2540)",
          border: "2px solid rgba(245, 208, 111, 0.4)",
        }}
        icon={<AiFillMessage />}
      />
    </Tooltip>

    <Tooltip title="File sharing">
      <Avatar
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #0A2540)",
          border: "2px solid rgba(245, 208, 111, 0.4)",
        }}
        icon={<AiOutlineLink />}
      />
    </Tooltip>
  </Avatar.Group>

  <span className="text-gray-300 tracking-wide">
    Trusted by <span className="text-[#F5D06F] font-semibold">teams worldwide</span>
  </span>

</div>
        </div>

        {/* RIGHT - CHAT PREVIEW */}
        <div className="relative w-full flex justify-center md:justify-end">
          
          {/* Glow Effect */}
          <div className="hidden md:block absolute -right-20 top-10 w-56 h-56 rounded-full bg-[#0A2540] blur-3xl opacity-70 pointer-events-none" />
          <div className="block md:hidden absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-[#0A2540] blur-3xl opacity-60 pointer-events-none" />

          <div className="relative rounded-2xl border border-[#F5D06F]/20 bg-[#020617] shadow-xl overflow-hidden w-full max-w-xl">
            
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-[#F5D06F]/20 px-4 py-3">
              <span className="h-3 w-3 bg-rose-400 rounded-full" />
              <span className="h-3 w-3 bg-yellow-400 rounded-full" />
              <span className="h-3 w-3 bg-green-400 rounded-full" />

              <span className="ml-2 text-sm font-medium text-[#F5D06F]">
                Team Chat
              </span>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 bg-gradient-to-b from-[#020617] to-[#0A2540]/40">
              <div className="flex flex-col space-y-3 max-h-80 pr-2">
                
                {/* AI */}
                <div className="flex justify-start">
                  <div className="bg-[#0A2540] text-[#F5D06F] max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow">
                    <p className="font-medium mb-0.5">Rohan</p>
                    <p>Welcome to Chatter</p>
                  </div>
                </div>

                {/* USER */}
                <div className="flex justify-end">
                  <div className="bg-[#1E3A8A] text-white max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow">
                    <p className="font-medium mb-0.5">You</p>
                    <p>Thanks — excited to try it!</p>
                  </div>
                </div>

                {/* AI */}
                <div className="flex justify-start">
                  <div className="bg-[#0A2540] text-[#F5D06F] max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow">
                    <p className="font-medium mb-0.5">Rohan</p>
                    <p>Feel free to test file sharing and reactions.</p>
                  </div>
                </div>

                {/* AI */}
                <div className="flex justify-start">
                  <div className="bg-[#0A2540] text-[#F5D06F] max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow">
                    <p className="font-medium mb-0.5">Rohan</p>
                    <p>We also support threads and @mentions.</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="border border-[#F5D06F]/30 rounded-lg p-2 gap-4 flex items-center mt-4">
                <span className="text-xl">😀</span>
                <input
                  type="text"
                  className="bg-transparent w-full outline-none text-sm placeholder-gray-400 text-white"
                  placeholder="Type a message..."
                />
                <button
                  className="inline-flex items-center justify-center 
                  bg-gradient-to-r from-[#F5D06F] to-[#E6B85C] 
                  text-black p-2 rounded-md 
                  hover:shadow-[0_0_10px_#F5D06F]"
                >
                  <AiOutlineSend />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}