import { useAppSelector, useAppDispatch } from '@/hooks';
import { logout, clearError } from '../store/authSlice';

export function useAuth() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    return {
        ...auth,
        isFormateur: auth.user?.role === 'formateur',
        isAdmin: auth.user?.role === 'admin',
        isStagiaire: auth.user?.role === 'stagiaire',
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError()),
    };
}
