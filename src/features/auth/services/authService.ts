import axiosInstance from '@/services/axiosInstance';
import type { LoginCredentials, RegisterData, User } from '@/types';

interface AuthResponse {
    user: User;
    token: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    async register(userData: RegisterData): Promise<AuthResponse> {
        const { data } = await axiosInstance.post<AuthResponse>('/auth/register', userData);
        return data;
    },

    async getMe(): Promise<User> {
        const { data } = await axiosInstance.get<User>('/auth/me');
        return data;
    },

    async updateProfile(updates: Partial<User>): Promise<User> {
        const { data } = await axiosInstance.put<User>('/auth/profile', updates);
        return data;
    },
};
