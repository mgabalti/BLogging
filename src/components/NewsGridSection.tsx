'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NewsItem {
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  isLive?: boolean;
}

const NewsGridSection = () => {
  // Hover states for pausing carousels
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [isTopSmallHovered, setIsTopSmallHovered] = useState(false);
  const [isBottomSmallHovered, setIsBottomSmallHovered] = useState(false);
  const [isMediumHovered, setIsMediumHovered] = useState(false);

  // Main featured news carousel
  const [mainSlide, setMainSlide] = useState(0);
  const mainNews = [
    {
      title: "SECURITY COUNCIL LIVE: Meeting on the situation in Ukraine",
      description: "The UN Security Council meets Thursday morning to discuss threats to international peace and security, with a focus on the situation in Ukraine. The meeting was requested by Russia. Follow our live updates as UN News, in coordination with UN Meetings Coverage, brings you key highlights and takeaways from today's session. UN News App users can follow the coverage here.",
      imageUrl: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      isLive: true
    },
    {
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
      description: "World leaders unite in unprecedented commitment to reduce global carbon emissions by 50% within the next decade, marking a pivotal moment in environmental policy. The agreement includes binding targets for major economies.",
      imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Breaking: International Trade Agreement Signed by 15 Nations",
      description: "A landmark trade agreement covering digital commerce, environmental standards, and labor rights has been signed by 15 nations, potentially reshaping global economic relationships for the next decade.",
      imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Top small news carousel
  const [topSmallSlide, setTopSmallSlide] = useState(0);
  const topSmallNews = [
    {
      title: "On brink of famine, Gazans forced to scour dirt for food",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Emergency humanitarian aid reaches conflict zones",
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "International Red Cross expands relief operations",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Bottom small news carousel (for the yellow/political news)
  const [bottomSmallSlide, setBottomSmallSlide] = useState(0);
  const bottomSmallNews = [
    {
      title: "With Gaza smouldering, ministers renew push for two-State solution at UN",
      imageUrl: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Diplomatic efforts intensify for Middle East peace talks",
      imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "UN mediators propose new framework for regional stability",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Medium news carousel
  const [mediumSlide, setMediumSlide] = useState(0);
  const mediumNews = [
    {
      title: "World News in brief: Violence in Somalia, cholera in Haiti, tax support for sustainable development",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Global health initiative launches new vaccination program in developing nations",
      imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Economic recovery programs show promising results across multiple continents",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Auto-advance effects for each carousel with pause on hover
  useEffect(() => {
    const mainTimer = setInterval(() => {
      if (!isMainHovered) {
        setMainSlide((prev) => (prev + 1) % mainNews.length);
      }
    }, 5000);

    return () => clearInterval(mainTimer);
  }, [isMainHovered, mainNews.length]);

  useEffect(() => {
    const topTimer = setInterval(() => {
      if (!isTopSmallHovered) {
        setTopSmallSlide((prev) => (prev + 1) % topSmallNews.length);
      }
    }, 4000);

    return () => clearInterval(topTimer);
  }, [isTopSmallHovered, topSmallNews.length]);

  useEffect(() => {
    const bottomTimer = setInterval(() => {
      if (!isBottomSmallHovered) {
        setBottomSmallSlide((prev) => (prev + 1) % bottomSmallNews.length);
      }
    }, 4500);

    return () => clearInterval(bottomTimer);
  }, [isBottomSmallHovered, bottomSmallNews.length]);

  useEffect(() => {
    const mediumTimer = setInterval(() => {
      if (!isMediumHovered) {
        setMediumSlide((prev) => (prev + 1) % mediumNews.length);
      }
    }, 3500);

    return () => clearInterval(mediumTimer);
  }, [isMediumHovered, mediumNews.length]);

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Main Featured News - Left Side */}
          <div
            className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-lg"
            onMouseEnter={() => setIsMainHovered(true)}
            onMouseLeave={() => setIsMainHovered(false)}
          >
            <div className="relative w-full h-full">
              {mainNews.map((news, index) => (
                <Link key={index} href="/article">
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out cursor-pointer ${index === mainSlide
                        ? 'translate-x-0 opacity-100'
                        : index === (mainSlide - 1 + mainNews.length) % mainNews.length
                          ? '-translate-x-full opacity-0'
                          : 'translate-x-full opacity-0'
                      }`}
                    style={{
                      backgroundImage: `url('${news.imageUrl}')`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    {news.isLive && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                        LIVE
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 leading-tight">
                        {news.title}
                      </h2>
                      <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                        {news.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Main carousel indicators */}
            <div className="absolute bottom-4 left-6 flex space-x-2 z-20">
              {mainNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setMainSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === mainSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Three Sections */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            {/* Top Two Small News */}
            <div className="grid grid-cols-2 gap-4 h-1/2">
              {/* Top Small News 1 */}
              <div
                className="relative overflow-hidden rounded-lg"
                onMouseEnter={() => setIsTopSmallHovered(true)}
                onMouseLeave={() => setIsTopSmallHovered(false)}
              >
                <div className="relative w-full h-full">
                  {topSmallNews.map((news, index) => (
                    <Link key={index} href="/article">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out cursor-pointer ${index === topSmallSlide
                            ? 'translate-x-0 opacity-100'
                            : index === (topSmallSlide - 1 + topSmallNews.length) % topSmallNews.length
                              ? '-translate-x-full opacity-0'
                              : 'translate-x-full opacity-0'
                          }`}
                        style={{
                          backgroundImage: `url('${news.imageUrl}')`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white text-sm font-playfair font-semibold leading-tight">
                            {news.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Top small carousel indicators */}
                <div className="absolute bottom-2 left-4 flex space-x-1 z-20">
                  {topSmallNews.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${index === topSmallSlide ? 'bg-white' : 'bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Top Small News 2 - Yellow/Political */}
              <div
                className="relative overflow-hidden rounded-lg"
                onMouseEnter={() => setIsBottomSmallHovered(true)}
                onMouseLeave={() => setIsBottomSmallHovered(false)}
              >
                <div className="relative w-full h-full">
                  {bottomSmallNews.map((news, index) => (
                    <Link key={index} href="/article">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out cursor-pointer ${index === bottomSmallSlide
                            ? 'translate-x-0 opacity-100'
                            : index === (bottomSmallSlide - 1 + bottomSmallNews.length) % bottomSmallNews.length
                              ? '-translate-x-full opacity-0'
                              : 'translate-x-full opacity-0'
                          }`}
                        style={{
                          backgroundImage: `url('${news.imageUrl}')`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-700/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white text-sm font-playfair font-semibold leading-tight">
                            {news.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom small carousel indicators */}
                <div className="absolute bottom-2 left-4 flex space-x-1 z-20">
                  {bottomSmallNews.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${index === bottomSmallSlide ? 'bg-white' : 'bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Medium News */}
            <div
              className="h-1/2 relative overflow-hidden rounded-lg"
              onMouseEnter={() => setIsMediumHovered(true)}
              onMouseLeave={() => setIsMediumHovered(false)}
            >
              <div className="relative w-full h-full">
                {mediumNews.map((news, index) => (
                  <Link key={index} href="/article">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out cursor-pointer ${index === mediumSlide
                          ? 'translate-x-0 opacity-100'
                          : index === (mediumSlide - 1 + mediumNews.length) % mediumNews.length
                            ? '-translate-x-full opacity-0'
                            : 'translate-x-full opacity-0'
                        }`}
                      style={{
                        backgroundImage: `url('${news.imageUrl}')`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-lg md:text-xl font-playfair font-bold leading-tight">
                          {news.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Medium carousel indicators */}
              <div className="absolute bottom-4 left-6 flex space-x-2 z-20">
                {mediumNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setMediumSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === mediumSlide ? 'bg-white' : 'bg-white/40'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsGridSection;