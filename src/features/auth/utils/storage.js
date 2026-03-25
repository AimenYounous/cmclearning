const MOCK_USERS_KEY = 'cmc_mock_users';
const AUTH_TOKEN_KEY = 'cmc_token';
const AUTH_USER_KEY = 'cmc_user';
export const storage = {
    // ===== Auth State =====
    getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
    setToken: (token) => localStorage.setItem(AUTH_TOKEN_KEY, token),
    removeToken: () => localStorage.removeItem(AUTH_TOKEN_KEY),
    getUser: () => {
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        if (!userStr)
            return null;
        try {
            return JSON.parse(userStr);
        }
        catch {
            return null;
        }
    },
    setUser: (user) => localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user)),
    removeUser: () => localStorage.removeItem(AUTH_USER_KEY),
    clearAuth: () => {
        storage.removeToken();
        storage.removeUser();
    },
    // ===== Mock DB (Test Users) =====
    getMockUsers: () => {
        const usersStr = localStorage.getItem(MOCK_USERS_KEY);
        return usersStr ? JSON.parse(usersStr) : [];
    },
    setMockUsers: (users) => {
        localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    },
    initializeMockUsers: (initialUsers) => {
        const existingUsers = storage.getMockUsers();
        if (existingUsers.length === 0) {
            storage.setMockUsers(initialUsers);
            return initialUsers;
        }
        return existingUsers;
    },
};
