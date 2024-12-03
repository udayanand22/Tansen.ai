// Card.tsx
import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description, link }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-80">
      <div className="relative" style={{ paddingBottom: '133.33%' }}>
        <img
          src={imageSrc}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
        <a
          href={link}
          className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Card;
