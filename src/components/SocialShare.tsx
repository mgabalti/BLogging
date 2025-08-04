'use client';

import { Twitter, Facebook, Linkedin, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  className?: string;
}

const SocialShare = ({ className = '' }: SocialShareProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const shareOnTwitter = () => {
    const url = window.location.href;
    const title = document.title;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <button
        onClick={shareOnTwitter}
        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Twitter className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
      </button>
      <button
        onClick={shareOnFacebook}
        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Facebook className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-700" />
      </button>
      <button
        onClick={toggleBookmark}
        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Bookmark className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-primary fill-current' : 'text-gray-600 group-hover:text-primary'}`} />
      </button>
    </div>
  );
};

export default SocialShare;