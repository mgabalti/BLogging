import { EmbedContent } from '@/types/post';
import { ExternalLink, Play, Twitter, Instagram } from 'lucide-react';

interface EmbedBlockProps {
  content: EmbedContent;
}

export default function EmbedBlock({ content }: EmbedBlockProps) {
  const getEmbedIcon = () => {
    switch (content.type) {
      case 'youtube':
        return <Play className="h-6 w-6 text-red-500" />;
      case 'twitter':
        return <Twitter className="h-6 w-6 text-blue-400" />;
      case 'instagram':
        return <Instagram className="h-6 w-6 text-pink-500" />;
      default:
        return <ExternalLink className="h-6 w-6 text-gray-500" />;
    }
  };

  const getEmbedTitle = () => {
    switch (content.type) {
      case 'youtube':
        return 'YouTube Video';
      case 'twitter':
        return 'Twitter Post';
      case 'instagram':
        return 'Instagram Post';
      case 'vimeo':
        return 'Vimeo Video';
      default:
        return 'Embedded Content';
    }
  };

  const renderEmbed = () => {
    const width = content.width || 560;
    const height = content.height || 315;

    switch (content.type) {
      case 'youtube':
        const videoId = content.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        if (videoId) {
          return (
            <iframe
              width={width}
              height={height}
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            />
          );
        }
        break;
      case 'vimeo':
        const vimeoId = content.url.match(/vimeo\.com\/(\d+)/)?.[1];
        if (vimeoId) {
          return (
            <iframe
              width={width}
              height={height}
              src={`https://player.vimeo.com/video/${vimeoId}`}
              title="Vimeo video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            />
          );
        }
        break;
      default:
        break;
    }

    // Fallback for unsupported embeds or invalid URLs
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          {getEmbedIcon()}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {getEmbedTitle()}
        </h3>
        <p className="text-gray-600 mb-4">
          {content.title || 'Embedded content'}
        </p>
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Content
        </a>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-center">
        {renderEmbed()}
      </div>
    </div>
  );
} 