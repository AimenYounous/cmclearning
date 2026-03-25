import axiosInstance from '@/services/axiosInstance';
export const forumService = {
    async getAll(params = {}) {
        const { data } = await axiosInstance.get('/forum/questions', { params });
        return data;
    },
    async getById(id) {
        const { data } = await axiosInstance.get(`/forum/questions/${id}`);
        return data;
    },
    async createQuestion(question) {
        const { data } = await axiosInstance.post('/forum/questions', question);
        return data;
    },
    async createAnswer(questionId, body) {
        const { data } = await axiosInstance.post(`/forum/questions/${questionId}/answers`, { body });
        return data;
    },
    async voteQuestion(id, direction) {
        await axiosInstance.post(`/forum/questions/${id}/vote`, { direction });
    },
    async voteAnswer(id, direction) {
        await axiosInstance.post(`/forum/answers/${id}/vote`, { direction });
    },
    async acceptAnswer(answerId) {
        await axiosInstance.patch(`/forum/answers/${answerId}/accept`);
    },
};
