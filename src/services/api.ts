const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:49957/api';

// Backend DTOs matching
export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: string; // Guid
  tagIds: string[]; // Guid[]
  isPublished: boolean;
  featuredImageId?: string; // Guid
}

export interface UpdatePostRequest {
  title: string;
  content: string;
  categoryId: string; // Guid
  tagIds: string[]; // Guid[]
  isPublished: boolean;
  featuredImageId?: string; // Guid
}

export interface PostDto {
  id: string; // Guid
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  authorId: string;
  authorName: string;
  category: CategoryDto;
  tags: TagDto[];
  featuredImageId?: string; // Guid
  featuredImage?: ImageDto;
}

export interface PostSummaryDto {
  id: string; // Guid
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  authorId: string;
  authorName: string;
  category: CategoryDto;
  tags: TagDto[];
  featuredImageId?: string; // Guid
  featuredImage?: ImageDto;
}

export interface CategoryDto {
  id: string; // Guid
  name: string;
  description?: string;
  createdAt: string;
  postCount: number;
}

export interface TagDto {
  id: string; // Guid
  name: string;
  createdAt: string;
  postCount: number;
}

export interface ImageDto {
  id: string; // Guid
  imageLink: string;
  alt?: string;
  title?: string;
  fileName?: string;
  fileExtension?: string;
  fileSize: number;
  contentType?: string;
  createdAt: string;
  updatedAt: string;
  uploadedById?: string;
  uploadedByName?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const authHeaders = this.getAuthHeaders();
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<{ token: string; user: any }> {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Post methods
  async createPost(postData: CreatePostRequest): Promise<PostDto> {
    return this.request<PostDto>('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async getPosts(page: number = 1, pageSize: number = 10): Promise<PagedResult<PostSummaryDto>> {
    return this.request<PagedResult<PostSummaryDto>>(`/posts?page=${page}&pageSize=${pageSize}`);
  }

  // Admin Post methods
  async getAdminPosts(page: number = 1, pageSize: number = 10): Promise<PagedResult<PostSummaryDto>> {
    return this.request<PagedResult<PostSummaryDto>>(`/admin/AdminPosts?page=${page}&pageSize=${pageSize}`);
  }

  async getPost(id: string): Promise<PostDto> {
    return this.request<PostDto>(`/posts/${id}`);
  }

  async updatePost(id: string, postData: UpdatePostRequest): Promise<PostDto> {
    return this.request<PostDto>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id: string): Promise<void> {
    return this.request<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async togglePublishStatus(id: string, status: boolean): Promise<void> {
    return this.request<void>(`/posts/${id}/publish`, {
      method: 'PATCH',
      body: JSON.stringify({ isPublished: status }),
    });
  }

  // Category methods
  async getCategories(): Promise<CategoryDto[]> {
    return this.request<CategoryDto[]>('/categories');
  }

  async getCategory(id: string): Promise<CategoryDto> {
    return this.request<CategoryDto>(`/categories/${id}`);
  }

  // Tag methods
  async getTags(): Promise<TagDto[]> {
    return this.request<TagDto[]>('/tags');
  }

  async getTag(id: string): Promise<TagDto> {
    return this.request<TagDto>(`/tags/${id}`);
  }

  async createTag(name: string): Promise<TagDto> {
    return this.request<TagDto>('/tags', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // Image upload
  async uploadImage(file: File, alt?: string, title?: string): Promise<ImageDto> {
    const formData = new FormData();
    formData.append('file', file);
    if (alt) formData.append('alt', alt);
    if (title) formData.append('title', title);

    return this.request<ImageDto>('/images/upload', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
      },
      body: formData,
    });
  }

  async getImages(page: number = 1, pageSize: number = 20, search?: string): Promise<PagedResult<ImageDto>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (search) params.append('search', search);

    return this.request<PagedResult<ImageDto>>(`/images?${params.toString()}`);
  }

  async getImage(id: string): Promise<ImageDto> {
    return this.request<ImageDto>(`/images/${id}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; message: string }> {
    return this.request<{ status: string; timestamp: string; message: string }>('/admin/health');
  }

  // Database seeding
  async seedDatabase(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/admin/seed-database', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService(); 