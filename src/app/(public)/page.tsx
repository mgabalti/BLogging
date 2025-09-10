import { Metadata } from 'next';
import NewsGridSection from '@/components/NewsGridSection';
import FeaturedStories from '@/components/FeaturedStories';
import PoliticsSection from '@/components/PoliticsSection';
import SportsSection from '@/components/SportsSection';
import EntertainmentSection from '@/components/EntertainmentSection';
import DailyLifeSection from '@/components/DailyLifeSection';
import AlsoInNewsSection from '@/components/AlsoInNewsSection';
import SEOHead from '@/components/SEO/SEOHead';
import TwitterOptimizer from '@/components/SEO/TwitterOptimizer';

export const metadata: Metadata = {
  title: 'NewsHub - Latest Breaking News, Politics, Sports & Entertainment',
  description: 'Stay informed with the latest breaking news, politics, sports, entertainment, and daily life updates. Get real-time coverage of current events, trending stories, and in-depth analysis from trusted sources.',
  keywords: 'news, breaking news, politics, sports, entertainment, current events, trending stories, latest news, world news, local news, business news, technology news',
  authors: [{ name: 'NewsHub Team' }],
  creator: 'NewsHub',
  publisher: 'NewsHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://newshub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NewsHub - Latest Breaking News, Politics, Sports & Entertainment',
    description: 'Stay informed with the latest breaking news, politics, sports, entertainment, and daily life updates. Get real-time coverage of current events, trending stories, and in-depth analysis from trusted sources.',
    url: 'https://newshub.com',
    siteName: 'NewsHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NewsHub - Latest News and Breaking Stories',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 600,
        height: 600,
        alt: 'NewsHub - Latest News and Breaking Stories',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    countryName: 'United States',
    emails: ['contact@newshub.com'],
    phoneNumbers: ['+1-555-123-4567'],
    faxNumbers: ['+1-555-123-4568'],
    ttl: 86400, // 24 hours
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewsHub - Latest Breaking News, Politics, Sports & Entertainment',
    description: 'Stay informed with the latest breaking news, politics, sports, entertainment, and daily life updates.',
    images: ['/twitter-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'news',
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="NewsHub - Latest Breaking News, Politics, Sports & Entertainment"
        description="Stay informed with the latest breaking news, politics, sports, entertainment, and daily life updates. Get real-time coverage of current events, trending stories, and in-depth analysis from trusted sources."
        keywords="news, breaking news, politics, sports, entertainment, current events, trending stories, latest news, world news, local news, business news, technology news"
        canonical="/"
        ogType="website"
        ogImages={[
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'NewsHub - Latest News and Breaking Stories',
            type: 'image/jpeg',
          },
          {
            url: '/og-image-square.jpg',
            width: 600,
            height: 600,
            alt: 'NewsHub - Latest News and Breaking Stories',
            type: 'image/jpeg',
          },
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'NewsHub',
          description: 'Latest breaking news, politics, sports, and entertainment',
          url: 'https://newshub.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://newshub.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      
      {/* Enhanced Twitter Optimization */}
      <TwitterOptimizer
        cardType="summary_large_image"
        title="NewsHub - Latest Breaking News, Politics, Sports & Entertainment"
        description="Stay informed with the latest breaking news, politics, sports, entertainment, and daily life updates. Get real-time coverage of current events, trending stories, and in-depth analysis from trusted sources."
        image={{
          url: '/og-image.jpg',
          alt: 'NewsHub - Latest News and Breaking Stories',
        }}
        hashtags={['news', 'breakingnews', 'politics', 'sports', 'entertainment']}
        mentions={['newshub']}
        relatedAccounts={['@newshub', '@newshub_sports', '@newshub_politics']}
        callToAction="Read the full story"
        engagementPrompt="What do you think about this news?"
        trackingParams={{
          utm_source: 'twitter',
          utm_medium: 'social',
          utm_campaign: 'homepage',
          utm_content: 'news_hub',
        }}
        enableSharing={true}
        enableEmbedding={true}
      />
      
      <main>
        <NewsGridSection />
        <FeaturedStories />
        <PoliticsSection />
        <SportsSection />
        <EntertainmentSection />
        <DailyLifeSection />
        <AlsoInNewsSection />
      </main>
    </>
  );
} 