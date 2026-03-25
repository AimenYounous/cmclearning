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
        /** Check if the current user has one of the given roles */
        hasRole: (...roles) => !!auth.user && roles.includes(auth.user.role),
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError()),
    };
}
