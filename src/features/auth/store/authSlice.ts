import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials, RegisterData, User } from '@/types';
import { authService } from '../services/authService';

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('cmc_user') || 'null'),
    token: localStorage.getItem('cmc_token'),
    isAuthenticated: !!localStorage.getItem('cmc_token'),
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('cmc_token', response.token);
            localStorage.setItem('cmc_user', JSON.stringify(response.user));
            return response;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Échec de la connexion';
            return rejectWithValue(message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            const response = await authService.register(data);
            localStorage.setItem('cmc_token', response.token);
            localStorage.setItem('cmc_user', JSON.stringify(response.user));
            return response;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Échec de l'inscription";
            return rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('cmc_token');
            localStorage.removeItem('cmc_user');
        },
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
