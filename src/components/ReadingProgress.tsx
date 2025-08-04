'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleHeight = article.offsetHeight;
      const articleTop = article.offsetTop;
      const scrollTop = window.pageYOffset;
      
      const scrolled = ((scrollTop - articleTop) / (articleHeight - window.innerHeight)) * 100;
      const progress = Math.min(Math.max(scrolled, 0), 100);
      
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="reading-progress fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  );
}