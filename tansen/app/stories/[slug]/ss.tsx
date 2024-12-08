'use client';

import { useRouter } from 'next/router';

const StoryPage = () => {
  const { query } = useRouter();
  const { slug } = query;

  // Define your stories in a structured object
  const stories = {
    'jasraj': { title: 'Stories of Jasraj', content: 'Discover the legacy of Jasraj.' },
    'ms-subbulakshmi': { title: 'Stories of MS Subbulakshmi', content: "Dive into MS Subbulakshmi's music." },
    'ravi-shankar': { title: 'Playlists by Ravi Shankar', content: "Explore Ravi Shankar's sitar virtuosity." },
    'bismillah-khan': { title: 'Stories of Bismillah Khan', content: "Discover Bismillah Khan's legacy." },
    'kishan-maharaj': { title: 'Stories of Kishan Maharaj', content: "Explore the tabla maestro's life." },
    'amjad-ali-khan': { title: 'Stories of Amjad Ali Khan', content: "Learn about sarod virtuoso Amjad Ali Khan." },
    'vilayat-khan': { title: 'Stories of Vilayat Khan', content: "Dive into Vilayat Khan's sitar legacy." },
    'bhimsen-joshi': { title: 'Stories of Bhimsen Joshi', content: "Explore Bhimsen Joshi's classical music." },
  };

  if (!slug) {
    return <div>Loading...</div>;
  }

  // Get the story based on the slug
  const story = stories[slug as string];

  // If story is not found, display 404 page
  if (!story) {
    return (
      <div className="text-center text-white">
        <h1 className="text-4xl">404 - Story Not Found</h1>
        <p className="mt-4">Sorry, we couldn't find the story you were looking for.</p>
      </div>
    );
  }

  // Render the content of the story
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-yellow-400">{story.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{story.content}</p>
      </div>
    </div>
  );
};

export default StoryPage;
