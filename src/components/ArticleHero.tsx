'use client';

import { Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ArticleHeroProps {
  title?: string;
  category?: string;
  categoryColor?: string;
  author?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
  publishDate?: string;
  readTime?: string;
  backgroundImage?: string;
}

const ArticleHero = ({
  title = 'Article Title',
  category = 'General',
  categoryColor = 'bg-blue-500',
  author = {
    name: 'Unknown Author',
    role: 'Author',
    avatar: ''
  },
  publishDate = 'January 1, 2024',
  readTime = '5 min read',
  backgroundImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop'
}: ArticleHeroProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className={`inline-block ${categoryColor} text-white px-4 py-2 text-sm font-medium uppercase tracking-wide rounded`}>
                {category}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-8 leading-tight">
              {title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-200 mb-8">
              <div className="flex items-center space-x-3">
                              <div
                className="w-12 h-12 bg-cover bg-center rounded-full"
                style={{ backgroundImage: author?.avatar ? `url(${author.avatar})` : undefined }}
              ></div>
                                  <div>
                    <span className="font-medium text-lg">{author?.name || 'Unknown Author'}</span>
                                      <div className="text-sm text-gray-300">{author?.role || 'Author'}</div>
                </div>
              </div>
              <span>•</span>
              <span>{publishDate}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLike}
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-opacity-30 transition-all duration-300 flex items-center space-x-2"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-400' : ''}`} />
                <span>Like Article</span>
              </button>
              <button
                onClick={handleShare}
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-opacity-30 transition-all duration-300 flex items-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;