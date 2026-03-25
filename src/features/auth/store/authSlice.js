import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';
const initialState = {
    user: storage.getUser(),
    token: storage.getToken(),
    isAuthenticated: !!storage.getToken(),
    isLoading: false,
    error: null,
};
/**
 * Extract a human-readable error message from an Error or unknown.
 */
function extractErrorMessage(error, fallback) {
    if (error instanceof Error)
        return error.message;
    if (typeof error === 'string')
        return error;
    return fallback;
}
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await authService.login(credentials);
        storage.setToken(response.token);
        storage.setUser(response.user);
        return response;
    }
    catch (error) {
        return rejectWithValue(extractErrorMessage(error, 'Échec de la connexion'));
    }
});
export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await authService.register(data);
        storage.setToken(response.token);
        storage.setUser(response.user);
        return response;
    }
    catch (error) {
        return rejectWithValue(extractErrorMessage(error, "Échec de l'inscription"));
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            storage.clearAuth();
        },
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action) => {
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
            state.error = action.payload;
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
            state.error = action.payload;
        });
    },
});
export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
