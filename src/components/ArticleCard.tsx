'use client';

import Link from 'next/link';
import { User, Clock } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  categoryColor: string;
  imageUrl: string;
  isLive?: boolean;
  liveScore?: string;
  slug?: string;
}

const ArticleCard = ({
  title,
  excerpt,
  author,
  readTime,
  category,
  categoryColor,
  imageUrl,
  isLive = false,
  liveScore,
  slug = '/article'
}: ArticleCardProps) => {
  return (
    <Link href={slug}>
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        {isLive && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            LIVE
          </div>
        )}
        {!isLive && (
          <div className="absolute top-4 left-4">
            <span className={`${categoryColor} text-white  px-2 py-1 text-xs font-medium uppercase tracking-wide rounded`}>
              <small>{category}</small>
            </span>
          </div>
        )}
        {liveScore && (
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded">
            <div className="flex justify-between items-center">
              <span className="font-bold">Lakers 108</span>
              <span className="text-sm">Q4 2:45</span>
              <span className="font-bold">Celtics 112</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-playfair font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-xs text-justify2 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1 ">
            <User className="w-3 h-3" />
            <span><small>{author}</small></span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span><small>{readTime}</small></span>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ArticleCard;