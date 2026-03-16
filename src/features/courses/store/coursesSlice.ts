import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Course } from '@/types';
import { coursesService } from '../services/coursesService';

interface CoursesState {
    courses: Course[];
    currentCourse: Course | null;
    isLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
}

const initialState: CoursesState = {
    courses: [],
    currentCourse: null,
    isLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
};

export const fetchCourses = createAsyncThunk(
    'courses/fetchAll',
    async (params: { page?: number; speciality?: string; year?: number; search?: string } = {}, { rejectWithValue }) => {
        try {
            return await coursesService.getAll(params);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'Erreur lors du chargement');
        }
    }
);

export const fetchCourseById = createAsyncThunk(
    'courses/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await coursesService.getById(id);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'Cours non trouvé');
        }
    }
);

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        clearCurrentCourse: (state) => {
            state.currentCourse = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCourseById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentCourse = action.payload;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
