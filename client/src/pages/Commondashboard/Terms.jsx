import React from "react";

const Terms = () => {
  return (
    <div
      className="min-h-screen bg-[#0a0a1a] text-gray-100 py-12 px-6 sm:px-16 md:px-32"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1
          className="text-5xl sm:text-6xl font-extrabold text-center mb-10 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff 0%, #7f00ff 100%)",
          }}
        >
          Terms & Conditions
        </h1>

        {/* Intro */}
        <p className="text-lg mb-8 leading-relaxed text-gray-300">
          Welcome to <span className="text-[#00ffff] font-semibold">MoonChat-AI</span>.  
          By accessing or using our services, you agree to be bound by these
          Terms and Conditions. Please read them carefully before using our
          platform.
        </p>

        {/* Section 1 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #4b0082)",
          }}
        >
          1. Acceptance of Terms
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          By using MoonChat-AI, you confirm that you accept these terms and agree
          to comply with them. If you do not agree, you must discontinue use of
          our platform and related services.
        </p>

        {/* Section 2 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #7f00ff)",
          }}
        >
          2. Use of Service
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          MoonChat-AI provides intelligent AI-based communication tools. You agree
          to use these services responsibly and only for lawful purposes. Any form
          of misuse, reverse engineering, or harmful activity is strictly
          prohibited.
        </p>

        {/* Section 3 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #4b0082)",
          }}
        >
          3. User Responsibilities
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          You are responsible for maintaining the confidentiality of your account
          information. MoonChat-AI will not be liable for any losses resulting from
          unauthorized access to your account due to negligence.
        </p>

        {/* Section 4 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #7f00ff)",
          }}
        >
          4. Privacy and Data Protection
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          Your privacy is important to us. Please review our{" "}
          <a
            href="/privacy"
            className="text-[#00ffff] hover:text-[#7f00ff] transition-colors"
          >
            Privacy Policy
          </a>{" "}
          to understand how we collect, use, and protect your personal data.
        </p>

        {/* Section 5 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #4b0082)",
          }}
        >
          5. Intellectual Property
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          All trademarks, logos, and assets displayed on MoonChat-AI are the
          property of their respective owners. You may not copy, modify, or
          distribute any content without written permission.
        </p>

        {/* Section 6 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #7f00ff)",
          }}
        >
          6. Limitation of Liability
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          MoonChat-AI and its developers will not be held responsible for any
          damages, data loss, or system errors resulting from the use or misuse of
          our services.
        </p>

        {/* Section 7 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #4b0082)",
          }}
        >
          7. Updates to Terms
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          We may update these Terms & Conditions periodically. Any changes will be
          posted on this page, and continued use of the service implies acceptance
          of the updated terms.
        </p>

        {/* Section 8 */}
        <h2
          className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #00ffff, #7f00ff)",
          }}
        >
          8. Contact Us
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed">
          If you have questions regarding these terms, reach out to us at{" "}
          <span className="text-[#00ffff] font-semibold">
            support@moonchat-ai.com
          </span>
          .
        </p>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MoonChat-AI. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
