import React from 'react';

interface TwitterOptimizerProps {
  // Basic Twitter Card properties
  cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  
  // Twitter account information
  site?: string;
  creator?: string;
  domain?: string;
  
  // Enhanced sharing features
  enableSharing?: boolean;
  enableEmbedding?: boolean;
  
  // Twitter Lists integration
  twitterList?: {
    id: string;
    name: string;
    description: string;
  };
  
  // Twitter Moments integration
  twitterMoment?: {
    id: string;
    title: string;
    description: string;
  };
  
  // Advanced metadata
  hashtags?: string[];
  mentions?: string[];
  relatedAccounts?: string[];
  
  // Engagement optimization
  callToAction?: string;
  engagementPrompt?: string;
  
  // Analytics and tracking
  trackingParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
}

const TwitterOptimizer: React.FC<TwitterOptimizerProps> = ({
  cardType = 'summary_large_image',
  title,
  description,
  image,
  site = '@newshub',
  creator = '@newshub',
  domain = 'newshub.com',
  enableSharing = true,
  enableEmbedding = true,
  twitterList,
  twitterMoment,
  hashtags = [],
  mentions = [],
  relatedAccounts = [],
  callToAction,
  engagementPrompt,
  trackingParams,
}) => {
  // Generate tracking URL with UTM parameters
  const generateTrackingUrl = (baseUrl: string) => {
    if (!trackingParams) return baseUrl;
    
    const params = new URLSearchParams();
    Object.entries(trackingParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Generate hashtag string
  const hashtagString = hashtags.length > 0 ? ` ${hashtags.map(tag => `#${tag}`).join(' ')}` : '';
  
  // Generate mention string
  const mentionString = mentions.length > 0 ? ` ${mentions.map(mention => `@${mention}`).join(' ')}` : '';

  return (
    <>
      {/* Basic Twitter Card Tags */}
      <meta name="twitter:card" content={cardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:domain" content={domain} />

      {/* Image Optimization */}
      {image && (
        <>
          <meta name="twitter:image" content={image.url} />
          <meta name="twitter:image:alt" content={image.alt} />
        </>
      )}

      {/* Enhanced Sharing Features */}
      {enableSharing && (
        <>
          <meta name="twitter:widgets:csp" content="on" />
          <meta name="twitter:widgets:theme" content="light" />
          <meta name="twitter:widgets:link_color" content="#1DA1F2" />
        </>
      )}

      {/* Twitter Lists Integration */}
      {twitterList && (
        <>
          <meta name="twitter:list:id" content={twitterList.id} />
          <meta name="twitter:list:name" content={twitterList.name} />
          <meta name="twitter:list:description" content={twitterList.description} />
        </>
      )}

      {/* Twitter Moments Integration */}
      {twitterMoment && (
        <>
          <meta name="twitter:moment:id" content={twitterMoment.id} />
          <meta name="twitter:moment:title" content={twitterMoment.title} />
          <meta name="twitter:moment:description" content={twitterMoment.description} />
        </>
      )}

      {/* Hashtags and Mentions */}
      {hashtags.length > 0 && (
        <meta name="twitter:hashtags" content={hashtags.join(',')} />
      )}
      
      {mentions.length > 0 && (
        <meta name="twitter:mentions" content={mentions.join(',')} />
      )}

      {/* Related Accounts */}
      {relatedAccounts.length > 0 && (
        <meta name="twitter:related_accounts" content={relatedAccounts.join(',')} />
      )}

      {/* Engagement Optimization */}
      {callToAction && (
        <meta name="twitter:cta" content={callToAction} />
      )}
      
      {engagementPrompt && (
        <meta name="twitter:engagement_prompt" content={engagementPrompt} />
      )}

      {/* Analytics and Tracking */}
      {trackingParams && (
        <>
          <meta name="twitter:tracking:utm_source" content={trackingParams.utm_source} />
          <meta name="twitter:tracking:utm_medium" content={trackingParams.utm_medium} />
          <meta name="twitter:tracking:utm_campaign" content={trackingParams.utm_campaign} />
          <meta name="twitter:tracking:utm_content" content={trackingParams.utm_content} />
          <meta name="twitter:tracking:utm_term" content={trackingParams.utm_term} />
        </>
      )}

      {/* Enhanced Embedding */}
      {enableEmbedding && (
        <>
          <meta name="twitter:widgets:theme" content="light" />
          <meta name="twitter:widgets:link_color" content="#1DA1F2" />
          <meta name="twitter:widgets:border_color" content="#E1E8ED" />
          <meta name="twitter:widgets:chrome" content="noheader nofooter noborders transparent" />
        </>
      )}

      {/* Mobile App Integration */}
      <meta name="twitter:app:name:iphone" content="NewsHub" />
      <meta name="twitter:app:id:iphone" content="123456789" />
      <meta name="twitter:app:url:iphone" content="newshub://article" />
      <meta name="twitter:app:name:ipad" content="NewsHub" />
      <meta name="twitter:app:id:ipad" content="123456789" />
      <meta name="twitter:app:url:ipad" content="newshub://article" />
      <meta name="twitter:app:name:googleplay" content="NewsHub" />
      <meta name="twitter:app:id:googleplay" content="com.newshub.app" />
      <meta name="twitter:app:url:googleplay" content="newshub://article" />

      {/* Additional Optimization Tags */}
      <meta name="twitter:widgets:width" content="550" />
      <meta name="twitter:widgets:height" content="420" />
      <meta name="twitter:widgets:lang" content="en" />
      <meta name="twitter:widgets:dnt" content="true" />
    </>
  );
};

export default TwitterOptimizer; 