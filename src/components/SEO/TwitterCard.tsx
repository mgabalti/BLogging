import React from 'react';

interface TwitterCardProps {
  cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  site?: string;
  creator?: string;
  domain?: string;
  // App Card specific props
  appName?: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  appId?: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  appUrl?: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  // Player Card specific props
  player?: {
    url: string;
    width: number;
    height: number;
    stream?: string;
    streamContentType?: string;
  };
  // Additional metadata
  label1?: string;
  data1?: string;
  label2?: string;
  data2?: string;
}

const TwitterCard: React.FC<TwitterCardProps> = ({
  cardType = 'summary_large_image',
  title,
  description,
  image,
  site = '@newshub',
  creator = '@newshub',
  domain = 'newshub.com',
  appName,
  appId,
  appUrl,
  player,
  label1,
  data1,
  label2,
  data2,
}) => {
  return (
    <>
      {/* Basic Twitter Card Tags */}
      <meta name="twitter:card" content={cardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:domain" content={domain} />

      {/* Image for Summary Cards */}
      {image && (
        <>
          <meta name="twitter:image" content={image.url} />
          <meta name="twitter:image:alt" content={image.alt} />
        </>
      )}

      {/* App Card Specific Tags */}
      {cardType === 'app' && (
        <>
          {appName?.iphone && <meta name="twitter:app:name:iphone" content={appName.iphone} />}
          {appId?.iphone && <meta name="twitter:app:id:iphone" content={appId.iphone} />}
          {appUrl?.iphone && <meta name="twitter:app:url:iphone" content={appUrl.iphone} />}
          
          {appName?.ipad && <meta name="twitter:app:name:ipad" content={appName.ipad} />}
          {appId?.ipad && <meta name="twitter:app:id:ipad" content={appId.ipad} />}
          {appUrl?.ipad && <meta name="twitter:app:url:ipad" content={appUrl.ipad} />}
          
          {appName?.googleplay && <meta name="twitter:app:name:googleplay" content={appName.googleplay} />}
          {appId?.googleplay && <meta name="twitter:app:id:googleplay" content={appId.googleplay} />}
          {appUrl?.googleplay && <meta name="twitter:app:url:googleplay" content={appUrl.googleplay} />}
        </>
      )}

      {/* Player Card Specific Tags */}
      {cardType === 'player' && player && (
        <>
          <meta name="twitter:player" content={player.url} />
          <meta name="twitter:player:width" content={player.width.toString()} />
          <meta name="twitter:player:height" content={player.height.toString()} />
          {player.stream && <meta name="twitter:player:stream" content={player.stream} />}
          {player.streamContentType && <meta name="twitter:player:stream:content_type" content={player.streamContentType} />}
        </>
      )}

      {/* Additional Metadata for App Cards */}
      {cardType === 'app' && (
        <>
          {label1 && data1 && <meta name="twitter:app:country" content="US" />}
          {label1 && <meta name="twitter:app:label1" content={label1} />}
          {data1 && <meta name="twitter:app:data1" content={data1} />}
          {label2 && <meta name="twitter:app:label2" content={label2} />}
          {data2 && <meta name="twitter:app:data2" content={data2} />}
        </>
      )}
    </>
  );
};

export default TwitterCard; 