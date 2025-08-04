import { TextContent } from '@/types/post';

interface TextBlockProps {
  content: TextContent;
}

export default function TextBlock({ content }: TextBlockProps) {
  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  const getFontSizeClass = (fontSize?: string) => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'xlarge': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getFontWeightClass = (fontWeight?: string) => {
    switch (fontWeight) {
      case 'medium': return 'font-medium';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      default: return 'font-normal';
    }
  };

  return (
    <div className={`${getAlignmentClass(content.alignment)} ${getFontSizeClass(content.fontSize)} ${getFontWeightClass(content.fontWeight)} leading-relaxed mb-6`}>
      <div 
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
} 