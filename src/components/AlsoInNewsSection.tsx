'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';

interface NewsItem {
    title: string;
    excerpt: string;
    imageUrl: string;
    timeAgo: string;
    location: string;
    slug?: string;
    featured?: boolean;
}

const AlsoInNewsSection = () => {
    const newsItems: NewsItem[] = [
        {
            title: "Kamala Harris rules out running for California governor",
            excerpt: "For now, my leadership - and public service - will not be in elected office, the former vice-president said in a statement.",
            imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            timeAgo: "9 hrs ago",
            location: "US & Canada",
            slug: "/article",
            featured: true
        },
        {
            title: "Hotel tycoon reveals Heathrow expansion proposal",
            excerpt: "Arora Group says a shorter runway will avoid the cost and disruption of diverting the M25 motorway.",
            imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            timeAgo: "3 hrs ago",
            location: "London",
            slug: "/article"
        },
        {
            title: "Why Australians celebrate Christmas twice a year",
            excerpt: "The Australian tradition was born in the 1980s after a group of Irishmen became homesick for a winter Christmas.",
            imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            timeAgo: "6 hrs ago",
            location: "Australia",
            slug: "/article"
        },
        {
            title: "Wednesday fame was overwhelming, says Jenna Ortega",
            excerpt: "The 22-year-old said she didn't know if anyone would watch the Netflix series about Wednesday Addams.",
            imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            timeAgo: "5 hrs ago",
            location: "Culture",
            slug: "/article"
        },
        {
            title: "France-Spain flight row over Jewish teens escalates",
            excerpt: "Aurore Bergé and Benjamin Haddad condemn remarks by Spain's transport minister as a diplomatic spat continues.",
            imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            timeAgo: "5 hrs ago",
            location: "Europe",
            slug: "/article"
        },
        {
            title: "Japan's Fukushima plant workers evacuate after tsunami warning",
            excerpt: "Wednesday's tsunami warning is bringing back memories of one of the world's worst nuclear disasters.",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            timeAgo: "19 hrs ago",
            location: "Asia",
            slug: "/article"
        },
        {
            title: "Air India watchdog audit reveals 51 safety violations",
            excerpt: "India's aviation regulator details safety lapses at Air India amid scrutiny after last month's deadly crash.",
            imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            timeAgo: "15 hrs ago",
            location: "Asia",
            slug: "/article"
        }
    ];

    const featuredItem = newsItems.find(item => item.featured);
    const regularItems = newsItems.filter(item => !item.featured);
    const rightColumnItems = regularItems.slice(0, 2);
    const bottomRowItems = regularItems.slice(3);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-12 border-b-2 border-gray-200 pb-4">
                    ALSO IN NEWS
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Featured Story - Left Column */}
                    {featuredItem && (
                        <div className="lg:col-span-2">
                            <Link href={featuredItem.slug || '/article'}>
                                <article className="group cursor-pointer flex flex-row-reverse gap-5">
                                    <div className="relative w-1/2 h-64 md:h-64 mb-4 overflow-hidden rounded-lg">
                                        <img
                                            src={featuredItem.imageUrl}
                                            alt={featuredItem.title}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                                            {featuredItem.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                            {featuredItem.excerpt}
                                        </p>
                                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{featuredItem.timeAgo}</span>
                                            <span>|</span>
                                            <span>{featuredItem.location}</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {bottomRowItems.map((item, index) => (
                                    <Link key={index} href={item.slug || '/article'}>
                                        <article className="group cursor-pointer">
                                            <div className="relative h-32 mb-3 overflow-hidden rounded-lg">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <h4 className="text-base font-playfair font-semibold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                {item.excerpt}
                                            </p>
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <small className='flex items-center gap-3'>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{item.timeAgo}</span>
                                                    </span>
                                                    <span>|</span>
                                                    <span>{item.location}</span>
                                                </small>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>


                        </div>
                    )}

                    {/* Right Column - Smaller Stories */}
                    <div className="space-y-6">
                        {rightColumnItems.map((item, index) => (
                            index == 0 && <Link key={index} href={item.slug || '/article'}>
                                <article className="group cursor-pointer">
                                    <div className="relative h-32 mb-3 overflow-hidden rounded-lg">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h4 className="text-lg font-playfair font-semibold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                        {item.excerpt}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                        <small className='flex items-center gap-3'>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{item.timeAgo}</span>
                                            </span>
                                            <span>|</span>
                                            <span>{item.location}</span>
                                        </small>
                                    </div>
                                </article>
                            </Link>
                        ))}
                        {rightColumnItems.map((item, index) => (
                            <Link key={index} href={item.slug || '/article'} className='mt-4 block'>
                                <article className="group cursor-pointer">

                                    <h4 className="text-lg font-playfair font-semibold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                        {item.excerpt}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                                        <small className='flex items-center gap-3'>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{item.timeAgo}</span>
                                            </span>
                                            <span>|</span>
                                            <span>{item.location}</span>
                                        </small>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Row - Additional Stories */}

            </div>
        </section>
    );
};

export default AlsoInNewsSection;