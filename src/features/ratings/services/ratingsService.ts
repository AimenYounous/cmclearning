import axiosInstance from '@/services/axiosInstance';
import type { Rating } from '@/types';

export const ratingsService = {
    async getByCourse(courseId: string): Promise<Rating[]> {
        const { data } = await axiosInstance.get<Rating[]>(`/courses/${courseId}/ratings`);
        return data;
    },

    async create(courseId: string, rating: { value: number; comment?: string }): Promise<Rating> {
        const { data } = await axiosInstance.post<Rating>(`/courses/${courseId}/ratings`, rating);
        return data;
    },

    async update(ratingId: string, updates: { value: number; comment?: string }): Promise<Rating> {
        const { data } = await axiosInstance.put<Rating>(`/ratings/${ratingId}`, updates);
        return data;
    },

    async delete(ratingId: string): Promise<void> {
        await axiosInstance.delete(`/ratings/${ratingId}`);
    },
};
