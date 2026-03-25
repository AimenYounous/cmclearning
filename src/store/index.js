import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import coursesReducer from '@/features/courses/store/coursesSlice';
import forumReducer from '@/features/forum/store/forumSlice';
import resourcesReducer from '@/features/resources/store/resourcesSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
        forum: forumReducer,
        resources: resourcesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['auth/setCredentials'],
        },
    }),
    devTools: import.meta.env.DEV,
});
