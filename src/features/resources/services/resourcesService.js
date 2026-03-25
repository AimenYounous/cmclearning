import axiosInstance from '@/services/axiosInstance';
export const resourcesService = {
    async getAll(params = {}) {
        const { data } = await axiosInstance.get('/resources', { params });
        return data;
    },
    async upload(formData) {
        const { data } = await axiosInstance.post('/resources', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },
    async download(id) {
        const { data } = await axiosInstance.get(`/resources/${id}/download`, {
            responseType: 'blob',
        });
        return data;
    },
    async validate(id) {
        const { data } = await axiosInstance.patch(`/resources/${id}/validate`);
        return data;
    },
    async delete(id) {
        await axiosInstance.delete(`/resources/${id}`);
    },
};
