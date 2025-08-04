// User types
export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expires: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  postCount: number;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

// Tag types
export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  postCount: number;
}

export interface CreateTagRequest {
  name: string;
}

// Post types
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  authorId: string;
  authorName: string;
  category: Category;
  tags: Tag[];
}

export interface PostSummary {
  id: string;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  authorId: string;
  authorName: string;
  category: Category;
  tags: Tag[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  isPublished?: boolean;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  isPublished: boolean;
}

export interface PostQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  tagIds?: string[];
  isPublished?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
  authorId?: string;
}

// Writer Profile types
export interface WriterProfile {
  userId: string;
  bio?: string;
  profilePictureUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  gitHubUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  postCount: number;
}

export interface UpdateWriterProfileRequest {
  bio?: string;
  profilePictureUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  gitHubUrl?: string;
  websiteUrl?: string;
}

// API Response types
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Form types
export interface SelectOption {
  value: string;
  label: string;
} 