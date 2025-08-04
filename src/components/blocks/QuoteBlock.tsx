import { QuoteContent } from '@/types/post';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  content: QuoteContent;
}

export default function QuoteBlock({ content }: QuoteBlockProps) {
  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <div className={`${getAlignmentClass(content.alignment)} mb-8`}>
      <blockquote className="relative bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <Quote className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-lg text-gray-800 italic mb-4 leading-relaxed">
              "{content.text}"
            </p>
            {(content.author || content.source) && (
              <footer className="text-sm text-gray-600">
                {content.author && (
                  <cite className="not-italic font-medium">
                    — {content.author}
                  </cite>
                )}
                {content.source && (
                  <span className="ml-2">
                    {content.author && ', '}
                    <cite className="not-italic">
                      {content.source}
                    </cite>
                  </span>
                )}
              </footer>
            )}
          </div>
        </div>
      </blockquote>
    </div>
  );
} 