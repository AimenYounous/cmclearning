import { useState, useEffect } from 'react';
import { Card, LoadingSpinner } from '@/components/ui';
import { adminService } from '../services/adminService';
import { formatDate } from '@/utils/helpers';
<<<<<<< HEAD:src/features/admin/pages/AdminDashboard.jsx
import { HiOutlineUsers, HiOutlineBookOpen, HiOutlineFolder, HiOutlineChatAlt2, HiOutlineClock, HiOutlineExclamation, } from 'react-icons/hi';
const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
=======
import {
    HiOutlineUsers,
    HiOutlineBookOpen,
    HiOutlineFolder,
    HiOutlineChatAlt2,
    HiOutlineClock,
    HiOutlineExclamation,
} from 'react-icons/hi';
import '../styles/admin.css';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
>>>>>>> ayyoub:src/features/admin/pages/AdminDashboard.tsx
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        adminService.getStats().then((data) => {
            setStats(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);
    if (loading)
        return <LoadingSpinner text="Chargement du tableau de bord..."/>;
    const statCards = [
        { label: 'Utilisateurs', value: stats?.totalUsers ?? 0, icon: HiOutlineUsers, bgClass: 'bg-gradient-to-br from-blue-500 to-indigo-500' },
        { label: 'Cours', value: stats?.totalCourses ?? 0, icon: HiOutlineBookOpen, bgClass: 'bg-gradient-to-br from-emerald-500 to-teal-500' },
        { label: 'Ressources', value: stats?.totalResources ?? 0, icon: HiOutlineFolder, bgClass: 'bg-gradient-to-br from-amber-500 to-orange-500' },
        { label: 'Questions', value: stats?.totalQuestions ?? 0, icon: HiOutlineChatAlt2, bgClass: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    ];
<<<<<<< HEAD:src/features/admin/pages/AdminDashboard.jsx
    return (<div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
                <p className="text-text-muted text-sm mt-1">Vue d'ensemble de la plateforme</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s) => (<Card key={s.label} className="relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} opacity-10 -translate-y-6 translate-x-6`}/>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                                <s.icon className="w-6 h-6 text-white"/>
=======

    return (
        <div className="admin-dashboard-wrapper">
            <div className="admin-header">
                <h1 className="admin-title">Tableau de bord Admin</h1>
                <p className="admin-subtitle">Vue d'ensemble de la plateforme</p>
            </div>

            <div className="admin-stats-grid">
                {statCards.map((s) => (
                    <Card key={s.label} className="admin-stat-card">
                        <div className={`admin-stat-card-bg ${s.bgClass}`} />
                        <div className="admin-stat-content">
                            <div className={`admin-stat-icon-wrapper ${s.bgClass}`}>
                                <s.icon className="admin-stat-icon" />
>>>>>>> ayyoub:src/features/admin/pages/AdminDashboard.tsx
                            </div>
                            <div>
                                <p className="admin-stat-value">{s.value}</p>
                                <p className="admin-stat-label">{s.label}</p>
                            </div>
                        </div>
                    </Card>))}
            </div>

<<<<<<< HEAD:src/features/admin/pages/AdminDashboard.jsx
            {/* Pending resources alert */}
            {(stats?.pendingResources ?? 0) > 0 && (<Card className="border-warning/30 bg-warning/5">
                    <div className="flex items-center gap-3">
                        <HiOutlineExclamation className="w-6 h-6 text-warning flex-shrink-0"/>
=======
            {(stats?.pendingResources ?? 0) > 0 && (
                <Card className="admin-alert-card">
                    <div className="admin-alert-content">
                        <HiOutlineExclamation className="admin-alert-icon" />
>>>>>>> ayyoub:src/features/admin/pages/AdminDashboard.tsx
                        <div>
                            <p className="admin-alert-title">Ressources en attente</p>
                            <p className="admin-alert-desc">{stats?.pendingResources} ressource(s) nécessitent une validation</p>
                        </div>
                    </div>
                </Card>)}

            <Card>
<<<<<<< HEAD:src/features/admin/pages/AdminDashboard.jsx
                <h2 className="text-lg font-semibold mb-4">Utilisateurs par rôle</h2>
                <div className="grid grid-cols-3 gap-4">
                    {stats?.usersByRole.map((entry) => (<div key={entry.role} className="text-center p-4 rounded-xl bg-white/3">
                            <p className="text-2xl font-bold gradient-text">{entry.count}</p>
                            <p className="text-sm text-text-muted capitalize mt-1">{entry.role}s</p>
                        </div>))}
=======
                <h2 className="admin-section-title">Utilisateurs par rôle</h2>
                <div className="admin-roles-grid">
                    {stats?.usersByRole.map((entry) => (
                        <div key={entry.role} className="admin-role-card">
                            <p className="admin-role-count gradient-text">{entry.count}</p>
                            <p className="admin-role-name">{entry.role}s</p>
                        </div>
                    ))}
>>>>>>> ayyoub:src/features/admin/pages/AdminDashboard.tsx
                </div>
            </Card>

            <Card>
<<<<<<< HEAD:src/features/admin/pages/AdminDashboard.jsx
                <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
                <div className="space-y-3">
                    {stats?.recentActivity.map((item) => (<div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
                            <HiOutlineClock className="w-4 h-4 text-text-muted flex-shrink-0"/>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm">{item.description}</p>
                                <p className="text-xs text-text-muted mt-0.5">{formatDate(item.createdAt)}</p>
                            </div>
                        </div>))}
                    {(!stats?.recentActivity || stats.recentActivity.length === 0) && (<p className="text-sm text-text-muted text-center py-4">Aucune activité récente</p>)}
=======
                <h2 className="admin-section-title">Activité récente</h2>
                <div className="admin-activity-list">
                    {stats?.recentActivity.map((item) => (
                        <div key={item.id} className="admin-activity-item">
                            <HiOutlineClock className="admin-activity-icon" />
                            <div className="admin-activity-content">
                                <p className="admin-activity-desc">{item.description}</p>
                                <p className="admin-activity-time">{formatDate(item.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                    {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                        <p className="admin-activity-empty">Aucune activité récente</p>
                    )}
>>>>>>> ayyoub:src/features/admin/pages/AdminDashboard.tsx
                </div>
            </Card>
        </div>);
};
export default AdminDashboard;
