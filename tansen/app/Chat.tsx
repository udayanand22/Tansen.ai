// app/Chat.tsx
'use client';

import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Tansen. How can I assist you?", from: "bot" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState([
    { label: "Learn about Indian Classical Music", action: "learn_music" },
    { label: "Ask about Tansen", action: "about_tansen" },
    { label: "Ask about Raga", action: "ask_raga" },
  ]); // Add options for the user to select from

  const handleUserMessage = () => {
    if (userInput.trim()) {
      // Add the user's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, from: "user" },
      ]);
      setUserInput("");

      // Simple bot response (this can be extended later)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "I'm still learning. Ask me about Indian classical music!", from: "bot" },
        ]);
        setOptions([
          { label: "Learn about Indian Classical Music", action: "learn_music" },
          { label: "Ask about Tansen", action: "about_tansen" },
          { label: "Ask about Raga", action: "ask_raga" },
        ]);
      }, 1000);
    }
  };

  const handleOptionClick = (action: string) => {
    // Handle the selected option (can extend this logic to handle more actions)
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `You selected: ${action}`, from: 'user' },
    ]);
    setOptions([]); // Hide options after a selection

    // Bot response after option selection
    setTimeout(() => {
      let responseText = '';
      if (action === 'learn_music') {
        responseText = 'Indian classical music is a traditional art form, with a rich history of ragas, talas, and devotional music.';
      } else if (action === 'about_tansen') {
        responseText = 'Tansen was one of the greatest musicians in the Mughal court, known for his mastery of ragas and his incredible vocal skills.';
      } else if (action === 'ask_raga') {
        responseText = 'A raga is a melodic framework for improvisation, and it is a fundamental element of Indian classical music.';
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseText, from: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 bg-white rounded-lg w-96 h-80 shadow-xl p-4">
      <div className="h-full flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 p-2 rounded-lg ${
                message.from === "bot" ? "bg-gray-200" : "bg-yellow-400 text-black"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        {/* Options if any */}
        {options.length > 0 && (
          <div className="mt-4 flex flex-col space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.action)}
                className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* User input */}
        {options.length === 0 && (
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-gray-100 border border-gray-300"
              placeholder="Type your message..."
            />
            <button
              onClick={handleUserMessage}
              className="ml-2 bg-yellow-400 text-black px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
