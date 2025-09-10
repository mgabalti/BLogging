import React from 'react';

interface TwitterShareProps {
  url: string;
  text: string;
  hashtags?: string[];
  via?: string;
  related?: string[];
  size?: 'small' | 'medium' | 'large';
  theme?: 'light' | 'dark';
  showCount?: boolean;
  showScreenName?: boolean;
  showUsername?: boolean;
  showHashtags?: boolean;
  showVia?: boolean;
  showRelated?: boolean;
  showDnt?: boolean;
  showLang?: string;
  showWidth?: number;
  showHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TwitterShare: React.FC<TwitterShareProps> = ({
  url,
  text,
  hashtags = [],
  via = 'newshub',
  related = [],
  size = 'medium',
  theme = 'light',
  showCount = true,
  showScreenName = true,
  showUsername = true,
  showHashtags = true,
  showVia = true,
  showRelated = true,
  showDnt = true,
  showLang = 'en',
  showWidth = 550,
  showHeight = 420,
  className = '',
  style = {},
}) => {
  // Generate Twitter share URL
  const generateTwitterUrl = () => {
    const params = new URLSearchParams();
    params.append('url', url);
    params.append('text', text);
    
    if (hashtags.length > 0) {
      params.append('hashtags', hashtags.join(','));
    }
    
    if (via) {
      params.append('via', via);
    }
    
    if (related.length > 0) {
      params.append('related', related.join(','));
    }
    
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  };

  // Generate Twitter embed URL
  const generateTwitterEmbedUrl = () => {
    const params = new URLSearchParams();
    params.append('url', url);
    
    if (showCount) {
      params.append('count', 'true');
    }
    
    if (showScreenName) {
      params.append('screen_name', via);
    }
    
    if (showUsername) {
      params.append('username', via);
    }
    
    if (showHashtags && hashtags.length > 0) {
      params.append('hashtags', hashtags.join(','));
    }
    
    if (showVia) {
      params.append('via', via);
    }
    
    if (showRelated && related.length > 0) {
      params.append('related', related.join(','));
    }
    
    if (showDnt) {
      params.append('dnt', 'true');
    }
    
    if (showLang) {
      params.append('lang', showLang);
    }
    
    return `https://platform.twitter.com/widgets/tweet_button.html?${params.toString()}`;
  };

  const handleShare = () => {
    const twitterUrl = generateTwitterUrl();
    window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const sizeClasses = {
    small: 'text-sm px-2 py-1',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-6 py-3',
  };

  const themeClasses = {
    light: 'bg-blue-500 hover:bg-blue-600 text-white',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white',
  };

  return (
    <div className={`twitter-share-container ${className}`} style={style}>
      {/* Share Button */}
      <button
        onClick={handleShare}
        className={`twitter-share-btn rounded-lg font-medium transition-colors duration-200 ${sizeClasses[size]} ${themeClasses[theme]}`}
        aria-label="Share on Twitter"
      >
        <svg
          className="inline-block w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
        Share on Twitter
      </button>

      {/* Twitter Embed */}
      <div className="twitter-embed mt-4">
        <iframe
          src={generateTwitterEmbedUrl()}
          width={showWidth}
          height={showHeight}
          frameBorder="0"
          scrolling="no"
          allowTransparency={true}
          allowFullScreen={true}
          title="Twitter Share"
          className="twitter-widget"
        />
      </div>

      {/* Share Statistics */}
      <div className="share-stats mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>Share this page:</span>
          <button
            onClick={handleShare}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwitterShare; 