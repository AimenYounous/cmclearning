import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Resource } from '@/types';
import { resourcesService } from '../services/resourcesService';

interface ResourcesState {
    resources: Resource[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ResourcesState = {
    resources: [],
    isLoading: false,
    error: null,
};

export const fetchResources = createAsyncThunk(
    'resources/fetchAll',
    async (params: { speciality?: string; year?: number; type?: string } = {}, { rejectWithValue }) => {
        try {
            return await resourcesService.getAll(params);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'Erreur');
        }
    }
);

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResources.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(fetchResources.fulfilled, (state, action) => { state.isLoading = false; state.resources = action.payload; })
            .addCase(fetchResources.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
    },
});

export default resourcesSlice.reducer;
