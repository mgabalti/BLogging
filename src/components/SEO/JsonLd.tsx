import React from 'react';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  datePublished: string;
  dateModified: string;
  category?: string;
  tags?: string[];
}

const ArticleJsonLd: React.FC<ArticleJsonLdProps> = ({
  title,
  description,
  url,
  image,
  author,
  publisher,
  datePublished,
  dateModified,
  category,
  tags,
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${process.env.NEXT_PUBLIC_SITE_URL}/default-article-image.jpg`,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(category && { articleSection: category }),
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

interface WebsiteJsonLdProps {
  name: string;
  description: string;
  url: string;
  logo: string;
}

const WebsiteJsonLd: React.FC<WebsiteJsonLdProps> = ({
  name,
  description,
  url,
  logo,
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    description: description,
    url: url,
    logo: logo,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

interface OrganizationJsonLdProps {
  name: string;
  description: string;
  url: string;
  logo: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const OrganizationJsonLd: React.FC<OrganizationJsonLdProps> = ({
  name,
  description,
  url,
  logo,
  socialMedia,
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    description: description,
    url: url,
    logo: logo,
    ...(socialMedia && {
      sameAs: [
        socialMedia.facebook,
        socialMedia.twitter,
        socialMedia.instagram,
        socialMedia.linkedin,
      ].filter(Boolean),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export { ArticleJsonLd, WebsiteJsonLd, OrganizationJsonLd }; 