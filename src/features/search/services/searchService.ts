import axiosInstance from '@/services/axiosInstance';
import type { Course } from '@/types';

export const searchService = {
    async searchCourses(params: {
        q?: string;
        speciality?: string;
        year?: number;
    }): Promise<Course[]> {
        const { data } = await axiosInstance.get<Course[]>('/search', { params });
        return data;
    },
};
