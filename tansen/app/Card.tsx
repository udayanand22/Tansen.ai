import React from 'react';
import Link from 'next/link';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string; // Use a direct link to the page
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description, link }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-80 transform transition-transform hover:scale-105">
      {/* Image Section */}
      <div className="relative" style={{ paddingBottom: '133.33%' }}>
        <img
          src={imageSrc}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
        <Link
          href={link} // Direct link to the page
          className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Card;
