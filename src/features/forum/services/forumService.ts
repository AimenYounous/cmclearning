import axiosInstance from '@/services/axiosInstance';
import type { Question, Answer } from '@/types';

export const forumService = {
    async getAll(params: { search?: string; tag?: string } = {}): Promise<Question[]> {
        const { data } = await axiosInstance.get<Question[]>('/forum/questions', { params });
        return data;
    },

    async getById(id: string): Promise<Question> {
        const { data } = await axiosInstance.get<Question>(`/forum/questions/${id}`);
        return data;
    },

    async createQuestion(question: { title: string; body: string; tags: string[] }): Promise<Question> {
        const { data } = await axiosInstance.post<Question>('/forum/questions', question);
        return data;
    },

    async createAnswer(questionId: string, body: string): Promise<Answer> {
        const { data } = await axiosInstance.post<Answer>(`/forum/questions/${questionId}/answers`, { body });
        return data;
    },

    async voteQuestion(id: string, direction: 'up' | 'down'): Promise<void> {
        await axiosInstance.post(`/forum/questions/${id}/vote`, { direction });
    },

    async voteAnswer(id: string, direction: 'up' | 'down'): Promise<void> {
        await axiosInstance.post(`/forum/answers/${id}/vote`, { direction });
    },

    async acceptAnswer(answerId: string): Promise<void> {
        await axiosInstance.patch(`/forum/answers/${answerId}/accept`);
    },
};
