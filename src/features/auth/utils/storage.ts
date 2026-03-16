import type { User } from '@/types';

const MOCK_USERS_KEY = 'cmc_mock_users';
const AUTH_TOKEN_KEY = 'cmc_token';
const AUTH_USER_KEY = 'cmc_user';

export const storage = {
    // ===== Auth State =====
    getToken: (): string | null => localStorage.getItem(AUTH_TOKEN_KEY),
    setToken: (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token),
    removeToken: (): void => localStorage.removeItem(AUTH_TOKEN_KEY),

    getUser: (): User | null => {
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr) as User;
        } catch {
            return null;
        }
    },
    setUser: (user: User): void => localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user)),
    removeUser: (): void => localStorage.removeItem(AUTH_USER_KEY),

    clearAuth: (): void => {
        storage.removeToken();
        storage.removeUser();
    },

    // ===== Mock DB (Test Users) =====
    getMockUsers: (): User[] => {
        const usersStr = localStorage.getItem(MOCK_USERS_KEY);
        return usersStr ? JSON.parse(usersStr) : [];
    },
    setMockUsers: (users: User[]): void => {
        localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    },

    initializeMockUsers: (initialUsers: User[]): User[] => {
        const existingUsers = storage.getMockUsers();
        if (existingUsers.length === 0) {
            storage.setMockUsers(initialUsers);
            return initialUsers;
        }
        return existingUsers;
    },
};
