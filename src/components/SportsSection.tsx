import ArticleCard from './ArticleCard';

const SportsSection = () => {
  const sportsArticles = [
    {
      title: "Championship Finals Reach Thrilling Conclusion",
      excerpt: "Historic rivalry renewed as both teams battle for the ultimate prize in professional basketball.",
      author: "Marcus Johnson",
      readTime: "3 min read",
      category: "Basketball",
      categoryColor: "bg-green-600",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isLive: true,
      liveScore: "Lakers 108 - Celtics 112"
    },
    {
      title: "Swimming Records Shattered at International Games",
      excerpt: "Young athletes break multiple world records, setting new standards for aquatic sports excellence.",
      author: "Katie Williams",
      readTime: "5 min read",
      category: "Olympics",
      categoryColor: "bg-blue-600",
      imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Underdog Team Advances to World Cup Semifinals",
      excerpt: "Against all odds, this small nation's soccer team continues their miraculous tournament run.",
      author: "Carlos Rodriguez",
      readTime: "7 min read",
      category: "World Cup",
      categoryColor: "bg-orange-600",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="sports" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900">Sports</h2>
          <div className="ml-4 h-px bg-green-600 flex-1"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportsArticles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              readTime={article.readTime}
              category={article.category}
              categoryColor={article.categoryColor}
              imageUrl={article.imageUrl}
              isLive={article.isLive}
              liveScore={article.liveScore}
              slug="/article"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsSection;