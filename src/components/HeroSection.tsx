'use client';

import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mainSlide, setMainSlide] = useState(0);
  const [topSlide, setTopSlide] = useState(0);
  const [bottomSlide, setBottomSlide] = useState(0);

  // Main articles data
  const mainArticles = [
    {
      category: 'COVID-19',
      categoryColor: 'bg-red-600',
      title: 'Global solidarity to fight COVID-19, and indonesia stay safe and health',
      author: 'David Hall',
      date: 'December 09, 2020',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'TECHNOLOGY',
      categoryColor: 'bg-blue-600',
      title: 'AI Revolution Transforms Healthcare Industry Worldwide',
      author: 'Dr. Michael Chen',
      date: 'December 15, 2024',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'SPORTS',
      categoryColor: 'bg-green-600',
      title: 'Championship Finals Reach Thrilling Conclusion',
      author: 'Marcus Johnson',
      date: 'December 12, 2024',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      category: 'ENVIRONMENT',
      categoryColor: 'bg-emerald-600',
      title: 'Climate Change Summit Reaches Historic Global Agreement',
      author: 'Sarah Mitchell',
      date: 'December 16, 2024',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Top secondary articles data
  const topSecondaryArticles = [
    {
      category: 'POLITICS',
      categoryColor: 'bg-red-600',
      title: 'Barack Obama and Family Visit borobudur temple enjoy holiday indonesia.',
      author: 'David Hall',
      date: 'December 09, 2020',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      category: 'SCIENCE',
      categoryColor: 'bg-purple-600',
      title: 'Space Exploration Mission Discovers Potential Life Signs',
      author: 'Prof. James Wilson',
      date: 'December 14, 2024',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      category: 'OLYMPICS',
      categoryColor: 'bg-blue-600',
      title: 'Swimming Records Shattered at International Games',
      author: 'Katie Williams',
      date: 'December 11, 2024',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      category: 'BUSINESS',
      categoryColor: 'bg-indigo-600',
      title: 'Global Markets Reach All-Time High After Economic Recovery',
      author: 'Financial Reporter',
      date: 'December 13, 2024',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Bottom secondary articles data
  const bottomSecondaryArticles = [
    {
      category: 'POLITICS',
      categoryColor: 'bg-red-600',
      title: 'A classic and sturdy building with history.',
      author: 'David Hall',
      date: 'December 09, 2020',
      image: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      category: 'ENVIRONMENT',
      categoryColor: 'bg-green-600',
      title: 'Renewable Energy Reaches New Milestone in Global Adoption',
      author: 'Emma Rodriguez',
      date: 'December 13, 2024',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      category: 'WORLD CUP',
      categoryColor: 'bg-orange-600',
      title: 'Underdog Team Advances to World Cup Semifinals',
      author: 'Carlos Rodriguez',
      date: 'December 10, 2024',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      category: 'CULTURE',
      categoryColor: 'bg-pink-600',
      title: 'Ancient Art Exhibition Breaks Museum Attendance Records',
      author: 'Art Curator',
      date: 'December 15, 2024',
      image: 'https://images.unsplash.com/photo-1544967882-6abf0fbe1d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Auto-advance functions for each slider
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setMainSlide((prev) => (prev + 1) % mainArticles.length);
    }, 4000); // Main slides every 4 seconds

    const topTimer = setInterval(() => {
      setTopSlide((prev) => (prev + 1) % topSecondaryArticles.length);
    }, 3500); // Top secondary slides every 3.5 seconds

    const bottomTimer = setInterval(() => {
      setBottomSlide((prev) => (prev + 1) % bottomSecondaryArticles.length);
    }, 4500); // Bottom secondary slides every 4.5 seconds

    return () => {
      clearInterval(mainTimer);
      clearInterval(topTimer);
      clearInterval(bottomTimer);
    };
  }, []);



  return (
    <section className="relative h-screen bg-gray-900" style={{height: '80vh'}}>
      {/* Main Hero Article */}
      <div className="absolute inset-0 flex">
        {/* Left side - Main Article */}
        <div className="w-2/3 relative overflow-hidden">
          <div className="relative w-full h-full">
            {mainArticles.map((article, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                  index === mainSlide 
                    ? 'translate-x-0 opacity-100' 
                    : index === (mainSlide - 1 + mainArticles.length) % mainArticles.length
                      ? '-translate-x-full opacity-0'
                      : 'translate-x-full opacity-0'
                }`}
                style={{
                  backgroundImage: `url('${article.image}')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                <div className="relative z-10 h-full flex items-end">
                  <div className="p-12 pb-16">
                    <div className="mb-4">
                      <span className={`inline-block ${article.categoryColor} text-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded`}>
                        {article.category}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 leading-tight max-w-4xl">
                      {article.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <span className="font-poppins">By {article.author}</span>
                      <span>•</span>
                      <span className="font-poppins">{article.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Main Article Progress Indicators */}
          <div className="absolute top-4 left-4 flex space-x-1 z-20">
            {mainArticles.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  index === mainSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Secondary Articles */}
        <div className="w-1/3 flex flex-col">
          {/* Top Article */}
          <div className="h-1/2 relative overflow-hidden">
            <div className="relative w-full h-full">
              {topSecondaryArticles.map((article, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                    index === topSlide 
                      ? 'translate-x-0 opacity-100' 
                      : index === (topSlide - 1 + topSecondaryArticles.length) % topSecondaryArticles.length
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url('${article.image}')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="relative z-10 h-full flex items-end">
                    <div className="p-8 pb-6">
                      <div className="mb-3">
                        <span className={`inline-block ${article.categoryColor} text-white px-2 py-1 text-xs font-medium uppercase tracking-wide rounded`}>
                          {article.category}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-playfair font-bold text-white mb-3 leading-tight">
                        {article.title}
                      </h2>
                      <div className="flex items-center space-x-3 text-gray-300 text-sm">
                        <span className="font-poppins">By {article.author}</span>
                        <span>•</span>
                        <span className="font-poppins">{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Top Article Progress Indicators */}
            <div className="absolute top-4 right-4 flex space-x-1 z-20">
              {topSecondaryArticles.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-1 rounded-full transition-all duration-300 ${
                    index === topSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Article */}
          <div className="h-1/2 relative overflow-hidden">
            <div className="relative w-full h-full">
              {bottomSecondaryArticles.map((article, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                    index === bottomSlide 
                      ? 'translate-x-0 opacity-100' 
                      : index === (bottomSlide - 1 + bottomSecondaryArticles.length) % bottomSecondaryArticles.length
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url('${article.image}')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="relative z-10 h-full flex items-end">
                    <div className="p-8 pb-6">
                      <div className="mb-3">
                        <span className={`inline-block ${article.categoryColor} text-white px-2 py-1 text-xs font-medium uppercase tracking-wide rounded`}>
                          {article.category}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-playfair font-bold text-white mb-3 leading-tight">
                        {article.title}
                      </h2>
                      <div className="flex items-center space-x-3 text-gray-300 text-sm">
                        <span className="font-poppins">By {article.author}</span>
                        <span>•</span>
                        <span className="font-poppins">{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Article Progress Indicators */}
            <div className="absolute bottom-4 right-4 flex space-x-1 z-20">
              {bottomSecondaryArticles.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-1 rounded-full transition-all duration-300 ${
                    index === bottomSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20">
        <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="flex items-center space-x-3 text-white text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Main</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Top</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>Bottom</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;