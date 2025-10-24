import React from "react";
import { Typography, Divider, Card } from "antd";

const { Title, Paragraph } = Typography;

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#030a14] to-[#00111f] text-white px-6 py-16 flex flex-col items-center">
      {/* Header Section */}
      <div className="max-w-5xl w-full text-center space-y-4 mb-10">
        <Title
          level={1}
          className="!text-5xl font-extrabold"
          style={{
            background:
              "linear-gradient(90deg, #00ffff 10%, #f1c40f 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 25px rgba(0,255,255,0.6), 0 0 50px rgba(0,255,255,0.4)",
          }}
        >
          Privacy Policy
        </Title>
        <Paragraph className="text-gray-300 text-lg">
          Last updated: <strong>October 2025</strong>
        </Paragraph>
      </div>

      <Card className="bg-[#0b1c2b]/60 border border-[#00ffff]/40 shadow-xl rounded-2xl max-w-5xl w-full p-8 space-y-6 text-gray-300">
        {/* Intro */}
        <Paragraph className="text-lg leading-relaxed text-justify text-white">
          Welcome to <strong>MoonChat-AI</strong>! Your privacy is very
          important to us. This Privacy Policy explains how we collect, use,
          store, and protect your information when you use our AI-powered chat
          platform. By using MoonChat-AI, you agree to the terms described in
          this policy.
        </Paragraph>

        <Divider className="bg-[#00ffff]/50" />

        {/* 1. Information We Collect */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            1. Information We Collect
          </Title>
          <Paragraph className="leading-relaxed text-justify text-gray-400">
            We collect information that helps us deliver an intelligent and
            personalized chat experience. This includes:
          </Paragraph>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> such as your name, email,
              and authentication data via OAuth (Google or GitHub).
            </li>
            <li>
              <strong>Chat Data:</strong> messages, interactions, and responses
              generated during your conversations with the AI or other users.
            </li>
            <li>
              <strong>Usage Data:</strong> device information, IP address,
              browser type, and app activity to improve platform performance.
            </li>
          </ul>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 2. How We Use Your Information */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            2. How We Use Your Information
          </Title>
          <Paragraph className="leading-relaxed text-justify text-gray-400">
            Your data is used solely to enhance your MoonChat-AI experience:
          </Paragraph>
          <ul className="list-disc pl-6 space-y-2">
            <li>To authenticate users and manage secure logins.</li>
            <li>To enable real-time chatting and AI-based responses.</li>
            <li>To improve user experience, fix bugs, and enhance UI/UX.</li>
            <li>To personalize chat recommendations and features.</li>
            <li>
              To send important updates or service-related notifications (never
              spam).
            </li>
          </ul>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 3. Data Security */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            3. Data Security
          </Title>
          <Paragraph className="leading-relaxed text-justify text-white">
            We take data security seriously. All sensitive data such as user
            credentials and chat content are encrypted in transit and at rest.
            Authentication is handled securely through <strong>JWT</strong> and{" "}
            <strong>OAuth 2.0</strong> standards. While we follow industry
            practices, no digital system can guarantee 100% security — users are
            encouraged to protect their credentials at all times.
          </Paragraph>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 4. Cookies & Tracking */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            4. Cookies & Tracking Technologies
          </Title>
          <Paragraph className="leading-relaxed text-justify text-white">
            MoonChat-AI uses cookies and similar technologies to enhance
            usability, store session data, and remember user preferences. You
            can disable cookies through your browser settings, though certain
            features may stop functioning as expected.
          </Paragraph>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 5. Third-Party Services */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            5. Third-Party Integrations
          </Title>
          <Paragraph className="leading-relaxed text-justify text-white">
            We use trusted third-party services such as Google and GitHub for
            authentication. These services may collect data as per their
            respective privacy policies. We recommend reviewing their policies
            for more details.
          </Paragraph>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 6. User Rights */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            6. Your Rights
          </Title>
          <Paragraph className="leading-relaxed text-justify text-gray-300">
            As a user, you have full control over your data. You can:
          </Paragraph>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your stored data.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Withdraw consent for data usage or delete your account.</li>
          </ul>
          <Paragraph className="leading-relaxed text-justify mt-3 text-gray-300">
            To exercise these rights, please contact us using the details
            provided below.
          </Paragraph>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 7. Changes to This Policy */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            7. Updates to This Privacy Policy
          </Title>
          <Paragraph className="leading-relaxed text-justify text-gray-300">
            We may occasionally update this Privacy Policy to reflect
            improvements or legal changes. Any major updates will be announced
            via in-app notifications or email alerts.
          </Paragraph>
        </div>

        <Divider className="bg-[#00ffff]/50" />

        {/* 8. Contact Information */}
        <div>
          <Title level={3} className="text-[#00ffff] font-semibold text-2xl" style={{color: '#00ffff'}}>
            8. Contact Us
          </Title>
          <Paragraph className="leading-relaxed text-justify text-gray-400">
            If you have any questions about this Privacy Policy or how your data
            is handled, feel free to reach out to:
          </Paragraph>
          <Paragraph className="text-[#00ffff] text-lg font-semibold">
            📧 support@moonchat-ai.com
          </Paragraph>
          <Paragraph className="text-[#f1c40f] text-base">
            © {new Date().getFullYear()} MoonChat-AI — Crafted with ☕ by Girish
            Masade
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;
