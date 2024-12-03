'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Slider from 'react-slick'; // Importing react-slick

const Chat = dynamic(() => import('./Chat'), { ssr: false });
const Card = dynamic(() => import('./Card'), { ssr: false });

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component renders only on the client side
  }, []);

  const handleImageClick = () => {
    setShowChatbot(true); // Show chatbot when image is clicked
  };

  const handleStartChattingClick = () => {
    setShowChatbot(true); // Show chatbot when button is clicked
  };

  // Slick slider settings with centerMode enabled for "pop" effect
  const sliderSettings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Time between slides in ms (2 seconds in this case)
    centerMode: true, // Enables the "pop" effect for the center card
    centerPadding: '0', // Makes sure the center card is not padded
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!isClient) {
    return null; // Wait until the client side is ready to render the dynamic parts
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/imagef/tansenhome.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-yellow-400">Tansen.ai</h1>
          <p className="mt-4 text-xl text-gray-200">
            Discover the Soul of Indian Classical Music
          </p>
        </div>
      </div>

      {/* Chatbot Image Section */}
      <section className="mt-12 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400">Meet Tansen</h2>
        <p className="mt-4 text-lg text-gray-300">
          Engage with Tansen and explore the fascinating world of Indian classical music!
        </p>
        <div className="mt-6 flex justify-center">
          <div
            className="w-32 h-32 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
            onClick={handleImageClick} // Show chatbot when image is clicked
          >
            <img
              src="/imagef/tansenbot.jpg"
              alt="Tansen Chatbot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button
          onClick={handleStartChattingClick} // Also trigger chatbot on button click
          className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg"
        >
          Start Chatting
        </button>
      </section>

      {/* Display the Chatbot */}
      {showChatbot && <Chat />}

      {/* Uncover the Legends Section */}
      <section className="mt-10 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Uncover the Legends
        </h2>

        {/* Slick Carousel */}
        <Slider {...sliderSettings}>
          <Card
            imageSrc="/imagef/jasraj.jpg"
            title="Stories of Jasraj"
            description="Discover the legacy of the legendary M. S. Subbulakshmi."
            link="/stories/jasraj"
          />
          <Card
            imageSrc="/imagef/ms.jpg"
            title="Stories of MS Subbulakshmi"
            description="Dive into the life and music of the iconic MS Subbulakshmi."
            link="/stories/ms"
          />
          <Card
            imageSrc="/imagef/ravi.jpg"
            title="Playlists by Ravi Shankar"
            description="Explore the music of the legendary sitar virtuoso Ravi Shankar."
            link="/playlists/ravi"
          />
          <Card
            imageSrc="/imagef/bismillah.jpg"
            title="Stories of Bismillah Khan"
            description="Discover the life and music of the legendary shehnai maestro."
            link="/stories/bismillah"
          />
          <Card
            imageSrc="/imagef/kishan.jpg"
            title="Stories of Kishan Maharaj"
            description="Explore the legacy of the legendary tabla maestro Kishan Maharaj."
            link="/stories/kishan"
          />
          <Card
            imageSrc="/imagef/amjad.jpg"
            title="Stories of Amjad Ali Khan"
            description="Learn about the life and music of sarod virtuoso Amjad Ali Khan."
            link="/stories/amjad"
          />
          <Card
            imageSrc="/imagef/vilayat.jpg"
            title="Stories of Vilayat Khan"
            description="Dive into the life and music of sitar legend Vilayat Khan."
            link="/stories/vilayat"
          />
          <Card
            imageSrc="/imagef/bhimsen.jpg"
            title="Stories of Bhimsen Joshi"
            description="Explore the life and classical music of the legendary Bhimsen Joshi."
            link="/stories/bhimsen"
          />
        </Slider>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-center text-white py-4 mt-10">
        <p>&copy; 2024 World of Uday. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
