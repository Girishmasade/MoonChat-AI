import React from "react";

const RealTimeCollaboration = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12 md:py-20 max-w-[90rem] min-h-screen">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="./collab.png"
            alt="Illustration of people collaborating"
            className="w-full h-auto rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-4xl text-white font-bold">
            Real-time collaboration, simplified
          </h1>

          <p className="text-gray-400 mt-4 max-w-prose">
            See messages appear instantly, react with emojis, and share files
            without leaving the conversation. Stay in sync across all your
            devices.
          </p>

          <ul className="text-gray-300 mt-6 list-disc pl-5 space-y-2">
             <li>Ai support system</li>
            <li>Sub-second message delivery</li>
            <li>Presence indicators and typing states</li>
            <li>Secure end-to-end encryption</li>
          </ul>
          
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col p-6 rounded-xl border border-gray-800 bg-[#0b0b0d]/60 shadow-md hover:shadow-xl transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-2xl shadow">
                🤖
              </div>
              <h3 className="text-white font-semibold mt-4">AI support</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Smart suggestions and moderation to keep conversations helpful
                and safe.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col p-6 rounded-xl border border-gray-800 bg-[#0b0b0d]/60 shadow-md hover:shadow-xl transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white text-2xl shadow">
                ⚡
              </div>
              <h3 className="text-white font-semibold mt-4">Fast delivery</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Optimized real-time pipelines ensure messages arrive instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col p-6 rounded-xl border border-gray-800 bg-[#0b0b0d]/60 shadow-md hover:shadow-xl transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-2xl shadow">
                🔒
              </div>
              <h3 className="text-white font-semibold mt-4">Fully secure</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                End-to-end encryption and strict access controls by default.
              </p>
            </div>
          </div>
    </div>
  );
};

export default RealTimeCollaboration;
