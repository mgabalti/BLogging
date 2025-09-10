import React from 'react';

interface OpenGraphProps {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
    type?: string;
  }>;
  siteName?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  countryName?: string;
  emails?: string[];
  phoneNumbers?: string[];
  faxNumbers?: string[];
  ttl?: number;
  audio?: Array<{
    url: string;
    type: string;
  }>;
  videos?: Array<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
}

const OpenGraph: React.FC<OpenGraphProps> = ({
  title,
  description,
  url,
  type,
  images,
  siteName = 'NewsHub',
  locale = 'en_US',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  countryName = 'United States',
  emails = ['contact@newshub.com'],
  phoneNumbers = ['+1-555-123-4567'],
  faxNumbers = ['+1-555-123-4568'],
  ttl = 86400,
  audio,
  videos,
}) => {
  return (
    <>
      {/* Basic OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:country_name" content={countryName} />
      <meta property="og:ttl" content={ttl.toString()} />

      {/* Images */}
      {images.map((image, index) => (
        <React.Fragment key={index}>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
          <meta property="og:image:alt" content={image.alt} />
          {image.type && <meta property="og:image:type" content={image.type} />}
        </React.Fragment>
      ))}

      {/* Contact Information */}
      {emails.map((email, index) => (
        <meta key={`email-${index}`} property="og:email" content={email} />
      ))}
      {phoneNumbers.map((phone, index) => (
        <meta key={`phone-${index}`} property="og:phone_number" content={phone} />
      ))}
      {faxNumbers.map((fax, index) => (
        <meta key={`fax-${index}`} property="og:fax_number" content={fax} />
      ))}

      {/* Article-specific tags */}
      {type === 'article' && (
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

      {/* Audio and Video */}
      {audio?.map((audioItem, index) => (
        <React.Fragment key={`audio-${index}`}>
          <meta property="og:audio" content={audioItem.url} />
          <meta property="og:audio:type" content={audioItem.type} />
        </React.Fragment>
      ))}
      {videos?.map((video, index) => (
        <React.Fragment key={`video-${index}`}>
          <meta property="og:video" content={video.url} />
          <meta property="og:video:width" content={video.width.toString()} />
          <meta property="og:video:height" content={video.height.toString()} />
          <meta property="og:video:type" content={video.type} />
        </React.Fragment>
      ))}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {images.length > 0 && <meta name="twitter:image" content={images[0].url} />}
      <meta name="twitter:site" content="@newshub" />
      <meta name="twitter:creator" content="@newshub" />
    </>
  );
};

export default OpenGraph; 