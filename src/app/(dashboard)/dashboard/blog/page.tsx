'use client';

import { useState } from 'react';
import { 
  faPlus, 
  faEye, 
  faEdit, 
  faTrash, 
  faCalendar, 
  faUser,
  faSpinner,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from '@/components/ui/FontAwesomeIcon';
import Link from 'next/link';
import { useAdminBlogPosts } from '@/features/blog/useAdminBlogPosts';
import { PostSummaryDto, TagDto } from '@/services/api';
import toast from 'react-hot-toast';

export default function BlogPage() {
  const [filter, setFilter] = useState('all');
  const {
    posts,
    loading,
    error,
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    fetchPosts,
    deletePost,
    togglePublishStatus,
    refreshPosts,
  } = useAdminBlogPosts();

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter((post: PostSummaryDto) => {
        if (filter === 'published') return post.isPublished;
        if (filter === 'draft') return !post.isPublished;
        return true;
      });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await togglePublishStatus(id, !currentStatus);
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      toast.error('Failed to update post status');
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshPosts();
      toast.success('Posts refreshed');
    } catch (error) {
      toast.error('Failed to refresh posts');
    }
  };

  const getStatusBadge = (isPublished: boolean) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPublished 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isPublished ? 'published' : 'draft'}
      </span>
    );
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Blog</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts and create new content.</p>
          </div>
          <Link
            href="/dashboard/blog/new"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
            Add New Blog
          </Link>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading posts</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FontAwesomeIcon icon={faRefresh} className="h-4 w-4 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add New Blog Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Blog</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts and create new content.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faRefresh} className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/dashboard/blog/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
            Add New Blog
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-8">
            {[
              { key: 'all', label: 'All Posts', count: totalCount },
              { key: 'published', label: 'Published', count: posts.filter((p: PostSummaryDto) => p.isPublished).length },
              { key: 'draft', label: 'Drafts', count: posts.filter((p: PostSummaryDto) => !p.isPublished).length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center space-x-2 px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="px-6 py-12 text-center">
              <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No posts found.</p>
              <Link
                href="/dashboard/blog/new"
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                Create your first post
              </Link>
            </div>
          ) : (
            filteredPosts.map((post: PostSummaryDto) => (
              <div key={post.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                      {getStatusBadge(post.isPublished)}
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {post.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{post.contentPreview}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="h-4 w-4 mr-1" />
                        {post.authorName}
                      </span>
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-1" />
                        {formatDate(post.createdAt)}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="flex items-center">
                          <span className="text-xs text-gray-500">
                            {post.tags.map((tag: TagDto) => tag.name).join(', ')}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      href={`/dashboard/blog/${post.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="View post"
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/dashboard/blog/${post.id}/edit`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      title="Edit post"
                    >
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(post.id, post.isPublished)}
                      className={`p-2 rounded-md transition-colors ${
                        post.isPublished
                          ? 'text-green-400 hover:text-green-600 hover:bg-green-50'
                          : 'text-yellow-400 hover:text-yellow-600 hover:bg-yellow-50'
                      }`}
                      title={post.isPublished ? 'Unpublish post' : 'Publish post'}
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete post"
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchPosts(currentPage - 1, pageSize)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchPosts(currentPage + 1, pageSize)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 