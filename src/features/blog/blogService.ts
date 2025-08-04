import { api } from "../../services/axios";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  views: number;
  author: {
    id: string;
    name: string;
  };
}

export interface CreateBlogPostRequest {
  title: string;
  content: string;
  status?: 'draft' | 'published';
}

export interface UpdateBlogPostRequest {
  title?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
}

export const blogService = {
  // Get all blog posts for the current user
  async getPosts(): Promise<BlogPost[]> {
    const response = await api.get<BlogPost[]>('/posts/my-posts');
    return response.data;
  },

  // Get a specific blog post
  async getPost(id: string): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/posts/${id}`);
    return response.data;
  },

  // Create a new blog post
  async createPost(data: CreateBlogPostRequest): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/posts', data);
    return response.data;
  },

  // Update a blog post
  async updatePost(id: string, data: UpdateBlogPostRequest): Promise<BlogPost> {
    const response = await api.put<BlogPost>(`/posts/${id}`, data);
    return response.data;
  },

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  // Publish a blog post
  async publishPost(id: string): Promise<BlogPost> {
    const response = await api.put<BlogPost>(`/posts/${id}/publish`);
    return response.data;
  },

  // Unpublish a blog post
  async unpublishPost(id: string): Promise<BlogPost> {
    const response = await api.put<BlogPost>(`/posts/${id}/unpublish`);
    return response.data;
  },
}; 