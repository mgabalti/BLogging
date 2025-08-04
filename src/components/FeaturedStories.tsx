import ArticleCard from './ArticleCard';

const FeaturedStories = () => {
  const featuredArticles = [
    {
      title: "AI Revolution Transforms Healthcare Industry Worldwide",
      excerpt: "Breakthrough artificial intelligence applications are revolutionizing patient care and medical diagnosis across major hospitals globally.",
      author: "Dr. Michael Chen",
      readTime: "5 min read",
      category: "Technology",
      categoryColor: "bg-blue-600",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Renewable Energy Reaches New Milestone in Global Adoption",
      excerpt: "Solar and wind power now account for 40% of global electricity generation, surpassing all previous sustainability targets.",
      author: "Emma Rodriguez",
      readTime: "6 min read",
      category: "Environment",
      categoryColor: "bg-green-600",
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Space Exploration Mission Discovers Potential Life Signs",
      excerpt: "NASA's latest Mars rover mission has identified organic compounds that could indicate past or present microbial life on the red planet.",
      author: "Prof. James Wilson",
      readTime: "7 min read",
      category: "Science",
      categoryColor: "bg-purple-600",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
   
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-12 text-center">
          Featured Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {featuredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              readTime={article.readTime}
              category={article.category}
              categoryColor={article.categoryColor}
              imageUrl={article.imageUrl}
              slug="/article"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;