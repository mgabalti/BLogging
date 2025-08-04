export interface PostContent {
  id: string;
  postId: string;
  type: 'text' | 'image' | 'quote' | 'table' | 'chart' | 'list' | 'divider' | 'embed';
  contentIndex: number;
  content: any; // Will vary by type
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isBlocked: boolean;
}

// Specific content type interfaces
export interface TextContent {
  text: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: 'small' | 'normal' | 'large' | 'xlarge';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface ImageContent {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  alignment?: 'left' | 'center' | 'right';
}

export interface QuoteContent {
  text: string;
  author?: string;
  source?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface TableContent {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ChartContent {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
    }[];
  };
  options?: any;
}

export interface ListContent {
  type: 'ordered' | 'unordered';
  items: string[];
  style?: 'default' | 'check' | 'arrow';
}

export interface DividerContent {
  type: 'line' | 'dots' | 'dashed';
  color?: string;
  thickness?: number;
}

export interface EmbedContent {
  type: 'youtube' | 'vimeo' | 'twitter' | 'instagram' | 'custom';
  url: string;
  title?: string;
  width?: number;
  height?: number;
}

// Post interface
export interface Post {
  id: string;
  title: string;
  excerpt?: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
  isFeatured: boolean;
  allowComments: boolean;
  createdAt: Date;
  updatedAt: Date;
  postContents: PostContent[];
} 