'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Share2, ArrowLeft, ArrowUp, Twitter, Facebook, Linkedin, Bookmark } from 'lucide-react';
import ReadingProgress from '@/components/ReadingProgress';
import BackButton from '@/components/BackButton';
import SocialShare from '@/components/SocialShare';
import ArticleHero from '@/components/ArticleHero';
import AuthorBio from '@/components/AuthorBio';
import RelatedArticles from '@/components/RelatedArticles';

export default function ArticlePage() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = document.title;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50">
      <ReadingProgress />
      
      <BackButton />

      {/* Social Share Sidebar */}
      <div style={{width: '45px'}} className="social-share  hidden lg:flex flex-col space-y-3 fixed left-5 top-1/2 transform -translate-y-1/2 z-40">
        <button
          onClick={() => handleShare('twitter')}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Twitter className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Facebook className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-700" />
        </button>
        <button
          onClick={handleBookmark}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-primary fill-current' : 'text-gray-600'} group-hover:text-primary`} />
        </button>
      </div>

      <article className="bg-white">
        <ArticleHero
          title="NASA's Mars Rover Discovers Organic Compounds That Could Signal Ancient Life"
          category="Science"
          categoryColor="bg-purple-600"
          author={{
            name: "Prof. James Wilson",
            role: "Space Science Correspondent",
            avatar: "https://readdy.ai/api/search-image?query=professional%20scientist%20portrait%20wearing%20lab%20coat%20in%20modern%20laboratory%20setting%2C%20confident%20expression%2C%20clean%20scientific%20background%2C%20academic%20professional%20headshot&width=100&height=100&seq=author001&orientation=squarish"
          }}
          publishDate="December 15, 2024"
          readTime="12 min read"
          backgroundImage="https://readdy.ai/api/search-image?query=dramatic%20Mars%20landscape%20with%20NASA%20rover%20in%20foreground%20exploring%20red%20rocky%20terrain%2C%20distant%20mountains%20and%20rusty%20orange%20sky%2C%20scientific%20equipment%20visible%2C%20space%20exploration%20atmosphere%2C%20high%20detail%20planetary%20surface%20with%20geological%20formations&width=1920&height=1080&seq=mars001&orientation=landscape"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              In a groundbreaking discovery that could reshape our understanding
              of life beyond Earth, NASA's Perseverance rover has detected complex
              organic compounds in Martian rock samples, providing the strongest
              evidence yet that the Red Planet may have once harbored microbial
              life.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The discovery, announced today at a press conference at NASA's Jet
              Propulsion Laboratory in Pasadena, California, represents a
              culmination of nearly three years of meticulous exploration and
              analysis. The organic molecules, found in sedimentary rocks within
              Jezero Crater, are significantly more complex and diverse than any
              previously detected on Mars.
            </p>

            <div className="pull-quote my-8 border-l-4 border-primary pl-6 italic text-xl text-gray-700">
              "This is not just another detection of organic compounds on Mars.
              The complexity and variety of these molecules suggest they could be
              the remnants of ancient biological processes."
            </div>

            <h2 className="text-3xl font-playfair font-bold text-gray-900 mt-12 mb-6">
              The Significance of Organic Compounds
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Organic compounds are molecules that contain carbon and are
              considered the building blocks of life as we know it. While their
              presence doesn't definitively prove the existence of past life, it
              represents a crucial piece of the puzzle in understanding Mars'
              potential habitability billions of years ago.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 my-8">
              <div className="flex items-start space-x-4">
                <div
                  className="w-16 h-16 bg-cover bg-center rounded-full flex-shrink-0"
                  style={{ backgroundImage: "url('https://readdy.ai/api/search-image?query=NASA%20scientist%20in%20mission%20control%20room%20analyzing%20Mars%20data%20on%20multiple%20computer%20screens%2C%20professional%20space%20agency%20environment%2C%20technical%20equipment%20and%20displays&width=100&height=100&seq=expert001&orientation=squarish')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Dr. Sarah Chen, Lead Astrobiologist
                  </h4>
                  <p className="text-gray-700 italic">
                    "The diversity of organic molecules we've found is remarkable.
                    We're seeing aromatic compounds, aliphatic chains, and even
                    some sulfur-bearing organics that could indicate biological
                    processes. This is exactly what we'd hope to find if life once
                    existed on Mars."
                  </p>
                </div>
              </div>
            </div>

            <div className="my-12">
              <img
                src="https://readdy.ai/api/search-image?query=detailed%20Mars%20rock%20sample%20analysis%20showing%20microscopic%20organic%20compounds%20structure%2C%20scientific%20laboratory%20equipment%20examining%20Martian%20geology%2C%20high%20tech%20spectroscopy%20analysis%20with%20colorful%20molecular%20diagrams&width=800&height=500&seq=analysis001&orientation=landscape"
                alt="Mars rock sample analysis"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">
                Spectroscopic analysis reveals complex organic compounds within
                Martian rock samples collected by Perseverance rover
              </p>
            </div>

            <h2 className="text-3xl font-playfair font-bold text-gray-900 mt-12 mb-6">
              Revolutionary Detection Methods
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The breakthrough came through the use of Perseverance's advanced
              SHERLOC (Scanning Habitable Environments with Raman & Luminescence
              for Organics & Chemicals) instrument, which uses ultraviolet laser
              spectroscopy to identify organic compounds at the molecular level.
              This technology allows scientists to detect and analyze organic
              materials without destroying the samples.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              What makes this discovery particularly exciting is the location
              where these compounds were found. Jezero Crater was once a lake bed,
              fed by rivers that carried sediments rich in minerals and
              potentially organic materials from across the Martian landscape. The
              preservation of these compounds in sedimentary rocks suggests they
              were protected from the harsh radiation and oxidizing conditions
              that characterize Mars' surface today.
            </p>

            <div className="expert-quote rounded-lg p-6 my-8 bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-secondary">
              <div className="flex items-start space-x-4">
                <div
                  className="w-16 h-16 bg-cover bg-center rounded-full flex-shrink-0"
                  style={{ backgroundImage: "url('https://readdy.ai/api/search-image?query=senior%20NASA%20mission%20director%20in%20professional%20suit%20standing%20in%20front%20of%20Mars%20mission%20displays%2C%20confident%20leadership%20pose%2C%20space%20agency%20headquarters%20background&width=100&height=100&seq=expert002&orientation=squarish')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Dr. Michael Rodriguez, Mars Sample Return Mission Director
                  </h4>
                  <p className="text-gray-700">
                    "These findings validate our decision to target Jezero Crater.
                    The ancient lake environment provided ideal conditions for
                    preserving organic materials that could tell us about Mars'
                    past habitability. We're now more confident than ever that the
                    samples we're collecting will provide definitive answers about
                    life on Mars."
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-playfair font-bold text-gray-900 mt-12 mb-6">
              Implications for Future Exploration
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The discovery has profound implications for NASA's Mars Sample
              Return mission, scheduled to launch in the late 2020s. The mission
              will bring Martian rock samples back to Earth for detailed analysis
              in terrestrial laboratories, where scientists can use more
              sophisticated instruments to determine whether the organic compounds
              are truly biological in origin.
            </p>

            <div className="my-12">
              <img
                src="https://readdy.ai/api/search-image?query=futuristic%20Mars%20sample%20return%20spacecraft%20launching%20from%20Martian%20surface%20with%20collected%20rock%20samples%2C%20advanced%20space%20technology%20against%20red%20planet%20landscape%2C%20scientific%20mission%20concept&width=800&height=500&seq=future001&orientation=landscape"
                alt="Mars Sample Return Mission concept"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">
                Artist's concept of the Mars Sample Return mission that will bring
                Perseverance's samples back to Earth for detailed analysis
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              The complexity of the organic molecules detected suggests that if
              life did exist on ancient Mars, it may have been more sophisticated
              than simple microbes. Some of the compounds identified are similar
              to those produced by certain types of bacteria on Earth that thrive
              in extreme environments.
            </p>

            <div className="pull-quote my-8 border-l-4 border-primary pl-6 italic text-xl text-gray-700">
              "We're not just looking for signs that life could have existed on
              Mars – we're finding evidence that suggests it may have been
              thriving in ways we're only beginning to understand."
            </div>

            <h2 className="text-3xl font-playfair font-bold text-gray-900 mt-12 mb-6">
              The Search Continues
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              While this discovery represents a major milestone in astrobiology,
              scientists emphasize that definitive proof of past life on Mars will
              require additional evidence. The organic compounds could potentially
              have non-biological origins, formed through geological processes or
              delivered to Mars by meteorites.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              However, the combination of complex organic molecules, their
              location in ancient lake sediments, and the presence of minerals
              that form in water-rich environments creates a compelling case for
              Mars' past habitability. Future missions will continue to search for
              additional biosignatures, including fossilized microorganisms or
              isotopic signatures that could provide more direct evidence of
              ancient life.
            </p>

            <div className="bg-primary bg-opacity-5 rounded-lg p-8 my-12">
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                Key Findings Summary
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complex organic compounds detected in multiple rock samples from Jezero Crater</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Molecules include aromatic and aliphatic compounds similar to those produced by Earth microbes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Preservation in ancient lake sediments suggests protected environment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Findings support targeting of samples for Mars Sample Return mission</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">
              As humanity continues its quest to answer one of the most profound
              questions in science – are we alone in the universe? – this
              discovery brings us one step closer to understanding our place in
              the cosmos. Whether or not these organic compounds represent
              evidence of ancient Martian life, they demonstrate that Mars was
              once a world capable of supporting the chemistry of life, opening
              new possibilities for future exploration and the search for life
              beyond Earth.
            </p>
          </div>

          <AuthorBio
            author={{
              name: "Prof. James Wilson",
              role: "Space Science Correspondent",
              bio: "Space Science Correspondent with 15 years covering NASA missions and astrobiology research. PhD in Planetary Science from MIT.",
              avatar: "https://readdy.ai/api/search-image?query=professional%20scientist%20portrait%20wearing%20lab%20coat%20in%20modern%20laboratory%20setting%2C%20confident%20expression%2C%20clean%20scientific%20background%2C%20academic%20professional%20headshot&width=100&height=100&seq=author001&orientation=squarish"
            }}
          />
        </div>
      </article>

      <RelatedArticles />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 fixed bottom-8 right-8 z-50 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
} 