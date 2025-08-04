import { PostContent } from '@/types/post';

export const mockPostContents: PostContent[] = [
  {
    id: '1',
    postId: 'post-1',
    type: 'text',
    contentIndex: 0,
    content: {
      text: '<h2>The Future of Technology</h2><p>In recent years, we have witnessed an unprecedented acceleration in technological advancement. From artificial intelligence to renewable energy, the landscape of innovation continues to evolve at a rapid pace.</p><p>This article explores the key trends that are shaping our digital future and how they will impact various industries.</p>',
      alignment: 'left',
      fontSize: 'normal',
      fontWeight: 'normal'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '2',
    postId: 'post-1',
    type: 'image',
    contentIndex: 1,
    content: {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'Futuristic technology concept',
      caption: 'AI and machine learning are revolutionizing how we approach problem-solving',
      alignment: 'center',
      width: 800,
      height: 600
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '3',
    postId: 'post-1',
    type: 'quote',
    contentIndex: 2,
    content: {
      text: 'The best way to predict the future is to invent it.',
      author: 'Alan Kay',
      source: 'Computer Scientist',
      alignment: 'center'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '4',
    postId: 'post-1',
    type: 'text',
    contentIndex: 3,
    content: {
      text: '<p>Let\'s examine the key areas where technology is making the most significant impact:</p>',
      alignment: 'left',
      fontSize: 'normal',
      fontWeight: 'normal'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '5',
    postId: 'post-1',
    type: 'list',
    contentIndex: 4,
    content: {
      type: 'unordered',
      items: [
        'Artificial Intelligence and Machine Learning',
        'Internet of Things (IoT)',
        'Blockchain Technology',
        'Renewable Energy Solutions',
        'Quantum Computing'
      ],
      style: 'check'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '6',
    postId: 'post-1',
    type: 'divider',
    contentIndex: 5,
    content: {
      type: 'line',
      color: '#e5e7eb',
      thickness: 2
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '7',
    postId: 'post-1',
    type: 'text',
    contentIndex: 6,
    content: {
      text: '<h3>Market Analysis</h3><p>Here\'s a breakdown of the current market trends in technology sectors:</p>',
      alignment: 'left',
      fontSize: 'large',
      fontWeight: 'semibold'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '8',
    postId: 'post-1',
    type: 'table',
    contentIndex: 7,
    content: {
      headers: ['Technology Sector', 'Market Size (2024)', 'Growth Rate', 'Key Players'],
      rows: [
        ['AI/ML', '$200B', '25%', 'OpenAI, Google, Microsoft'],
        ['IoT', '$150B', '18%', 'Cisco, Intel, Qualcomm'],
        ['Blockchain', '$80B', '30%', 'Ethereum, Bitcoin, Binance'],
        ['Quantum Computing', '$15B', '45%', 'IBM, Google, Microsoft']
      ],
      caption: 'Technology market overview for 2024'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '9',
    postId: 'post-1',
    type: 'embed',
    contentIndex: 8,
    content: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Technology Trends 2024',
      width: 560,
      height: 315
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '10',
    postId: 'post-1',
    type: 'text',
    contentIndex: 9,
    content: {
      text: '<h3>Conclusion</h3><p>As we move forward, it\'s clear that technology will continue to be the driving force behind innovation and progress. The key is to embrace these changes while ensuring that they benefit humanity as a whole.</p><p>Stay tuned for more insights on emerging technologies and their impact on our world.</p>',
      alignment: 'left',
      fontSize: 'normal',
      fontWeight: 'normal'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  },
  {
    id: '11',
    postId: 'post-1',
    type: 'list',
    contentIndex: 10,
    content: {
      type: 'ordered',
      items: [
        'Research emerging technologies',
        'Invest in skill development',
        'Network with industry experts',
        'Stay updated with latest trends',
        'Contribute to open source projects'
      ],
      style: 'default'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDeleted: false,
    isBlocked: false
  }
];

// Example of a complete post with content
export const mockPost = {
  id: 'post-1',
  title: 'The Future of Technology: Trends and Predictions',
  excerpt: 'An in-depth analysis of emerging technologies and their impact on various industries.',
  author: 'Tech Writer',
  category: 'technology',
  tags: ['technology', 'AI', 'innovation', 'future'],
  featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
  isPublished: true,
  isFeatured: true,
  allowComments: true,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  postContents: mockPostContents
}; 