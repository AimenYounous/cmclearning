import axiosInstance from '@/services/axiosInstance';
import type { Resource } from '@/types';

export const resourcesService = {
    async getAll(params: { speciality?: string; year?: number; type?: string } = {}): Promise<Resource[]> {
        const { data } = await axiosInstance.get<Resource[]>('/resources', { params });
        return data;
    },

    async upload(formData: FormData): Promise<Resource> {
        const { data } = await axiosInstance.post<Resource>('/resources', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },

    async download(id: string): Promise<Blob> {
        const { data } = await axiosInstance.get(`/resources/${id}/download`, {
            responseType: 'blob',
        });
        return data;
    },

    async validate(id: string): Promise<Resource> {
        const { data } = await axiosInstance.patch<Resource>(`/resources/${id}/validate`);
        return data;
    },

    async delete(id: string): Promise<void> {
        await axiosInstance.delete(`/resources/${id}`);
    },
};
