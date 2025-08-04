import api from '@/lib/api';
import { 
  Post, 
  PostSummary, 
  CreatePostRequest, 
  UpdatePostRequest, 
  PostQueryParams, 
  PagedResult 
} from '@/types';

export const postService = {
  // Get all posts with pagination and filters
  async getPosts(params: PostQueryParams = {}): Promise<PagedResult<PostSummary>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const response = await api.get<PagedResult<PostSummary>>(`/posts?${searchParams.toString()}`);
    return response.data;
  },

  // Get a specific post by ID
  async getPost(id: string): Promise<Post> {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  // Create a new post
  async createPost(postData: CreatePostRequest): Promise<Post> {
    const response = await api.post<Post>('/posts', postData);
    return response.data;
  },

  // Update an existing post
  async updatePost(id: string, postData: UpdatePostRequest): Promise<Post> {
    const response = await api.put<Post>(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete a post (soft delete)
  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  // Toggle post block status (SuperAdmin only)
  async toggleBlockStatus(id: string, isBlocked: boolean): Promise<void> {
    await api.put(`/posts/${id}/block`, { status: isBlocked });
  },

  // Toggle post publish status
  async togglePublishStatus(id: string, isPublished: boolean): Promise<void> {
    await api.put(`/posts/${id}/publish`, { status: isPublished });
  },
}; 