import axiosInstance from '@/services/axiosInstance';
import type { DashboardStats, User, Resource } from '@/types';

export const adminService = {
    async getStats(): Promise<DashboardStats> {
        const { data } = await axiosInstance.get<DashboardStats>('/admin/stats');
        return data;
    },

    async getUsers(): Promise<User[]> {
        const { data } = await axiosInstance.get<User[]>('/admin/users');
        return data;
    },

    async updateUser(id: string, updates: Partial<User>): Promise<User> {
        const { data } = await axiosInstance.put<User>(`/admin/users/${id}`, updates);
        return data;
    },

    async deleteUser(id: string): Promise<void> {
        await axiosInstance.delete(`/admin/users/${id}`);
    },

    async getPendingResources(): Promise<Resource[]> {
        const { data } = await axiosInstance.get<Resource[]>('/admin/resources/pending');
        return data;
    },

    async validateResource(id: string): Promise<Resource> {
        const { data } = await axiosInstance.patch<Resource>(`/admin/resources/${id}/validate`);
        return data;
    },

    async rejectResource(id: string): Promise<void> {
        await axiosInstance.delete(`/admin/resources/${id}`);
    },
};
