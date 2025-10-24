import React from "react";
import { Typography, Card, Divider, Tag, Avatar } from "antd";
import {
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiAntdesign,
  SiPassport,
} from "react-icons/si";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#030a14] to-[#00111f] text-white flex flex-col items-center px-6 py-16">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
        <img
          src="/Logo.png"
          alt="MoonChat-AI Logo"
          className="w-52 md:w-72 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]"
        />

        <div className="space-y-5 text-center md:text-left">
          <Title
            level={1}
            className="!text-5xl md:!text-6xl font-extrabold"
            style={{
              background:
                "linear-gradient(90deg, #00ffff 10%, #f1c40f 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 25px rgba(0,255,255,0.6), 0 0 50px rgba(0,255,255,0.4)",
            }}
          >
            MoonChat-AI
          </Title>
          <Paragraph className="text-gray-300 text-lg md:text-xl leading-relaxed">
            MoonChat-AI is a next-generation AI-powered chat system built using
            the <strong>MERN stack</strong>. It combines real-time communication,
            personalization, and an elegant dark UI — bringing the calmness of
            moonlight into every conversation.
          </Paragraph>
        </div>
      </div>

      <Divider className="bg-[#00ffff] opacity-40 my-14 w-3/4" />

      {/* Project Story */}
      <div className="max-w-5xl w-full space-y-6">
        <Title
          level={2}
          className="text-[#00ffff] font-semibold text-3xl text-center"
          style={{
            color: "#00ffff"
          }}
        >
          🌕 Project Story & Vision
        </Title>
        <Paragraph className="text-gray-300 text-lg leading-relaxed text-justify">
          The journey of <strong>MoonChat-AI</strong> began with a simple idea:
          to create a sleek, secure, and smart AI chat platform that connects
          humans and intelligent systems seamlessly. Inspired by the serene glow
          of the moon, this project delivers a calm and intuitive chat
          experience — whether you're connecting with an AI assistant or real
          users.
        </Paragraph>
        <Paragraph className="text-gray-300 text-lg leading-relaxed text-justify">
          Every feature — from real-time chat to OAuth authentication — is built
          with a focus on simplicity, performance, and design aesthetics. It’s a
          project that balances modern technology with human-centric interaction.
        </Paragraph>
      </div>

      <Divider className="bg-[#00ffff] opacity-40 my-14 w-3/4" />

      {/* Why Use */}
      <div className="max-w-5xl w-full">
        <Title
          level={2}
          className="text-[#f1c40f] text-center font-semibold text-3xl mb-8"
            style={{
            color: "#f1c40f"
          }}
        >
          🌙 Why Choose MoonChat-AI?
        </Title>

        <ul className="text-gray-300 text-lg leading-relaxed space-y-4 list-disc pl-6">
          <li>
            <strong>Smart AI Conversations:</strong> Engage with intelligent
            chatbots powered by natural language understanding.
          </li>
          <li>
            <strong>Real-Time Messaging:</strong> Instant message delivery with
            WebSocket-based live updates.
          </li>
          <li>
            <strong>Beautiful Interface:</strong> A futuristic moonlight-themed
            dark UI for smooth chatting.
          </li>
          <li>
            <strong>Secure Authentication:</strong> Integrated OAuth and
            Passport.js ensure your privacy and data safety.
          </li>
        </ul>
      </div>

      <Divider className="bg-[#00ffff] opacity-40 my-14 w-3/4" />

      {/* How It Works */}
      <div className="max-w-5xl w-full text-center">
        <Title level={2} className="text-[#00ffff] font-semibold text-3xl mb-6"    style={{
            color: "#00ffff"
          }}>
          🚀 How It Works
        </Title>
        <Paragraph className="text-gray-300 text-lg leading-relaxed text-justify">
          Getting started with MoonChat-AI is simple. Register or sign in using
          Google or GitHub. Once logged in, add your contacts, start chatting,
          or interact directly with the integrated AI assistant. All
          conversations are securely stored in MongoDB and handled efficiently
          through the Express.js backend.
        </Paragraph>
        <Paragraph className="text-gray-300 text-lg leading-relaxed text-justify">
          The frontend is powered by React.js and Ant Design, ensuring a clean,
          responsive interface across all devices. The backend, built with
          Node.js, delivers reliability, while JWT ensures secure
          authentication.
        </Paragraph>
      </div>

      <Divider className="bg-[#00ffff] opacity-40 my-14 w-3/4" />

      {/* Tech Stack */}
      <div className="max-w-5xl w-full text-center">
        <Title level={2} className="text-[#f1c40f] font-semibold text-3xl mb-6" style={{
            color: "#f1c40f"
          }}>
          🧩 Technologies Used
        </Title>

        <div className="flex flex-wrap justify-center gap-6 text-4xl">
          <div className="flex flex-col items-center">
            <SiReact className="text-[#00d8ff]" />
            <p className="text-sm mt-1">React JS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiNodedotjs className="text-green-500" />
            <p className="text-sm mt-1">Node JS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiExpress className="text-gray-400" />
            <p className="text-sm mt-1">Express JS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiMongodb className="text-green-400" />
            <p className="text-sm mt-1">MongoDB</p>
          </div>
          <div className="flex flex-col items-center">
            <SiAntdesign className="text-blue-400" />
            <p className="text-sm mt-1">Ant Design</p>
          </div>
          <div className="flex flex-col items-center">
            <SiPassport className="text-yellow-400" />
            <p className="text-sm mt-1">Passport JS</p>
          </div>
        </div>
      </div>

      <Divider className="bg-[#00ffff] opacity-40 my-14 w-3/4" />

      {/* Future Plans */}
      <div className="max-w-5xl w-full">
        <Title
          level={2}
          className="text-[#00ffff] text-center font-semibold text-3xl mb-6"
          style={{
            color: "#00ffff"
          }}>
          🌌 Future Vision
        </Title>
        <Paragraph className="text-gray-300 text-lg leading-relaxed text-justify">
          MoonChat-AI is an evolving platform. The upcoming updates include an
          admin analytics dashboard, AI-enhanced chat summaries, and
          multilingual support. The long-term vision is to build a dynamic
          ecosystem where AI and humans collaborate in real time — transforming
          communication under the tranquil glow of the moon.
        </Paragraph>
      </div>

      <Divider className="bg-[#00ffff] opacity-40 my-14 w-3/4" />

      {/* Author Section */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
        <Card
          className="bg-[#0b1c2b]/60 border border-[#00ffff]/40 shadow-lg text-center text-white w-full rounded-2xl"
          bordered={false}
        >
          <Avatar
          src ="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg"
            alt="Author"
            className="w-28 h-28 rounded-full mx-auto border-2 border-[#00ffff] shadow-lg"
          />
          <Title level={4} className="text-[#00ffff] mt-4" style={{color: "#00ffff"}}>
            Girish Masade
          </Title>
          <Paragraph className="text-gray-400">
            MERN Stack Developer | UI/UX Enthusiast | Passionate about crafting
            intelligent, scalable, and visually stunning web applications.
          </Paragraph>

          <div className="flex justify-center gap-6 text-3xl mt-4">
            <a
              href="https://github.com/girishmasade"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00ffff] transition-all"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://linkedin.com/in/girishmasade"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00ffff] transition-all"
            >
              <AiFillLinkedin />
            </a>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <Tag color="cyan">#ReactJS</Tag>
            <Tag color="blue">#NodeJS</Tag>
            <Tag color="gold">#MongoDB</Tag>
            <Tag color="green">#AI_Integration</Tag>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
