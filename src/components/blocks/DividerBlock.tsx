import { DividerContent } from '@/types/post';

interface DividerBlockProps {
  content: DividerContent;
}

export default function DividerBlock({ content }: DividerBlockProps) {
  const getDividerStyle = () => {
    const color = content.color || '#e5e7eb';
    const thickness = content.thickness || 1;

    switch (content.type) {
      case 'dots':
        return (
          <div className="flex justify-center space-x-2 py-4">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
        );
      case 'dashed':
        return (
          <div 
            className="border-t border-dashed my-6"
            style={{ 
              borderColor: color,
              borderWidth: `${thickness}px`
            }}
          />
        );
      default:
        return (
          <div 
            className="border-t my-6"
            style={{ 
              borderColor: color,
              borderWidth: `${thickness}px`
            }}
          />
        );
    }
  };

  return (
    <div className="my-8">
      {getDividerStyle()}
    </div>
  );
} 