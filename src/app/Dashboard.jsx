import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD:src/app/Dashboard.jsx
import { HiOutlineBookOpen, HiOutlineFolder, HiOutlineChatAlt2, HiOutlineSearch, HiOutlineAcademicCap, HiOutlineTrendingUp, } from 'react-icons/hi';
const Dashboard = () => {
=======
import {
    HiOutlineBookOpen,
    HiOutlineFolder,
    HiOutlineChatAlt2,
    HiOutlineSearch,
    HiOutlineTrendingUp,
} from 'react-icons/hi';
import logo from '@/assets/logo.png';
import '@/styles/dashboard.css';

const Dashboard: React.FC = () => {
>>>>>>> ayyoub:src/app/Dashboard.tsx
    const { user } = useAuth();
    const navigate = useNavigate();
    const quickLinks = [
        { label: 'Mes Cours', icon: HiOutlineBookOpen, to: '/courses', iconClass: 'icon-indigo' },
        { label: 'Ressources', icon: HiOutlineFolder, to: '/resources', iconClass: 'icon-emerald' },
        { label: 'Forum', icon: HiOutlineChatAlt2, to: '/forum', iconClass: 'icon-pink' },
        { label: 'Recherche', icon: HiOutlineSearch, to: '/search', iconClass: 'icon-amber' },
    ];
<<<<<<< HEAD:src/app/Dashboard.jsx
    return (<div className="space-y-8">
            {/* Welcome hero */}
            <div className="glass-strong rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
                <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                        <HiOutlineAcademicCap className="w-6 h-6 text-primary-light"/>
                        <span className="text-sm text-primary-light font-medium">CMC-Learning</span>
=======

    return (
        <div className="d-flex flex-column gap-4">
            {/* Welcome Hero */}
            <div className="dash-hero dash-fade-in">
                <div className="dash-hero-glow-1" />
                <div className="dash-hero-glow-2" />
                <div className="position-relative" style={{ zIndex: 1 }}>
                    <div className="dash-hero-badge">
                        <img src={logo} alt="CMC Logo" className="dash-hero-badge-logo" />
                        <span>CMC-Learning</span>
>>>>>>> ayyoub:src/app/Dashboard.tsx
                    </div>
                    <h1 className="dash-hero-title">
                        Bienvenue, {user?.firstName} ! 👋
                    </h1>
                    <p className="dash-hero-subtitle">
                        Continuez votre apprentissage. Explorez les cours, participez au forum et accédez aux ressources pédagogiques.
                    </p>
                </div>
            </div>

<<<<<<< HEAD:src/app/Dashboard.jsx
            {/* Quick links */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Accès rapide</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (<Card key={link.label} hover onClick={() => navigate(link.to)} className="text-center py-8 group">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                <link.icon className="w-7 h-7 text-white"/>
                            </div>
                            <p className="font-semibold text-sm">{link.label}</p>
                        </Card>))}
                </div>
            </div>

            {/* Stats placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10 -translate-y-4 translate-x-4"/>
                    <div className="flex items-center gap-3">
                        <HiOutlineBookOpen className="w-8 h-8 text-primary-light"/>
                        <div>
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-sm text-text-muted">Cours suivis</p>
                        </div>
                    </div>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 -translate-y-4 translate-x-4"/>
                    <div className="flex items-center gap-3">
                        <HiOutlineTrendingUp className="w-8 h-8 text-success"/>
                        <div>
                            <p className="text-2xl font-bold">85%</p>
                            <p className="text-sm text-text-muted">Progression</p>
                        </div>
                    </div>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 opacity-10 -translate-y-4 translate-x-4"/>
                    <div className="flex items-center gap-3">
                        <HiOutlineChatAlt2 className="w-8 h-8 text-secondary"/>
                        <div>
                            <p className="text-2xl font-bold">7</p>
                            <p className="text-sm text-text-muted">Questions posées</p>
                        </div>
                    </div>
                </Card>
=======
            

            {/* Stats */}
            <div className="dash-stats-grid dash-fade-in delay-2">
                <div className="dash-stat-card">
                    <div className="dash-stat-glow glow-indigo" />
                    <div className="d-flex align-items-center gap-3">
                        <div className="dash-stat-icon stat-indigo">
                            <HiOutlineBookOpen />
                        </div>
                        <div>
                            <p className="dash-stat-value">12</p>
                            <p className="dash-stat-label">Cours suivis</p>
                        </div>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-glow glow-emerald" />
                    <div className="d-flex align-items-center gap-3">
                        <div className="dash-stat-icon stat-emerald">
                            <HiOutlineTrendingUp />
                        </div>
                        <div>
                            <p className="dash-stat-value">85%</p>
                            <p className="dash-stat-label">Progression</p>
                        </div>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-glow glow-amber" />
                    <div className="d-flex align-items-center gap-3">
                        <div className="dash-stat-icon stat-amber">
                            <HiOutlineChatAlt2 />
                        </div>
                        <div>
                            <p className="dash-stat-value">7</p>
                            <p className="dash-stat-label">Questions posées</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="dash-fade-in delay-1">
                <h2 className="dash-section-title">Accès rapide</h2>
                <div className="dash-quick-grid">
                    {quickLinks.map((link) => (
                        <div
                            key={link.label}
                            className="dash-quick-card"
                            onClick={() => navigate(link.to)}
                        >
                            <div className={`dash-quick-icon ${link.iconClass}`}>
                                <link.icon />
                            </div>
                            <p className="dash-quick-label">{link.label}</p>
                        </div>
                    ))}
                </div>
>>>>>>> ayyoub:src/app/Dashboard.tsx
            </div>
        </div>);
};
export default Dashboard;
