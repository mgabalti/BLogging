import { MetadataRoute } from 'next';
import { apiService } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://newshub.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  try {
    // Fetch all published articles
    const articles = await apiService.getPosts({ 
      page: 1, 
      pageSize: 1000, // Get all articles for sitemap
      isPublished: true 
    });

    const articlePages = articles.items.map((article) => ({
      url: `${baseUrl}/article/${article.slug || article.id}`,
      lastModified: new Date(article.updatedAt || article.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...staticPages, ...articlePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
} 