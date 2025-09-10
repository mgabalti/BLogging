'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import SocialShare from './SocialShare';

interface AuthorBioProps {
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    followers?: number;
    following?: number;
  };
}

const AuthorBio = ({ author = {
  name: 'Unknown Author',
  role: 'Writer',
  bio: 'No bio available',
  avatar: '',
  followers: 0,
  following: 0
} }: AuthorBioProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
                        <div
                className="w-16 h-16 bg-cover bg-center rounded-full"
                style={{ backgroundImage: author?.avatar ? `url(${author.avatar})` : undefined }}
              ></div>
          <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{author?.name || 'Unknown Author'}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{author?.bio || 'No bio available'}</p>
            <button
              onClick={toggleFollow}
              className={`mt-2 font-medium flex items-center space-x-1 transition-colors ${
                isFollowing 
                  ? 'text-gray-600 hover:text-gray-800' 
                  : 'text-primary hover:text-primary/80 dark:text-gray-400'
              }`}
            >
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
              {!isFollowing && <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <SocialShare className="hidden md:flex md:flex-row md:space-y-0 md:space-x-4" />
      </div>
    </div>
  );
};

export default AuthorBio;