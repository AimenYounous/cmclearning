import axiosInstance from '@/services/axiosInstance';
import type { Course, CourseFormData, PaginatedResponse } from '@/types';

export const coursesService = {
    async getAll(params: {
        page?: number;
        speciality?: string;
        year?: number;
        search?: string;
    } = {}): Promise<PaginatedResponse<Course>> {
        const { data } = await axiosInstance.get<PaginatedResponse<Course>>('/courses', { params });
        return data;
    },

    async getById(id: string): Promise<Course> {
        const { data } = await axiosInstance.get<Course>(`/courses/${id}`);
        return data;
    },

    async create(courseData: CourseFormData): Promise<Course> {
        const formData = new FormData();
        Object.entries(courseData).forEach(([key, value]) => {
            if (value !== undefined) formData.append(key, value as string | Blob);
        });
        const { data } = await axiosInstance.post<Course>('/courses', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },

    async update(id: string, courseData: Partial<CourseFormData>): Promise<Course> {
        const { data } = await axiosInstance.put<Course>(`/courses/${id}`, courseData);
        return data;
    },

    async delete(id: string): Promise<void> {
        await axiosInstance.delete(`/courses/${id}`);
    },
};
