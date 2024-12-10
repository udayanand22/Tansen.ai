'use client';
import React, { useState, useRef, useEffect } from 'react';

const RaviShankarGallery: React.FC = () => {
  const [mainAudioPlaying, setMainAudioPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<number[]>([]);
  const mainAudioRef = useRef<HTMLAudioElement>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const raviShankarDetails = [
    {
      title: 'Early Life',
      image: '/imagef/ravi4.png',
      description:
        'Pandit Ravi Shankar was born on April 7, 1920, in Varanasi, India. He was introduced to music at an early age by his brother, Uday Shankar, a famous dancer.',
    },
    {
      title: 'The Tenth Decade in Music Concert',
      video: '/video/ravi.mp4', // Video path for this section
      description:
        'Pandit Ravi Shankar continued to perform well into his tenth decade, showcasing his unmatched artistry and energy. This concert is a testament to his lifelong dedication to music.',
    },
    {
      title: 'Influence on Western Music',
      image: '/imagef/ravi2.png',
      description:
        'Pandit Ravi Shankar was a pioneer in blending Indian classical music with Western styles. His collaborations with artists like George Harrison of The Beatles revolutionized the perception of Indian music in the West.',
      audio: '/audio/ravi1.mp3',
    },
    
    {
      title: 'Awards and Recognition',
      image: '/imagef/ravi5.jpg',
      description:
        'He received numerous accolades throughout his life, including the BHARAT RATNA Padma Bhushan and the Grammy Award, recognizing his contribution to global music.',
    },
  ];

  useEffect(() => {
    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        if (index === playingIndex) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
    if (playingIndex !== null) {
      mainAudioRef.current?.pause();
      setMainAudioPlaying(false);
    }
  }, [playingIndex]);

  const handleMainAudioToggle = () => {
    if (mainAudioPlaying) {
      mainAudioRef.current?.pause();
    } else {
      mainAudioRef.current?.play();
    }
    setMainAudioPlaying(!mainAudioPlaying);
    setPlayingIndex(null);
  };

  const handleSectionAudioToggle = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
    }
  };

  const updateAudioProgress = (index: number) => {
    if (audioRefs.current[index]) {
      const progress =
        (audioRefs.current[index]?.currentTime / audioRefs.current[index]?.duration) *
          100 || 0;
      const updatedProgress = [...audioProgress];
      updatedProgress[index] = progress;
      setAudioProgress(updatedProgress);
    }
  };

  const handleSliderChange = (index: number, value: number) => {
    if (audioRefs.current[index]) {
      const newTime =
        (value / 100) * (audioRefs.current[index]?.duration || 0);
      audioRefs.current[index]!.currentTime = newTime;
    }
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Top Image */}
      <div className="w-full h-[500px] relative">
        <img
          src="/imagef/ravi3.jpg"
          alt="Pandit Ravi Shankar"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Main Audio Button */}
        <div
          onClick={handleMainAudioToggle}
          className="absolute top-4 right-4 p-4 bg-green-500 text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-green-600"
        >
          {mainAudioPlaying ? 'Pause' : 'Play'}
        </div>
        <audio ref={mainAudioRef} src="/audio/ravi2.mp3" preload="auto" />
      </div>

      {/* Page Content */}
      <div className="p-8 pt-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-300 mb-4">Pandit Ravi Shankar</h1>
          <p className="text-lg text-gray-400">
            Explore the life and legacy of Pandit Ravi Shankar through this visual and narrative gallery.
          </p>
        </header>

        <div className="space-y-12">
          {raviShankarDetails.map((detail, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 transition-all duration-500 transform ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image or Video Section */}
              <div className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500">
                {detail.video ? (
                  <video
                    src={detail.video}
                    controls
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <img
                    src={detail.image}
                    alt={detail.title}
                    className="w-full h-[400px] object-cover"
                  />
                )}
              </div>

              {/* Text and Audio */}
              <div className="p-8 bg-opacity-60 bg-black rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-green-200 mb-4">{detail.title}</h2>
                <p className="text-lg text-gray-300">{detail.description}</p>
                {detail.audio && (
                  <div className="mt-4">
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={detail.audio}
                      preload="auto"
                      onTimeUpdate={() => updateAudioProgress(index)}
                    />
                    <button
                      onClick={() => handleSectionAudioToggle(index)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md transition-all duration-300 hover:bg-green-600"
                    >
                      {playingIndex === index ? 'Pause' : 'Play'}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={audioProgress[index] || 0}
                      onChange={(e) =>
                        handleSliderChange(index, parseFloat(e.target.value))
                      }
                      className="w-full mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-12">
          <p className="text-gray-500 text-sm">© 2024 Ravi Shankar Gallery. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default RaviShankarGallery;
