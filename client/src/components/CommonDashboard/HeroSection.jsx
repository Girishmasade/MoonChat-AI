import React from "react";
import {
  AntDesignOutlined,
  SmileTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";
import { AiFillMessage, AiOutlineLink, AiOutlineSend } from "react-icons/ai";

export default function HeroSection() {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-16 pt-32 md:py-56 max-w-7xl min-h-screen">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* left */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-white text-xs sm:text-sm">
            <span className="rounded-full bg-green-600 h-2 w-2" />
            <p className="text-sm">Live, real-time messaging</p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Chat Smarter with Our Real-Time System
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground text-gray-400 max-w-xl">
            Secure messaging, emoji reactions, and file sharing — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="w-full sm:w-auto text-md font-semibold border p-3 rounded-lg bg-[#873ee0] border-black btn hover:bg-[#9641ff]">
              Get Started
            </button>
          </div>

          <div className="flex gap-4 text-muted-foreground items-center text-sm">
            <Avatar.Group>
              <Tooltip title="emoji" placement="top">
                <Avatar style={{ backgroundColor: "#1677ff" }} icon={<SmileTwoTone />} />
              </Tooltip>
              <Tooltip title="chats" placement="top">
                <Avatar style={{ backgroundColor: "#1677ff" }} icon={<AiFillMessage />} />
              </Tooltip>
              <Tooltip title="files" placement="top">
                <Avatar style={{ backgroundColor: "#1677ff" }} icon={<AiOutlineLink />} />
              </Tooltip>
            </Avatar.Group>
            <span className="text-gray-300">Trusted by teams worldwide</span>
          </div>
        </div>

        {/* right - chat preview */}
        <div className="relative w-full flex justify-center md:justify-end">
          {/* decorative blob - responsive placement */}
          <div className="hidden md:block absolute -right-20 top-10 w-56 h-56 rounded-full bg-[#9254de] blur-3xl opacity-70 pointer-events-none" aria-hidden />
          <div className="block md:hidden absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-[#9254de] blur-3xl opacity-60 pointer-events-none" aria-hidden />

          <div className="relative rounded-2xl border bg-card shadow-xl overflow-hidden w-full max-w-xl">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <span className="h-3 w-3 bg-rose-400 rounded-full" />
              <span className="h-3 w-3 bg-yellow-400 rounded-full" />
              <span className="h-3 w-3 bg-green-400 rounded-full" />

              <span className="ml-2 text-sm font-medium text-muted-foreground text-gray-400">Team Chat</span>
            </div>

            <div className="p-4 space-y-3 bg-gradient-to-b from-background to-muted/40">
              <div className="flex flex-col space-y-3 max-h-80 pr-2">
                <div className="flex justify-start">
                  <div className="bg-[#9254de] text-foreground max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm text-white">
                    <p className="font-medium mb-0.5">Rohan</p>
                    <p>Welcome to Chatter</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-[#6b21a8] text-foreground max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm text-white">
                    <p className="font-medium mb-0.5">You</p>
                    <p>Thanks — excited to try it!</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-[#9254de] text-foreground max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm text-white">
                    <p className="font-medium mb-0.5">Rohan</p>
                    <p>Feel free to test file sharing and reactions.</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-[#9254de] text-foreground max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm text-white">
                    <p className="font-medium mb-0.5">Rohan</p>
                    <p>We also support threads and @mentions.</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-400 rounded-lg p-2 gap-4 flex items-center mt-4">
                <span className="text-xl">😀</span>
                <input
                  type="text"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-400"
                  placeholder="Type a message..."
                  aria-label="Type a message"
                />
                <button className="inline-flex items-center justify-center bg-[#9254de] p-2 rounded-md focus:bg-[#8c43e6]">
                  <AiOutlineSend className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
