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
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-primary/20 text-primary-light border border-primary/30 shadow-lg shadow-primary/10'
            : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
        }`;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-surface-light border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header in sidebar for mobile */}
                    <div className="h-16 flex items-center px-4 border-b border-white/5 lg:hidden">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10"
                        >
                            <HiOutlineX className="w-5 h-5 text-text-muted" />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                        <p className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Navigation
                        </p>
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={linkClasses}
                                onClick={onClose}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {item.label}
                            </NavLink>
                        ))}

                        {(isAdmin || isFormateur) && (
                            <>
                                <div className="my-4 border-t border-white/5" />
                                <p className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
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
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            {item.label}
                                        </NavLink>
                                    ))}
                                {isFormateur && (
                                    <NavLink
                                        to="/courses/create"
                                        className={linkClasses}
                                        onClick={onClose}
                                    >
                                        <HiOutlineBookOpen className="w-5 h-5 flex-shrink-0" />
                                        Créer un cours
                                    </NavLink>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <p className="text-xs text-text-muted text-center">
                            CMC-Learning © 2026
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
