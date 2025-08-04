import { ImageContent } from '@/types/post';
import Image from 'next/image';

interface ImageBlockProps {
  content: ImageContent;
}

export default function ImageBlock({ content }: ImageBlockProps) {
  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'center': return 'flex justify-center';
      case 'right': return 'flex justify-end';
      default: return 'flex justify-start';
    }
  };

  return (
    <div className={`${getAlignmentClass(content.alignment)} mb-6`}>
      <figure className="max-w-full">
        <div className="relative">
          <Image
            src={content.url}
            alt={content.alt}
            width={content.width || 800}
            height={content.height || 600}
            className="rounded-lg shadow-md"
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        {content.caption && (
          <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
            {content.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
} 