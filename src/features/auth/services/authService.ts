import type { LoginCredentials, RegisterData, User } from '@/types';
import { storage } from '../utils/storage';

interface AuthResponse {
    user: User;
    token: string;
}

// Simulated delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const INITIAL_USERS: User[] = [
    {
        id: 'admin-1',
        email: 'admin@cmc.ma',
        firstName: 'Admin',
        lastName: 'System',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'teacher-1',
        email: 'teacher@cmc.ma',
        firstName: 'Ahmed',
        lastName: 'Bennani',
        role: 'formateur',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'student-1',
        email: 'student@cmc.ma',
        firstName: 'Sami',
        lastName: 'Alami',
        role: 'stagiaire',
        speciality: 'Développement Digital',
        year: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Initialize mock DB on load
storage.initializeMockUsers(INITIAL_USERS);

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        await delay(800);
        const users = storage.getMockUsers();
        const user = users.find((u) => u.email === credentials.email);

        // In a real mock, we would check password too, but for local testing email is enough
        if (!user) {
            throw new Error('Utilisateur non trouvé ou identifiants incorrects');
        }

        const token = `mock_at_${user.id}_${Date.now()}`;
        return { user, token };
    },

    async register(userData: RegisterData): Promise<AuthResponse> {
        await delay(1000);
        const users = storage.getMockUsers();

        if (users.some((u) => u.email === userData.email)) {
            throw new Error('Cet email est déjà utilisé');
        }

        const newUser: User = {
            id: Math.random().toString(36).substring(2, 11),
            ...userData,
            createdAt: new Error().stack?.includes('admin') ? 'now' : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        users.push(newUser);
        storage.setMockUsers(users);

        const token = `mock_at_${newUser.id}_${Date.now()}`;
        return { user: newUser, token };
    },

    async getMe(): Promise<User> {
        await delay(300);
        const users = storage.getMockUsers();
        const currentUser = storage.getUser();

        if (!currentUser) throw new Error('Non authentifié');

        const user = users.find(u => u.id === currentUser.id);
        if (!user) throw new Error('Utilisateur non trouvé');

        return user;
    },

    async updateProfile(updates: Partial<User>): Promise<User> {
        await delay(800);
        const users = storage.getMockUsers();
        const currentUser = storage.getUser();

        if (!currentUser) throw new Error('Non authentifié');

        const index = users.findIndex(u => u.id === currentUser.id);
        if (index === -1) throw new Error('Utilisateur non trouvé');

        const updatedUser = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
        users[index] = updatedUser;

        storage.setMockUsers(users);
        storage.setUser(updatedUser);

        return updatedUser;
    },

    async changePassword(payload: {
        currentPassword: string;
        newPassword: string;
    }): Promise<void> {
        await delay(1000);
        // Mock success
        console.log('Password changed mock success', payload);
    },
};
