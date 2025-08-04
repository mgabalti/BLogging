'use client';
import { mockPost, mockPostContents } from '@/data/mockPostContent';
import PostContentRenderer from '@/components/PostContentRenderer';
import { User, Clock, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {mockPost.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {mockPost.excerpt}
            </p>
            
            {/* Post Meta */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{mockPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{formatDate(mockPost.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span className="capitalize">{mockPost.category}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {mockPost.featuredImage && (
            <div className="mb-8">
              <img
                src={mockPost.featuredImage}
                alt={mockPost.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <PostContentRenderer postContents={mockPostContents} />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500">
            <p>This is a demo of the PostContentRenderer component</p>
            <p className="text-sm mt-2">
              The content above is rendered using structured PostContent blocks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 