'use client';

import Link from 'next/link';

export default function RelatedArticles() {
  const relatedArticles = [
    {
      id: 1,
      title: "James Webb Telescope Reveals Unexpected Galaxy Formation in Early Universe",
      excerpt: "Revolutionary observations challenge our understanding of how galaxies formed just 400 million years after the Big Bang.",
      author: "Dr. Lisa Park",
      readTime: "8 min read",
      category: "Space",
      categoryColor: "bg-purple-600",
      image: "https://readdy.ai/api/search-image?query=James%20Webb%20Space%20Telescope%20floating%20in%20deep%20space%20with%20distant%20galaxies%20and%20nebulae%20in%20background%2C%20advanced%20space%20observatory%20technology%2C%20cosmic%20exploration%20scene%20with%20stars&width=400&height=300&seq=related001&orientation=landscape"
    },
    {
      id: 2,
      title: "Artemis Program Prepares for Historic Return to Lunar Surface",
      excerpt: "NASA's ambitious moon program reaches critical milestones as astronauts prepare for humanity's return to lunar exploration.",
      author: "Commander Sarah Mitchell",
      readTime: "10 min read",
      category: "Exploration",
      categoryColor: "bg-blue-600",
      image: "https://readdy.ai/api/search-image?query=SpaceX%20rocket%20launching%20towards%20Moon%20with%20Earth%20visible%20in%20background%2C%20powerful%20engines%20firing%2C%20lunar%20mission%20spacecraft%20in%20dramatic%20space%20scene%2C%20modern%20space%20exploration&width=400&height=300&seq=related002&orientation=landscape"
    },
    {
      id: 3,
      title: "Europa Clipper Mission Targets Jupiter's Ocean Moon for Life Signs",
      excerpt: "Upcoming mission to Europa could reveal whether life exists in the subsurface ocean beneath its icy shell.",
      author: "Dr. Robert Chen",
      readTime: "6 min read",
      category: "Astrobiology",
      categoryColor: "bg-green-600",
      image: "https://readdy.ai/api/search-image?query=Europa%20moon%20surface%20with%20ice%20formations%20and%20Jupiter%20visible%20in%20sky%2C%20subsurface%20ocean%20concept%20with%20scientific%20probe%20exploring%20icy%20terrain%2C%20astrobiology%20research%20scene&width=400&height=300&seq=related003&orientation=landscape"
    }
  ];

  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-12 text-center">
          Related Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {relatedArticles.map((article) => (
            <Link
              key={article.id}
              href="/article"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div
                className="relative h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              >
                <div className="absolute top-4 left-4">
                  <span className={`${article.categoryColor} text-white  px-2 py-1 text-xs font-medium uppercase tracking-wide rounded`}>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-playfair font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow-1 dark:text-gray-400 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:">
                  <span>{article.author}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}