import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
    if (isLoading) {
        return (<div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"/>
            </div>);
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet />;
};
export default ProtectedRoute;
