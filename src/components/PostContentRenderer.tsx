import { PostContent } from '@/types/post';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import QuoteBlock from './blocks/QuoteBlock';
import TableBlock from './blocks/TableBlock';
import ListBlock from './blocks/ListBlock';
import DividerBlock from './blocks/DividerBlock';
import EmbedBlock from './blocks/EmbedBlock';

interface PostContentRendererProps {
  postContents: PostContent[];
}

export default function PostContentRenderer({ postContents }: PostContentRendererProps) {
  // Sort contents by contentIndex to ensure proper order
  const sortedContents = [...postContents].sort((a, b) => a.contentIndex - b.contentIndex);

  const renderContentBlock = (content: PostContent) => {
    // Skip deleted or blocked content
    if (content.isDeleted || content.isBlocked) {
      return null;
    }

    switch (content.type) {
      case 'text':
        return <TextBlock key={content.id} content={content.content} />;
      
      case 'image':
        return <ImageBlock key={content.id} content={content.content} />;
      
      case 'quote':
        return <QuoteBlock key={content.id} content={content.content} />;
      
      case 'table':
        return <TableBlock key={content.id} content={content.content} />;
      
      case 'list':
        return <ListBlock key={content.id} content={content.content} />;
      
      case 'divider':
        return <DividerBlock key={content.id} content={content.content} />;
      
      case 'embed':
        return <EmbedBlock key={content.id} content={content.content} />;
      
      case 'chart':
        // TODO: Implement ChartBlock component
        return (
          <div key={content.id} className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Chart component not yet implemented. Chart data: {JSON.stringify(content.content).substring(0, 100)}...
            </p>
          </div>
        );
      
      default:
        return (
          <div key={content.id} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              Unknown content type: {content.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {sortedContents.map(renderContentBlock)}
    </div>
  );
} 