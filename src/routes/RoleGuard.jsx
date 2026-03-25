import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
const RoleGuard = ({ allowedRoles }) => {
    const { user } = useAppSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/login" replace/>;
    }
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace/>;
    }
    return <Outlet />;
};
export default RoleGuard;
