import { Heart, Share2 } from 'lucide-react';

const DailyLifeSection = () => {
  const mainArticle = {
    title: "The Art of Slow Living: Finding Peace in Our Fast-Paced World",
    excerpt: "In an era of constant connectivity and endless notifications, more people are discovering the transformative power of slowing down. This mindful approach to daily life isn't just about doing less—it's about doing what matters most with intention and presence.",
    author: "Maria Gonzalez",
    role: "Lifestyle Writer",
    readTime: "10 min read",
    date: "December 13, 2024",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "The secret to happiness is not in doing what you love, but in loving what you do with complete attention."
  };

  const secondaryArticle = {
    title: "Urban Gardening: Growing Your Own Food in Small Spaces",
    excerpt: "Transform your balcony, rooftop, or windowsill into a thriving garden that provides fresh produce year-round.",
    author: "Garden Expert",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  const trendingTopics = [
    "# Mindful Living",
    "# Sustainable Fashion", 
    "# Home Wellness",
    "# Digital Detox",
    "# Minimalism"
  ];

  const popularPosts = [
    {
      title: "Morning Rituals That Transform Your Day",
      reads: "2.3k reads",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      title: "Creating the Perfect Work-From-Home Space",
      reads: "1.8k reads", 
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section id="dailylife" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900">Daily Life</h2>
          <div className="ml-4 h-px bg-orange-600 flex-1"></div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <article className="border-l-4 border-secondary bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${mainArticle.imageUrl})` }}
              ></div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <h5 className="font-medium text-gray-900">{mainArticle.author}</h5>
                    <span className="text-sm text-gray-500">{mainArticle.role}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                  {mainArticle.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {mainArticle.excerpt}
                </p>
                <blockquote className="border-l-4 border-orange-600 pl-4 italic text-gray-700 mb-6">
                  "{mainArticle.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {mainArticle.date} • {mainArticle.readTime}
                  </span>
                  <div className="flex space-x-2">
                    <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer" />
                    <Share2 className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
                  </div>
                </div>
              </div>
            </article>
            <article className="border-l-4 border-secondary bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${secondaryArticle.imageUrl})` }}
              ></div>
              <div className="p-6">
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  {secondaryArticle.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {secondaryArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {secondaryArticle.author} • {secondaryArticle.readTime}
                  </span>
                  <div className="flex space-x-1">
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                      Sustainability
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <aside className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-playfair font-semibold text-gray-900 mb-4">
                Trending Topics
              </h4>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {topic}
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-primary text-white p-6 rounded-lg">
              <h4 className="font-playfair font-semibold mb-4">Stay Updated</h4>
              <p className="text-sm mb-4 opacity-90">
                Get the latest stories delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded text-sm border-none"
                />
                <button className="w-full bg-white text-primary px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors rounded-button">
                  Subscribe Now
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-playfair font-semibold text-gray-900 mb-4">
                Popular This Week
              </h4>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <article key={index} className="flex space-x-3">
                    <div
                      className="w-16 h-16 bg-cover bg-center rounded flex-shrink-0"
                      style={{ backgroundImage: `url(${post.imageUrl})` }}
                    ></div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-1">
                        {post.title}
                      </h5>
                      <span className="text-xs text-gray-500">{post.reads}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DailyLifeSection;