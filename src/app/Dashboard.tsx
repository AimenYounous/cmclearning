import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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
    const { user } = useAuth();
    const navigate = useNavigate();

    const quickLinks = [
        { label: 'Mes Cours', icon: HiOutlineBookOpen, to: '/courses', iconClass: 'icon-indigo' },
        { label: 'Ressources', icon: HiOutlineFolder, to: '/resources', iconClass: 'icon-emerald' },
        { label: 'Forum', icon: HiOutlineChatAlt2, to: '/forum', iconClass: 'icon-pink' },
        { label: 'Recherche', icon: HiOutlineSearch, to: '/search', iconClass: 'icon-amber' },
    ];

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
                    </div>
                    <h1 className="dash-hero-title">
                        Bienvenue, {user?.firstName} ! 👋
                    </h1>
                    <p className="dash-hero-subtitle">
                        Continuez votre apprentissage. Explorez les cours, participez au forum et accédez aux ressources pédagogiques.
                    </p>
                </div>
            </div>

            

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
            </div>
        </div>
    );
};

export default Dashboard;
