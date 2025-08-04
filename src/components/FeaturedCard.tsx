'use client';

import Link from 'next/link';
import { User, Clock } from 'lucide-react';

interface FeaturedCardProps {
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  imageUrl: string;
  size?: 'small' | 'medium' | 'large';
  slug?: string;
}

const FeaturedCard = ({
  title,
  excerpt,
  author,
  readTime,
  imageUrl,
  size = 'medium',
  slug = '/article'
}: FeaturedCardProps) => {
  const sizeClasses = {
    small: 'flex space-x-4 bg-white p-4 rounded-lg ',
    medium: 'bg-white p-6 rounded-lg ',
    large: 'bg-white p-8 rounded-lg '
  };

  const imageClasses = {
    small: 'w-24 h-24 bg-cover bg-center rounded flex-shrink-0',
    medium: 'h-48 bg-cover bg-center rounded mb-4',
    large: 'h-64 bg-cover bg-center rounded mb-6'
  };

  if (size === 'small') {
    return (
      <Link href={slug}>
        <article className={`${sizeClasses[size]}  cursor-pointer`}>
        <div className={imageClasses[size]} style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className="flex-1">
          <h4 className="font-playfair font-semibold text-gray-900 mb-2">
            {title}
          </h4>
          <p className="text-xs text-gray-600 mb-2">
            {excerpt}
          </p>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span><small>{author}</small></span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span><small>{readTime}</small></span>
            </div>
          </div>
        </div>
      </article>
      </Link>
    );
  }

  return (
    <Link href={slug}>
      <article className={`${sizeClasses[size]}  cursor-pointer`}>
      <div className={imageClasses[size]} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <h3 className={`${size === 'large' ? 'text-xl' : 'text-lg'} font-playfair font-bold text-gray-900 mb-4 leading-tight`}>
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed text-xs">
        {excerpt}
      </p>
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span><small>{author}</small></span>
        </div>
        <span>•</span>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span><small>{readTime}</small></span>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default FeaturedCard;