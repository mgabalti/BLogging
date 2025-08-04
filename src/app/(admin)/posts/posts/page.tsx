'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileText, Search, Filter, Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Post {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft' | 'blocked';
  category: string;
  createdAt: string;
  updatedAt: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'New Climate Change Article',
    author: 'john_doe',
    status: 'published',
    category: 'Environment',
    createdAt: '2025-05-28T16:51:22',
    updatedAt: '2025-05-28T16:51:22'
  },
  {
    id: '2',
    title: 'Technology Trends 2024',
    author: 'tech_writer',
    status: 'draft',
    category: 'Technology',
    createdAt: '2025-05-27T21:25:18',
    updatedAt: '2025-05-27T21:25:18'
  },
  {
    id: '3',
    title: 'AI Revolution in Healthcare',
    author: 'dr_smith',
    status: 'published',
    category: 'Healthcare',
    createdAt: '2025-05-27T19:18:57',
    updatedAt: '2025-05-27T19:18:57'
  },
  {
    id: '4',
    title: 'Sports Championship Finals',
    author: 'sports_reporter',
    status: 'published',
    category: 'Sports',
    createdAt: '2024-11-22T17:56:54',
    updatedAt: '2024-11-22T17:56:54'
  }
];

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-6 lg:px-8 max-w-full">
      {/* Page header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
          <p className="mt-2 text-gray-600">Manage all posts, drafts, and published content</p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Post
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="admin-card mb-6">
        <div className="admin-card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="blocked">Blocked</option>
              </select>
              <button className="admin-btn-secondary">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            All Posts ({filteredPosts.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="admin-table-header">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="admin-table-body">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="admin-table-row">
                  <td className="admin-table-cell">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="admin-table-cell">
                    <div className="text-sm text-gray-600">{post.author}</div>
                  </td>
                  <td className="admin-table-cell">
                    <div className="text-sm text-gray-600">{post.category}</div>
                  </td>
                  <td className="admin-table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td className="admin-table-cell text-sm text-gray-600">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="admin-table-cell text-sm text-gray-600">
                    {formatDate(post.updatedAt)}
                  </td>
                  <td className="admin-table-cell">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-1 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 