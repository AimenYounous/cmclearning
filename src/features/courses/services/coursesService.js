import axiosInstance from '@/services/axiosInstance';
export const coursesService = {
    async getAll(params = {}) {
        const { data } = await axiosInstance.get('/courses', { params });
        return data;
    },
    async getById(id) {
        const { data } = await axiosInstance.get(`/courses/${id}`);
        return data;
    },
    async create(courseData) {
        const formData = new FormData();
        Object.entries(courseData).forEach(([key, value]) => {
            if (value !== undefined)
                formData.append(key, value);
        });
        const { data } = await axiosInstance.post('/courses', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },
    async update(id, courseData) {
        const { data } = await axiosInstance.put(`/courses/${id}`, courseData);
        return data;
    },
    async delete(id) {
        await axiosInstance.delete(`/courses/${id}`);
    },
};
