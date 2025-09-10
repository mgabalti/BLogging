import FeaturedCard from './FeaturedCard';
import { Star } from 'lucide-react';

const EntertainmentSection = () => {
  const mainStory = {
    title: "Hollywood Stars Shine at Annual Awards Ceremony",
    excerpt: "A night of glamour and recognition as the industry's finest gather to celebrate cinematic excellence.",
    author: "Jennifer Adams",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  };

  const sideStories = [
    {
      title: "Streaming Wars Heat Up with New Platform Launch",
      excerpt: "Major tech company enters entertainment market with exclusive content and competitive pricing.",
      author: "Tech Review",
      readTime: "4.2/5",
      imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4.2
    },
   
    {
      title: "Pop Icon Announces World Tour After Five-Year Hiatus",
      excerpt: "Beloved artist returns to the stage with promises of spectacular performances across six continents.",
      author: "Music Reporter",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "Literary Sensation Tops Bestseller Lists Worldwide",
      excerpt: "Debut novel captures hearts and minds, becoming the fastest-selling book of the year.",
      author: "Book Review",
      readTime: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="entertainment" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white">Entertainment</h2>
          <div className="ml-4 h-px bg-purple-600 flex-1"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <article
            className="relative  bg-cover bg-center rounded-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{ backgroundImage: `url(${mainStory.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block bg-purple-600 px-3 py-1 text-sm font-medium uppercase tracking-wide rounded mb-3">
                Red Carpet
              </span>
              <h3 className="text-2xl font-playfair font-bold mb-3">
                {mainStory.title}
              </h3>
              <p className="text-gray-200 mb-3">
                {mainStory.excerpt}
              </p>
              <span className="text-sm text-gray-300">
                {mainStory.author} • {mainStory.readTime}
              </span>
            </div>
          </article>
          <div className="space-y-3">
            {sideStories.map((story, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm cursor-pointer"
              >
                <div className="flex  space-x-4">
                  <div
                    className="w-32 min-w-28 bg-cover bg-center rounded flex-shrink-0"
                    style={{ backgroundImage: `url(${story.imageUrl})` }}
                  ></div>
                  <div className="flex-1">
                    <h4 className="text-base font-playfair font-semibold text-gray-900 dark:text-white mb-2">
                      {story.title}
                    </h4>
                    <p className="text-gray-600 mb-1 text-xs dark:text-gray-400">
                      {story.excerpt}
                    </p>
                    {story.rating ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(story.rating) ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          <small>{story.rating}/5 • {story.author}</small>
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                       <small> {story.author} • {story.readTime}</small>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntertainmentSection;