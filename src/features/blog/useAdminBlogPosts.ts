import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { PostSummaryDto, CreatePostRequest, UpdatePostRequest } from '@/services/api';

interface UseAdminBlogPostsReturn {
  posts: PostSummaryDto[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  fetchPosts: (page?: number, pageSize?: number) => Promise<void>;
  createPost: (postData: CreatePostRequest) => Promise<void>;
  updatePost: (id: string, postData: UpdatePostRequest) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  togglePublishStatus: (id: string, status: boolean) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

export const useAdminBlogPosts = (): UseAdminBlogPostsReturn => {
  const [posts, setPosts] = useState<PostSummaryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async (page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiService.getAdminPosts(page, size);
      
      setPosts(result.items);
      setTotalCount(result.totalCount);
      setCurrentPage(result.page);
      setPageSize(result.pageSize);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch admin posts');
      console.error('Error fetching admin posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: CreatePostRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.createPost(postData);
      
      // Refresh the posts list
      await fetchPosts(currentPage, pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      console.error('Error creating post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, postData: UpdatePostRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.updatePost(id, postData);
      
      // Refresh the posts list
      await fetchPosts(currentPage, pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      console.error('Error updating post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.deletePost(id);
      
      // Refresh the posts list
      await fetchPosts(currentPage, pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      console.error('Error deleting post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, status: boolean) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.togglePublishStatus(id, status);
      
      // Refresh the posts list
      await fetchPosts(currentPage, pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post status');
      console.error('Error updating post status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = async () => {
    await fetchPosts(currentPage, pageSize);
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    togglePublishStatus,
    refreshPosts,
  };
}; 