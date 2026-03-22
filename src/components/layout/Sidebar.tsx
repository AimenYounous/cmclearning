import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import {
    HiOutlineHome,
    HiOutlineBookOpen,
    HiOutlineFolder,
    HiOutlineChatAlt2,
    HiOutlineUser,
    HiOutlineCog,
    HiOutlineChartBar,
    HiOutlineX,
} from 'react-icons/hi';
import './styles/layout.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigationItems = [
    { to: '/dashboard', icon: HiOutlineHome, label: 'Tableau de bord' },
    { to: '/courses', icon: HiOutlineBookOpen, label: 'Cours' },
    { to: '/resources', icon: HiOutlineFolder, label: 'Ressources' },
    { to: '/forum', icon: HiOutlineChatAlt2, label: 'Forum' },
    { to: '/profile', icon: HiOutlineUser, label: 'Profil' },
];

const adminItems = [
    { to: '/admin', icon: HiOutlineChartBar, label: 'Administration' },
    { to: '/admin/users', icon: HiOutlineCog, label: 'Utilisateurs' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user } = useAppSelector((state) => state.auth);
    const isAdmin = user?.role === 'admin';
    const isFormateur = user?.role === 'formateur';

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `nav-link-custom ${isActive ? 'active' : ''}`;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="sidebar-overlay d-lg-none"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar-wrapper ${isOpen ? 'open' : ''}`}
            >
                <div className="d-flex flex-column h-100">
                    {/* Header in sidebar for mobile */}
                    <div className="d-lg-none d-flex align-items-center px-3 border-bottom" style={{ height: '4rem', borderColor: '#e5e7eb' }}>
                        <button
                            onClick={onClose}
                            className="btn btn-light p-2 border-0"
                        >
                            <HiOutlineX style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-1">
                        <p className="nav-section-title">
                            Navigation
                        </p>
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={linkClasses}
                                onClick={onClose}
                            >
                                <item.icon style={{ width: '1.25rem', height: '1.25rem' }} />
                                {item.label}
                            </NavLink>
                        ))}

                        {(isAdmin || isFormateur) && (
                            <>
                                <hr className="my-3 text-muted opacity-25" />
                                <p className="nav-section-title">
                                    {isAdmin ? 'Administration' : 'Formateur'}
                                </p>
                                {isAdmin &&
                                    adminItems.map((item) => (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            className={linkClasses}
                                            onClick={onClose}
                                        >
                                            <item.icon style={{ width: '1.25rem', height: '1.25rem' }} />
                                            {item.label}
                                        </NavLink>
                                    ))}
                                {isFormateur && (
                                    <NavLink
                                        to="/courses/create"
                                        className={linkClasses}
                                        onClick={onClose}
                                    >
                                        <HiOutlineBookOpen style={{ width: '1.25rem', height: '1.25rem' }} />
                                        Créer un cours
                                    </NavLink>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Footer */}
                    <div className="sidebar-footer">
                        <p className="mb-0">
                            CMC-Learning © 2026
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
