import api from '@/lib/api';
import { Tag, CreateTagRequest } from '@/types';

export const tagService = {
  // Get all tags
  async getTags(): Promise<Tag[]> {
    const response = await api.get<Tag[]>('/tags');
    return response.data;
  },

  // Get a specific tag by ID
  async getTag(id: string): Promise<Tag> {
    const response = await api.get<Tag>(`/tags/${id}`);
    return response.data;
  },

  // Create a new tag (SuperAdmin only)
  async createTag(tagData: CreateTagRequest): Promise<Tag> {
    const response = await api.post<Tag>('/tags', tagData);
    return response.data;
  },

  // Update an existing tag (SuperAdmin only)
  async updateTag(id: string, tagData: CreateTagRequest): Promise<Tag> {
    const response = await api.put<Tag>(`/tags/${id}`, tagData);
    return response.data;
  },

  // Delete a tag (SuperAdmin only)
  async deleteTag(id: string): Promise<void> {
    await api.delete(`/tags/${id}`);
  },
}; 