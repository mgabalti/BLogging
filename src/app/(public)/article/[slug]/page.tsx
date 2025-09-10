import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { apiService } from '@/services/api';
import { ArticleJsonLd } from '@/components/SEO/JsonLd';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    // Fetch article data based on ID (using slug as ID for now)
    const article = await apiService.getPost(params.slug);
    
    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      };
    }

    const articleUrl = `https://newshub.com/article/${params.slug}`;
    const articleImage = article.featuredImage?.imageLink || '/default-article-image.jpg';

    return {
      title: `${article.title} - NewsHub`,
      description: `Read the latest news about ${article.title}. Get in-depth coverage and analysis from trusted sources.`,
      keywords: `${article.title}, news, ${article.category?.name || 'general'}, current events, breaking news`,
      authors: [{ name: article.authorName || 'NewsHub Team' }],
      creator: article.authorName || 'NewsHub',
      publisher: 'NewsHub',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://newshub.com'),
      alternates: {
        canonical: `/article/${params.slug}`,
      },
      openGraph: {
        title: article.title,
        description: `Read the latest news about ${article.title}.`,
        url: articleUrl,
        siteName: 'NewsHub',
        images: [
          {
            url: articleImage,
            width: 1200,
            height: 630,
            alt: article.title,
            type: 'image/jpeg',
          },
          {
            url: articleImage,
            width: 600,
            height: 600,
            alt: article.title,
            type: 'image/jpeg',
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: article.createdAt,
        modifiedTime: article.updatedAt,
        authors: [article.authorName || 'NewsHub Team'],
        section: article.category?.name || 'General',
        tags: article.tags?.map((tag: any) => tag.name) || [],
        countryName: 'United States',
        emails: ['contact@newshub.com'],
        phoneNumbers: ['+1-555-123-4567'],
        faxNumbers: ['+1-555-123-4568'],
        ttl: 86400, // 24 hours
        audio: article.featuredImage?.imageLink ? [
          {
            url: `${articleUrl}/audio`,
            type: 'audio/mpeg',
          }
        ] : undefined,
        videos: article.featuredImage?.imageLink ? [
          {
            url: `${articleUrl}/video`,
            width: 1280,
            height: 720,
            type: 'video/mp4',
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: `Read the latest news about ${article.title}.`,
        images: [articleImage],
        creator: '@newshub',
        site: '@newshub',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      category: 'news',
      other: {
        'article:published_time': article.createdAt,
        'article:modified_time': article.updatedAt,
        'article:author': article.authorName || 'NewsHub Team',
        'article:section': article.category?.name || 'General',
        'article:tag': article.tags?.map((tag: any) => tag.name).join(', ') || '',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article - NewsHub',
      description: 'Read the latest news and breaking stories.',
    };
  }
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  try {
    // Fetch all article IDs for static generation
    const articles = await apiService.getPosts(1, 100);
    
    return articles.items.map((article) => ({
      slug: article.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    // Fetch article data
    const article = await apiService.getPost(params.slug);
    
    if (!article) {
      notFound();
    }

    return (
      <div className="bg-gray-50">
        {/* JSON-LD Structured Data */}
        <ArticleJsonLd
          title={article.title}
          description={`Read the latest news about ${article.title}.`}
          url={`https://newshub.com/article/${params.slug}`}
          image={article.featuredImage?.imageLink}
          author={{
            name: article.authorName || 'NewsHub Team',
          }}
          publisher={{
            name: 'NewsHub',
            logo: 'https://newshub.com/logo.png',
          }}
          datePublished={article.createdAt}
          dateModified={article.updatedAt}
          category={article.category?.name}
          tags={article.tags?.map((tag: any) => tag.name)}
        />
        
        {/* Article content will be rendered here */}
        <article className="bg-white max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="text-gray-600 mb-6">
            <p>By {article.authorName || 'NewsHub Team'}</p>
            <p>{new Date(article.createdAt).toLocaleDateString()}</p>
          </div>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
} 