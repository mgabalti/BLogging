'use client';

import { useParams } from 'next/navigation';
import { ArrowLeftIcon, PencilIcon, TrashIcon, CalendarIcon, UserIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Mock blog post data
  const blogPost = {
    id: 1,
    title: 'Getting Started with Blogging',
    slug: slug,
    status: 'published',
    views: 1234,
    publishedAt: '2024-01-15',
    content: `
      <p>Learn the basics of creating engaging blog content that resonates with your audience. This comprehensive guide covers everything from choosing the right topics to optimizing your posts for search engines.</p>
      
      <h2>Why Blogging Matters</h2>
      <p>Blogging is one of the most effective ways to establish your authority in your niche, connect with your audience, and drive traffic to your website. Whether you're a business owner, freelancer, or hobbyist, blogging can help you achieve your goals.</p>
      
      <h2>Getting Started</h2>
      <p>To get started with blogging, you need to:</p>
      <ul>
        <li>Choose your niche and target audience</li>
        <li>Set up your blog platform</li>
        <li>Create a content calendar</li>
        <li>Write your first post</li>
        <li>Promote your content</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices to create successful blog posts:</p>
      <ul>
        <li>Write compelling headlines</li>
        <li>Use clear, concise language</li>
        <li>Include relevant images</li>
        <li>Optimize for SEO</li>
        <li>Engage with your readers</li>
      </ul>
    `,
    author: 'John Doe',
    category: 'Tutorial'
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard/blog" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>← Back to Blog Posts</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            href={`/dashboard/blog/${slug}/edit`}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit</span>
          </Link>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
            <TrashIcon className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Blog Post Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {blogPost.author}
              </span>
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {formatDate(blogPost.publishedAt)}
              </span>
              <span className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-1" />
                {blogPost.views} views
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {blogPost.status}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {blogPost.category}
              </span>
            </div>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>
      </div>
    </div>
  );
} 