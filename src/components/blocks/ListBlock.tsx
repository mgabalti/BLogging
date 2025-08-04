import { ListContent } from '@/types/post';
import { Check, ArrowRight } from 'lucide-react';

interface ListBlockProps {
  content: ListContent;
}

export default function ListBlock({ content }: ListBlockProps) {
  const getListStyle = () => {
    if (content.type === 'ordered') {
      return 'list-decimal list-inside';
    }
    
    switch (content.style) {
      case 'check':
        return 'list-none space-y-2';
      case 'arrow':
        return 'list-none space-y-2';
      default:
        return 'list-disc list-inside';
    }
  };

  const renderListItem = (item: string, index: number) => {
    if (content.type === 'ordered') {
      return (
        <li key={index} className="mb-2 text-gray-800">
          {item}
        </li>
      );
    }

    switch (content.style) {
      case 'check':
        return (
          <li key={index} className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800">{item}</span>
          </li>
        );
      case 'arrow':
        return (
          <li key={index} className="flex items-start space-x-3">
            <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800">{item}</span>
          </li>
        );
      default:
        return (
          <li key={index} className="mb-2 text-gray-800">
            {item}
          </li>
        );
    }
  };

  return (
    <div className="mb-6">
      <ul className={getListStyle()}>
        {content.items.map((item, index) => renderListItem(item, index))}
      </ul>
    </div>
  );
} 