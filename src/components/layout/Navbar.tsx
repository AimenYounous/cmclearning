import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/features/auth/store/authSlice';
import { HiOutlineSearch, HiOutlineBell, HiOutlineLogout, HiMenuAlt2 } from 'react-icons/hi';
import { getInitials } from '@/utils/helpers';

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="glass-strong sticky top-0 z-40 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <HiMenuAlt2 className="w-5 h-5" />
                    </button>
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center font-bold text-sm">
                            CMC
                        </div>
                        <span className="text-lg font-bold gradient-text hidden sm:block">
                            CMC-Learning
                        </span>
                    </Link>
                </div>

                {/* Search */}
                <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Rechercher des cours, ressources..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(`/search?q=${(e.target as HTMLInputElement).value}`);
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <HiOutlineBell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
                    </button>

                    {user && (
                        <div className="flex items-center gap-3 ml-2">
                            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-xs font-bold">
                                {getInitials(user.firstName, user.lastName)}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium leading-tight">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-text-muted capitalize">{user.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg hover:bg-danger/20 text-text-muted hover:text-danger transition-colors"
                                title="Déconnexion"
                            >
                                <HiOutlineLogout className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
