import React from 'react';
import Head from 'next/head';
import TwitterCard from './TwitterCard';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'book' | 'profile';
  ogImages?: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
    type?: string;
  }>;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImages = [
    {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'NewsHub - Latest News and Breaking Stories',
      type: 'image/jpeg',
    },
  ],
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noIndex = false,
  noFollow = false,
  structuredData,
}) => {
  const baseUrl = 'https://newshub.com';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="NewsHub Team" />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="NewsHub" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:country_name" content="United States" />
      <meta property="og:ttl" content="86400" />
      
      {/* OpenGraph Images */}
      {ogImages.map((image, index) => (
        <React.Fragment key={index}>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
          <meta property="og:image:alt" content={image.alt} />
          {image.type && <meta property="og:image:type" content={image.type} />}
        </React.Fragment>
      ))}
      
      {/* Contact Information */}
      <meta property="og:email" content="contact@newshub.com" />
      <meta property="og:phone_number" content="+1-555-123-4567" />
      <meta property="og:fax_number" content="+1-555-123-4568" />
      
      {/* Article-specific OpenGraph tags */}
      {ogType === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {authors?.map((author, index) => (
            <meta key={`author-${index}`} property="article:author" content={author} />
          ))}
          {section && <meta property="article:section" content={section} />}
          {tags?.map((tag, index) => (
            <meta key={`tag-${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
             {/* Twitter Card Tags - Enhanced */}
       <TwitterCard
         cardType="summary_large_image"
         title={title}
         description={description}
         image={ogImages.length > 0 ? {
           url: ogImages[0].url,
           alt: ogImages[0].alt,
         } : undefined}
         site="@newshub"
         creator="@newshub"
         domain="newshub.com"
         appName={{
           iphone: "NewsHub",
           ipad: "NewsHub",
           googleplay: "NewsHub"
         }}
         appId={{
           iphone: "123456789",
           ipad: "123456789",
           googleplay: "com.newshub.app"
         }}
         appUrl={{
           iphone: "newshub://article",
           ipad: "newshub://article",
           googleplay: "newshub://article"
         }}
       />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1F4D6A" />
      <meta name="msapplication-TileColor" content="#1F4D6A" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="NewsHub" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEOHead; 