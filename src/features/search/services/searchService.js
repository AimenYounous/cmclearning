import axiosInstance from '@/services/axiosInstance';
export const searchService = {
    async searchCourses(params) {
        const { data } = await axiosInstance.get('/search', { params });
        return data;
    },
};
