import axiosInstance from '@/services/axiosInstance';
export const adminService = {
    async getStats() {
        const { data } = await axiosInstance.get('/admin/stats');
        return data;
    },
    async getUsers() {
        const { data } = await axiosInstance.get('/admin/users');
        return data;
    },
    async updateUser(id, updates) {
        const { data } = await axiosInstance.put(`/admin/users/${id}`, updates);
        return data;
    },
    async deleteUser(id) {
        await axiosInstance.delete(`/admin/users/${id}`);
    },
    async getPendingResources() {
        const { data } = await axiosInstance.get('/admin/resources/pending');
        return data;
    },
    async validateResource(id) {
        const { data } = await axiosInstance.patch(`/admin/resources/${id}/validate`);
        return data;
    },
    async rejectResource(id) {
        await axiosInstance.delete(`/admin/resources/${id}`);
    },
};
