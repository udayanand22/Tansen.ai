"use client";

import React, { useState } from 'react';

interface ChatProps {
  onClose: () => void; // Close callback prop
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Tansen. How can I assist you?", from: "bot" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState([
    { label: "Learn about Indian Classical Music", action: "learn_music" },
    { label: "Ask about Tansen", action: "about_tansen" },
    { label: "Ask about Raga", action: "ask_raga" },
    { label: "Learn about Indian Instruments", action: "learn_instruments" },
    { label: "Learn about Indian Classical Legends", action: "learn_legends" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle user messages
  const handleUserMessage = () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { text: userInput, from: "user" }]);
      setUserInput('');
      setIsLoading(true);

      // Simulated bot response delay
      setTimeout(() => {
        const inputLower = userInput.toLowerCase();
        let responseText = '';

        // Extended hardcoded responses
        if (inputLower.includes('indian classical music')) {
          responseText = 'Indian classical music is a rich tradition comprising Hindustani and Carnatic styles, each with unique ragas and talas.';
        } else if (inputLower.includes('tansen')) {
          responseText = 'Tansen was one of the Navaratnas in Akbar’s court and is credited with creating new ragas like Miyan ki Todi and Miyan ki Malhar.';
        } else if (inputLower.includes('raga')) {
          responseText = 'A raga is a melodic framework in Indian classical music, each evoking a specific mood or emotion.';
        } else if (inputLower.includes('carnatic')) {
          responseText = 'Carnatic music, primarily practiced in southern India, emphasizes intricate compositions and is devotional in nature.';
        } else if (inputLower.includes('hindustani')) {
          responseText = 'Hindustani music, prevalent in northern India, focuses on improvisation and explores the depths of ragas in various forms like Dhrupad and Khayal.';
        } else if (inputLower.includes('instrument')) {
          responseText = 'Common instruments in Indian classical music include the sitar, tabla, veena, sarod, and bansuri.';
        } else if (inputLower.includes('legend')) {
          responseText = 'Legends like Ravi Shankar, Bismillah Khan, and MS Subbulakshmi have significantly influenced Indian classical music globally.';
        } else if (inputLower.includes('raag malhar')) {
          responseText = 'Raag Malhar is believed to have the power to invoke rain and is often associated with monsoon.';
        } else if (inputLower.includes('raag bhairavi')) {
          responseText = 'Raag Bhairavi is a serene and devotional raga often performed at the end of a concert.';
        } else {
          responseText = 'Sorry, I didn’t quite get that. Can you rephrase or select an option below?';
        }

        setMessages((prev) => [...prev, { text: responseText, from: "bot" }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Handle option clicks
  const handleOptionClick = (action: string) => {
    const selectedOption = options.find((opt) => opt.action === action);
    setMessages((prev) => [
      ...prev,
      { text: `You selected: ${selectedOption?.label}`, from: "user" },
    ]);
    setOptions([]);

    setTimeout(() => {
      let responseText = '';
      switch (action) {
        case 'learn_music':
          responseText = 'Indian classical music spans traditions such as Hindustani and Carnatic, each with unique philosophies and techniques.';
          break;
        case 'about_tansen':
          responseText = 'Tansen is remembered for his contributions to Hindustani classical music, including the creation of many popular ragas.';
          break;
        case 'ask_raga':
          responseText = 'Ragas are the heart of Indian classical music, each associated with specific times of the day or seasons.';
          break;
        case 'learn_instruments':
          responseText = 'Instruments like the sitar, tabla, and mridangam play vital roles in Indian classical performances.';
          break;
        case 'learn_legends':
          responseText = 'Legends like Ustad Zakir Hussain, Lata Mangeshkar, and Pandit Ravi Shankar are celebrated worldwide.';
          break;
      }

      setMessages((prev) => [...prev, { text: responseText, from: "bot" }]);
    }, 1000);
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

        {/* Messages */}
        <div className="p-4 flex flex-col space-y-2 overflow-y-auto h-60">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                message.from === "bot"
                  ? "bg-yellow-100 text-black self-start"
                  : "bg-yellow-300 text-black self-end"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Options */}
        {options.length > 0 && (
          <div className="p-4 space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.action)}
                className="block w-full px-4 py-2 bg-gradient-to-r from-green-400 to-yellow-500 text-black font-semibold rounded-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* User Input */}
        {options.length === 0 && (
          <div className="p-4 flex items-center border-t bg-gradient-to-r from-pink-500 to-purple-500">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg text-black"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              onClick={handleUserMessage}
              className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-4 py-2 rounded-r-lg shadow-md"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
