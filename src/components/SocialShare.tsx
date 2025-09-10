'use client';

import { Twitter, Facebook, Linkedin, Bookmark,  } from 'lucide-react';
import { useState } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import XIcon from '@mui/icons-material/X';
import { IconButton } from '@mui/material';
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
      <IconButton
        onClick={shareOnTwitter}
        className="bg-white w-12 h-12 flex items-cente justify-center dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <XIcon style={{width:'19px'}} className="w-5 h-5 text-gray-600  dark:group-hover:text-blue-300 dark:text-white  group-hover:text-blue-500" />
      </IconButton>
      <IconButton
        onClick={shareOnFacebook}
        className="bg-white w-12 h-12 flex items-cente justify-center dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Facebook style={{width:'19px'}} className="=  dark:group-hover:text-blue-300 dark:text-white dark:bg-gray-700 text-gray-600 group-hover:text-blue-600" />
      </IconButton>
      <IconButton
        onClick={shareOnLinkedIn}
        className="bg-white w-12 h-12 flex items-cente justify-center dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Linkedin style={{width:'19px'}} className=" dark:group-hover:text-blue-300 dark:text-white text-gray-600 group-hover:text-blue-700" />
      </IconButton>
      <IconButton
        onClick={toggleBookmark}
        className="bg-white w-12 h-12 flex items-cente justify-center dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Bookmark style={{width:'19px'}} className={`  dark:group-hover:text-blue-300 dark:text-white transition-colors ${isBookmarked ? 'text-primary fill-current' : 'text-gray-600 group-hover:text-primary'}`} />
      </IconButton>
    </div>
  );
};

export default SocialShare;