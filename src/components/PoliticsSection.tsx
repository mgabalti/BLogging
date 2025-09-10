import FeaturedCard from './FeaturedCard';

const PoliticsSection = () => {
  const leadStory = {
    title: "Congressional Leaders Announce Bipartisan Infrastructure Investment Plan",
    excerpt: "A landmark $2.5 trillion infrastructure package gains support from both parties, promising to modernize transportation networks and create millions of jobs across the nation.",
    author: "Alexandra Thompson",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  const sideStories = [
    {
      title: "Senate Passes Historic Voting Rights Legislation",
      excerpt: "New bill aims to protect voting access and strengthen election security nationwide.",
      author: "Robert Martinez",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
   
    {
      title: "Senate Passes Historic Voting Rights Legislation",
      excerpt: "New bill aims to protect voting access and strengthen election security nationwide.",
      author: "Robert Martinez",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "International Trade Agreement Reaches Final Negotiations",
      excerpt: "Multi-nation trade deal promises to boost economic cooperation and reduce tariffs.",
      author: "Lisa Chang",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "Supreme Court Reviews Landmark Privacy Case",
      excerpt: "High court examines digital privacy rights in the age of social media and data collection.",
      author: "David Kim",
      readTime: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="politics" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white ">Politics</h2>
          <div className="ml-4 h-px bg-red-600 flex-1"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="border-l-4 border-primary dark:border-gray-700 relative  bg-white  dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="mb-6 absolute top-10 left-10">
              <span className="bg-red-100 text-red-800 px-3 py-1 text-sm font-medium uppercase tracking-wide rounded">
                Lead Story
              </span>
            </div>
            <FeaturedCard
              title={leadStory.title}
              excerpt={leadStory.excerpt}
              author={leadStory.author}
              readTime={leadStory.readTime}
              imageUrl={leadStory.imageUrl}
              size="large"
              slug="/article"
            />
          </article>
          <div className="gap-3 flex flex-col">
            {sideStories.map((story, index) => (
              <FeaturedCard
                key={index}
                title={story.title}
                excerpt={story.excerpt}
                author={story.author}
                readTime={story.readTime}
                imageUrl={story.imageUrl}
                size="small"
                slug="/article"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoliticsSection;