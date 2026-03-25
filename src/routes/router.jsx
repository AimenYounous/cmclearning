import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import ProtectedRoute from './ProtectedRoute';
import RoleGuard from './RoleGuard';
// Auth pages
import { LoginPage, RegisterPage } from '@/features/auth';
// App pages
import Dashboard from '@/app/Dashboard';
import UnauthorizedPage from '@/app/UnauthorizedPage';
import NotFoundPage from '@/app/NotFoundPage';
// Feature pages
import { CoursesPage, CourseDetailsPage } from '@/features/courses';
import { ResourcesPage } from '@/features/resources';
import { ForumPage } from '@/features/forum';
import { SearchPage } from '@/features/search';
import { ProfilePage } from '@/features/profile';
import { AdminDashboard } from '@/features/admin';
const router = createBrowserRouter([
    // Public routes
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/unauthorized', element: <UnauthorizedPage /> },
    // Protected routes
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    // Common routes (all authenticated users)
                    { path: '/', element: <Dashboard /> },
                    { path: '/dashboard', element: <Dashboard /> },
                    { path: '/courses', element: <CoursesPage /> },
                    { path: '/courses/:id', element: <CourseDetailsPage /> },
                    { path: '/resources', element: <ResourcesPage /> },
                    { path: '/forum', element: <ForumPage /> },
                    { path: '/search', element: <SearchPage /> },
                    { path: '/profile', element: <ProfilePage /> },
                    // Admin routes
                    {
                        element: <RoleGuard allowedRoles={['admin']}/>,
                        children: [
                            { path: '/admin', element: <AdminDashboard /> },
                            { path: '/admin/users', element: <AdminDashboard /> },
                        ],
                    },
                    // Formateur routes
                    {
                        element: <RoleGuard allowedRoles={['formateur', 'admin']}/>,
                        children: [
                            { path: '/courses/create', element: <CoursesPage /> },
                            { path: '/courses/:id/edit', element: <CourseDetailsPage /> },
                        ],
                    },
                ],
            },
        ],
    },
    // 404
    { path: '*', element: <NotFoundPage /> },
]);
export default router;
