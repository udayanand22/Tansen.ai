'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Slider from 'react-slick';

const Chat = dynamic(() => import('./Chat'), { ssr: false });
const Card = dynamic(() => import('./Card'), { ssr: false });

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [audioSelected, setAudioSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageClick = () => setShowChatbot(true);
  const handleStartChattingClick = () => setShowChatbot(true);
  const handleCloseChat = () => setShowChatbot(false);

  const toggleAudio = () => {
    const audio = document.getElementById('background-audio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeAudio = (newAudioSrc) => {
    const audio = document.getElementById('background-audio');
    audio.src = newAudioSrc;
    audio.play();
    setIsPlaying(true);
    setAudioSelected(true);
  };

  const legends = [
    { imageSrc: '/imagef/jasraj.jpg', title: 'Stories of Jasraj', description: 'Discover the legacy of Jasraj.', link: '/jasraj' },
    { imageSrc: '/imagef/ms.jpg', title: 'Stories of MS Subbulakshmi', description: "Dive into MS Subbulakshmi's music.", link: '/ms' },
    { imageSrc: '/imagef/ravi.jpg', title: 'Stories of Ravi Shankar', description: "Explore Ravi Shankar's sitar virtuosity.", link: '/ravi' },
    { imageSrc: '/imagef/bismillah.jpg', title: 'Stories of Bismillah Khan', description: "Discover Bismillah Khan's legacy.", link: '/bismillah' },
    { imageSrc: '/imagef/kishan.jpg', title: 'Stories of Kishan Maharaj', description: "Explore the tabla maestro's life.", link: '/kishan' },
    { imageSrc: '/imagef/amjad.jpg', title: 'Stories of Amjad Ali Khan', description: "Learn about sarod virtuoso Amjad Ali Khan.", link: '/amjad' },
    { imageSrc: '/imagef/vilayat.jpg', title: 'Stories of Vilayat Khan', description: "Dive into Vilayat Khan's sitar legacy.", link: '/vilayat' },
    { imageSrc: '/imagef/bhimsen.jpg', title: 'Stories of Bhimsen Joshi', description: "Explore Bhimsen Joshi's classical music.", link: '/bhimsen' },
  ];

  // Filter legends based on the search query
  const filteredLegends = legends.filter((legend) =>
    legend.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/imagef/tansenhome.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-yellow-400">Tansen.ai</h1>
          <p className="mt-4 text-xl text-gray-200">Discover the Soul of Indian Classical Music</p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-center space-y-4">
        <audio id="background-audio" src={audioSrc} loop></audio>
        <select onChange={(e) => changeAudio(e.target.value)} className="bg-yellow-500 text-black p-4 rounded-full">
          <option value="">🎵 Select Theme</option>
          <option value="/audio/tansen-theme.mp3">Calm Theme</option>
          <option value="/audio/tansen-theme-2.mp3">Intense Theme</option>
        </select>

        {audioSelected && (
          <button onClick={toggleAudio} className="bg-yellow-500 text-black p-4 rounded-full">
            {isPlaying ? '🔈 Pause' : '🔊 Play'}
          </button>
        )}
      </div>

      <section className="mt-12 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400">Meet Tansen</h2>
        <p className="mt-4 text-lg text-gray-300">Engage with Tansen and explore the fascinating world of Indian classical music!</p>
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-32 bg-gray-600 rounded-full overflow-hidden cursor-pointer" onClick={handleImageClick}>
            <img src="/imagef/tansenbot.jpg" alt="Tansen Chatbot" className="w-full h-full object-cover" />
          </div>
        </div>
        <button onClick={handleStartChattingClick} className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg">
          Start Chatting
        </button>
      </section>

      {showChatbot && <Chat onClose={handleCloseChat} />}

      {/* Search Bar */}
      <section className="mt-10 px-4 max-w-5xl mx-auto text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for artists..."
          className="p-3 w-full max-w-md bg-gray-700 text-white rounded-md"
        />
      </section>

      {/* Cards Section */}
      <section className="mt-10 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">Uncover the Legends</h2>
        <Slider {...sliderSettings}>
          {filteredLegends.map((legend, index) => (
            <Card key={index} imageSrc={legend.imageSrc} title={legend.title} description={legend.description} link={legend.link} />
          ))}
        </Slider>
      </section>

      <footer className="bg-gray-800 text-center text-white py-4 mt-10">
        <p>&copy; 2024 World of Uday. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Page;
