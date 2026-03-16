import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import type { UserRole } from '@/types';

interface RoleGuardProps {
    allowedRoles: UserRole[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default RoleGuard;
