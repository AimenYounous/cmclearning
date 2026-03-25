import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../services/forumService';
const initialState = {
    questions: [],
    currentQuestion: null,
    isLoading: false,
    error: null,
};
export const fetchQuestions = createAsyncThunk('forum/fetchAll', async (params = {}, { rejectWithValue }) => {
    try {
        return await forumService.getAll(params);
    }
    catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Erreur');
    }
});
export const fetchQuestionById = createAsyncThunk('forum/fetchById', async (id, { rejectWithValue }) => {
    try {
        return await forumService.getById(id);
    }
    catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Erreur');
    }
});
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
            .addCase(fetchQuestions.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(fetchQuestionById.pending, (state) => { state.isLoading = true; })
            .addCase(fetchQuestionById.fulfilled, (state, action) => { state.isLoading = false; state.currentQuestion = action.payload; })
            .addCase(fetchQuestionById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    },
});
export const { clearCurrentQuestion } = forumSlice.actions;
export default forumSlice.reducer;
