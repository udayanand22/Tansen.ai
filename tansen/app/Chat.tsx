import React, { useState } from "react";

interface ChatProps {
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-900 bg-opacity-70">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-full max-w-lg rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-center p-4 rounded-t-lg">
          <img
            src="/imagef/tansenbot.jpg"
            alt="Tansen Avatar"
            className="w-16 h-16 mx-auto rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-2 text-2xl font-bold text-white">Tansen</h2>
          <p className="text-sm text-white">Your guide to Indian Classical Music</p>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md"
          >
            ✖
          </button>
        </div>

        {/* Show the "Open Chat" button when chat is not opened */}
        {!isChatOpen && (
          <div className="flex items-center justify-center h-32">
            <button
              onClick={handleOpenChat}
              className="bg-yellow-400 text-black font-bold p-4 rounded-lg shadow-md"
            >
              Open Chat
            </button>
          </div>
        )}

        {/* Botpress Webchat Embed using iframe */}
        {isChatOpen && (
          <div className="p-4">
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/08/07/20241208075420-NMHDVI2X.json"
              width="100%"
              height="500"
              frameBorder="0"
              title="Tansen Chat"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
