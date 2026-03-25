import axiosInstance from '@/services/axiosInstance';
export const ratingsService = {
    async getByCourse(courseId) {
        const { data } = await axiosInstance.get(`/courses/${courseId}/ratings`);
        return data;
    },
    async create(courseId, rating) {
        const { data } = await axiosInstance.post(`/courses/${courseId}/ratings`, rating);
        return data;
    },
    async update(ratingId, updates) {
        const { data } = await axiosInstance.put(`/ratings/${ratingId}`, updates);
        return data;
    },
    async delete(ratingId) {
        await axiosInstance.delete(`/ratings/${ratingId}`);
    },
};
