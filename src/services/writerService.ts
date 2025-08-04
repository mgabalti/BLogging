import api from '@/lib/api';
import { WriterProfile, UpdateWriterProfileRequest } from '@/types';

export const writerService = {
  // Get writer profile by user ID
  async getWriterProfile(userId: string): Promise<WriterProfile> {
    const response = await api.get<WriterProfile>(`/writers/${userId}`);
    return response.data;
  },

  // Update writer profile
  async updateWriterProfile(userId: string, profileData: UpdateWriterProfileRequest): Promise<WriterProfile> {
    const response = await api.put<WriterProfile>(`/writers/${userId}`, profileData);
    return response.data;
  },
}; 