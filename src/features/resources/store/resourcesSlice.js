import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resourcesService } from '../services/resourcesService';
const initialState = {
    resources: [],
    isLoading: false,
    error: null,
};
export const fetchResources = createAsyncThunk('resources/fetchAll', async (params = {}, { rejectWithValue }) => {
    try {
        return await resourcesService.getAll(params);
    }
    catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Erreur');
    }
});
const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResources.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(fetchResources.fulfilled, (state, action) => { state.isLoading = false; state.resources = action.payload; })
            .addCase(fetchResources.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    },
});
export default resourcesSlice.reducer;
