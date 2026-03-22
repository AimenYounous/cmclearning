import { useState, useEffect } from 'react';
import { Card, LoadingSpinner } from '@/components/ui';
import { adminService } from '../services/adminService';
import type { DashboardStats } from '@/types';
import { formatDate } from '@/utils/helpers';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService.getStats().then((data) => {
            setStats(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner text="Chargement du tableau de bord..." />;

    const statCards = [
        { label: 'Utilisateurs', value: stats?.totalUsers ?? 0, icon: HiOutlineUsers, bgClass: 'bg-gradient-to-br from-blue-500 to-indigo-500' },
        { label: 'Cours', value: stats?.totalCourses ?? 0, icon: HiOutlineBookOpen, bgClass: 'bg-gradient-to-br from-emerald-500 to-teal-500' },
        { label: 'Ressources', value: stats?.totalResources ?? 0, icon: HiOutlineFolder, bgClass: 'bg-gradient-to-br from-amber-500 to-orange-500' },
        { label: 'Questions', value: stats?.totalQuestions ?? 0, icon: HiOutlineChatAlt2, bgClass: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    ];

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
                            </div>
                            <div>
                                <p className="admin-stat-value">{s.value}</p>
                                <p className="admin-stat-label">{s.label}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {(stats?.pendingResources ?? 0) > 0 && (
                <Card className="admin-alert-card">
                    <div className="admin-alert-content">
                        <HiOutlineExclamation className="admin-alert-icon" />
                        <div>
                            <p className="admin-alert-title">Ressources en attente</p>
                            <p className="admin-alert-desc">{stats?.pendingResources} ressource(s) nécessitent une validation</p>
                        </div>
                    </div>
                </Card>
            )}

            <Card>
                <h2 className="admin-section-title">Utilisateurs par rôle</h2>
                <div className="admin-roles-grid">
                    {stats?.usersByRole.map((entry) => (
                        <div key={entry.role} className="admin-role-card">
                            <p className="admin-role-count gradient-text">{entry.count}</p>
                            <p className="admin-role-name">{entry.role}s</p>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
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
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
