'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Folder, 
  Tag,
  TrendingUp,
  AlertTriangle,
  Clock,
  Shield
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Mock data - replace with actual API calls
const mockDashboardData = {
  stats: {
    totalPosts: 245,
    publishedPosts: 189,
    draftPosts: 32,
    blockedPosts: 5,
    totalUsers: 1247,
    activeUsers: 1156,
    blockedUsers: 12,
    totalCategories: 8,
    totalTags: 45,
    postsToday: 12,
    postsThisWeek: 78,
    postsThisMonth: 234
  },
  recentActivity: [
    { type: 'Post', action: 'Created', title: 'New Climate Change Article', userName: 'john_doe', timestamp: '2024-01-15T10:30:00Z' },
    { type: 'User', action: 'Registered', title: 'sarah_wilson', userName: 'sarah_wilson', timestamp: '2024-01-15T09:15:00Z' },
    { type: 'Post', action: 'Published', title: 'Technology Trends 2024', userName: 'tech_writer', timestamp: '2024-01-15T08:45:00Z' }
  ],
  flaggedContent: [
    { id: '1', title: 'Controversial Political Opinion', authorName: 'author1', flagReason: 'Inappropriate content', flaggedAt: '2024-01-14T15:30:00Z' },
    { id: '2', title: 'Spam Article', authorName: 'spammer', flagReason: 'Spam', flaggedAt: '2024-01-14T12:00:00Z' }
  ],
  blockedUsers: [
    { id: '1', userName: 'spam_user', email: 'spam@example.com', blockReason: 'Spamming', blockedAt: '2024-01-14T10:00:00Z' }
  ]
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { stats, recentActivity, flaggedContent, blockedUsers } = dashboardData;

  return (
    <div className="px-6 lg:px-8 max-w-full">
      {/* Page header with Add button - Reid Health style */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">Welcome to your admin panel. Here's what's happening on your platform.</p>
        </div>
       
      </div>

      {/* Stats grid - Reid Health style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          subtitle={`${stats.publishedPosts} published, ${stats.draftPosts} drafts`}
          icon={FileText}
          trend={`+${stats.postsThisMonth} this month`}
          trendUp={true}
          color="blue"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle={`${stats.activeUsers} active, ${stats.blockedUsers} blocked`}
          icon={Users}
          trend={`+45 this week`}
          trendUp={true}
          color="green"
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          subtitle="Content organization"
          icon={Folder}
          trend="No change"
          trendUp={null}
          color="purple"
        />
        <StatsCard
          title="Tags"
          value={stats.totalTags}
          subtitle="Content tagging"
          icon={Tag}
          trend="+3 new tags"
          trendUp={true}
          color="orange"
        />
      </div>

      {/* Recent Posts Table - Reid Health style */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            Recent Posts
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { title: "New Climate Change Article", author: "john_doe", status: "Published", created: "2025-05-28T16:51:22", color: "bg-green-100 text-green-800" },
                { title: "Technology Trends 2024", author: "tech_writer", status: "Draft", created: "2025-05-27T21:25:18", color: "bg-yellow-100 text-yellow-800" },
                { title: "AI Revolution in Healthcare", author: "dr_smith", status: "Published", created: "2025-05-27T19:18:57", color: "bg-green-100 text-green-800" },
                { title: "Sports Championship Finals", author: "sports_reporter", status: "Published", created: "2024-11-22T17:56:54", color: "bg-green-100 text-green-800" }
              ].map((post, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${post.color}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(post.created)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">✏️</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'Post' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'Post' ? <FileText className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type} {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500">by {activity.userName}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(activity.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Flagged Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Flagged Content
              </h2>
            </div>
            <div className="p-6">
              {flaggedContent.length > 0 ? (
                <div className="space-y-3">
                  {flaggedContent.map((item) => (
                    <div key={item.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-600">by {item.authorName}</p>
                      <p className="text-xs text-orange-600 mt-1">{item.flagReason}</p>
                    </div>
                  ))}
                  <button className="w-full text-sm text-orange-600 hover:text-orange-800 font-medium py-2 px-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    View all flagged content →
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No flagged content</p>
              )}
            </div>
          </div>

          {/* Blocked Users */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-500" />
                Blocked Users
              </h2>
            </div>
            <div className="p-6">
              {blockedUsers.length > 0 ? (
                <div className="space-y-3">
                  {blockedUsers.map((user) => (
                    <div key={user.id} className="p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                      <p className="text-sm font-medium text-gray-900">{user.userName}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <p className="text-xs text-red-600 mt-1">{user.blockReason}</p>
                    </div>
                  ))}
                  <button className="w-full text-sm text-red-600 hover:text-red-800 font-medium py-2 px-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                    View all blocked users →
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No blocked users</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-600">Posts today</span>
                <span className="text-sm font-medium text-blue-600">{stats.postsToday}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-600">Posts this week</span>
                <span className="text-sm font-medium text-blue-600">{stats.postsThisWeek}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-600">Posts this month</span>
                <span className="text-sm font-medium text-blue-600">{stats.postsThisMonth}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-600">Blocked posts</span>
                <span className="text-sm font-medium text-red-600">{stats.blockedPosts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: any;
  trend: string;
  trendUp: boolean | null;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatsCard({ title, value, subtitle, icon: Icon, trend, trendUp, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-orange-500 text-white'
  };

  const borderClasses = {
    blue: 'border-blue-200 hover:border-blue-300',
    green: 'border-green-200 hover:border-green-300',
    purple: 'border-purple-200 hover:border-purple-300',
    orange: 'border-orange-200 hover:border-orange-300'
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 ${borderClasses[color]} p-6 hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trendUp !== null && (
          <TrendingUp className={`h-4 w-4 mr-1 ${trendUp ? 'text-green-500' : 'text-red-500'} ${!trendUp ? 'transform rotate-180' : ''}`} />
        )}
        <span className={`text-sm font-medium ${trendUp === true ? 'text-green-600' : trendUp === false ? 'text-red-600' : 'text-gray-500'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}