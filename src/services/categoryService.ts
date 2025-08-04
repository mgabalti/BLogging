import api from '@/lib/api';
import { Category, CreateCategoryRequest } from '@/types';

export const categoryService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  // Get a specific category by ID
  async getCategory(id: string): Promise<Category> {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },

  // Create a new category (SuperAdmin only)
  async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    const response = await api.post<Category>('/categories', categoryData);
    return response.data;
  },

  // Update an existing category (SuperAdmin only)
  async updateCategory(id: string, categoryData: CreateCategoryRequest): Promise<Category> {
    const response = await api.put<Category>(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete a category (SuperAdmin only)
  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
}; 