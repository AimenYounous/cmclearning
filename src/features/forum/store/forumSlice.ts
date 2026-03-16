import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Question } from '@/types';
import { forumService } from '../services/forumService';

interface ForumState {
    questions: Question[];
    currentQuestion: Question | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ForumState = {
    questions: [],
    currentQuestion: null,
    isLoading: false,
    error: null,
};

export const fetchQuestions = createAsyncThunk(
    'forum/fetchAll',
    async (params: { search?: string; tag?: string } = {}, { rejectWithValue }) => {
        try {
            return await forumService.getAll(params);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'Erreur');
        }
    }
);

export const fetchQuestionById = createAsyncThunk(
    'forum/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await forumService.getById(id);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'Erreur');
        }
    }
);

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        clearCurrentQuestion: (state) => { state.currentQuestion = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(fetchQuestions.fulfilled, (state, action) => { state.isLoading = false; state.questions = action.payload; })
            .addCase(fetchQuestions.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
            .addCase(fetchQuestionById.pending, (state) => { state.isLoading = true; })
            .addCase(fetchQuestionById.fulfilled, (state, action) => { state.isLoading = false; state.currentQuestion = action.payload; })
            .addCase(fetchQuestionById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
    },
});

export const { clearCurrentQuestion } = forumSlice.actions;
export default forumSlice.reducer;
