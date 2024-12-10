'use client';
import React, { useState, useRef, useEffect } from 'react';

const JasrajGallery: React.FC = () => {
  const [mainAudioPlaying, setMainAudioPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<number[]>([]);
  const mainAudioRef = useRef<HTMLAudioElement>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const jasrajDetails = [
    {
      title: 'Early Life',
      image: '/imagef/jasrajb.png',
      description:
        'Pandit Jasraj was born on January 28, 1930, in Pili Mandori, Haryana, into a family of musicians. He was initiated into music by his father, Pandit Motiram.',
    },
    {
      title: 'Connection with Lord Krishna',
      image: '/imagef/jasrajmain.jpg',
      description:
        'Pandit Jasraj had a deep spiritual connection with Lord Krishna, often dedicating his performances to him. His renditions of devotional compositions are legendary.',
      audio: '/audio/jasraj3.mp3',
    },
    {
      title: 'Singing Allah OM in Pakistan',
      image: '/imagef/jasraj3.jpg',
      description:
        'Pandit Jasraj mesmerized audiences in Pakistan with his rendition of "Allah OM," breaking cultural barriers through the power of music.',
      audio: '/audio/jasraj2.mp3',
    },
    {
      title: 'Dulhia Malhar Incident',
      image: '/imagef/jasr.png',
      description:
        'At the home of a senior government official, Pandit Jasraj performed Dulhia Malhar, leaving everyone spellbound. This incident cemented his reputation as a maestro.',
      audio: '/audio/jasraj4.mp3',
    },
    {
      title: 'Sangeet Martand',
      image: '/imagef/jasun.png',
      description:
        'Known as Sangeet Martand, Pandit Jasraj received numerous accolades for his contributions to Indian classical music.',
    },
    {
      title: 'Planet Named After Him',
      image: '/imagef/jasraj2.png',
      description:
        'In 2019, a minor planet was named Panditjasraj, honoring his legacy in music and culture.',
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
          src="/imagef/jas.png"
          alt="Pandit Jasraj"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Main Audio Button */}
        <div
          onClick={handleMainAudioToggle}
          className="absolute top-4 right-4 p-4 bg-purple-500 text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-600"
        >
          {mainAudioPlaying ? 'Pause' : 'Play'}
        </div>
        <audio ref={mainAudioRef} src="/audio/jasraj1.mp3" preload="auto" />
      </div>

      {/* Page Content */}
      <div className="p-8 pt-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Pandit Jasraj</h1>
          <p className="text-lg text-gray-400">
            Explore the journey of Sangeet Martand Pandit Jasraj through this visual and narrative gallery.
          </p>
        </header>

        <div className="space-y-12">
          {jasrajDetails.map((detail, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 transition-all duration-500 transform ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500">
                <img
                  src={detail.image}
                  alt={detail.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Text and Audio */}
              <div className="p-8 bg-opacity-60 bg-black rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-purple-200 mb-4">{detail.title}</h2>
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
                      className="px-4 py-2 bg-purple-500 text-white rounded-md transition-all duration-300 hover:bg-purple-600"
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
          <p className="text-gray-500 text-sm">© 2024 Jasraj Gallery. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default JasrajGallery;
