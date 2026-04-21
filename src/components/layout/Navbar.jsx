import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/features/auth/store/authSlice';
import { HiOutlineSearch, HiOutlineBell, HiOutlineLogout, HiMenuAlt2 } from 'react-icons/hi';
import { getInitials } from '@/utils/helpers';
<<<<<<< HEAD:src/components/layout/Navbar.jsx
const Navbar = ({ onToggleSidebar }) => {
=======
import logo from '@/assets/logo.png';
import './styles/layout.css';

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
>>>>>>> ayyoub:src/components/layout/Navbar.tsx
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
<<<<<<< HEAD:src/components/layout/Navbar.jsx
    return (<header className="glass-strong sticky top-0 z-40 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <HiMenuAlt2 className="w-5 h-5"/>
=======

    return (
        <header className="navbar-header sticky-top">
            <div className="d-flex align-items-center justify-content-between">
                {/* Left */}
                <div className="d-flex align-items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="d-lg-none btn btn-light p-2 border-0"
                    >
                        <HiMenuAlt2 className="ms-n1 me-n1" style={{ width: '1.25rem', height: '1.25rem' }} />
>>>>>>> ayyoub:src/components/layout/Navbar.tsx
                    </button>
                    <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
                        <div className="brand-logo">
                            <img src={logo} alt="CMC Logo" className="brand-logo-img" />
                        </div>
                        <span className="navbar-brand-text gradient-text d-none d-sm-block">
                            CMC-Learning
                        </span>
                    </Link>
                </div>

                {/* Search */}
<<<<<<< HEAD:src/components/layout/Navbar.jsx
                <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                        <input type="text" placeholder="Rechercher des cours, ressources..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all" onKeyDown={(e) => {
            if (e.key === 'Enter') {
                navigate(`/search?q=${e.target.value}`);
            }
        }}/>
=======
                <div className="search-container d-none d-md-flex align-items-center">
                    <div className="position-relative w-100">
                        <HiOutlineSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Rechercher des cours, ressources..."
                            className="search-input"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(`/search?q=${(e.target as HTMLInputElement).value}`);
                                }
                            }}
                        />
>>>>>>> ayyoub:src/components/layout/Navbar.tsx
                    </div>
                </div>

                {/* Right */}
<<<<<<< HEAD:src/components/layout/Navbar.jsx
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <HiOutlineBell className="w-5 h-5"/>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"/>
                    </button>

                    {user && (<div className="flex items-center gap-3 ml-2">
                            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-xs font-bold">
=======
                <div className="d-flex align-items-center gap-2 text-decoration-none">
                    <button className="notification-btn">
                        <HiOutlineBell style={{ width: '1.25rem', height: '1.25rem' }} />
                        <span className="notification-badge" />
                    </button>

                    {user && (
                        <div className="d-flex align-items-center gap-2 ms-2">
                            <div className="user-avatar gradient-primary">
>>>>>>> ayyoub:src/components/layout/Navbar.tsx
                                {getInitials(user.firstName, user.lastName)}
                            </div>
                            <div className="d-none d-sm-block lh-sm">
                                <p className="mb-0 fw-medium text-dark flex-grow-1" style={{ fontSize: '0.875rem' }}>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="mb-0 text-muted text-capitalize" style={{ fontSize: '0.75rem' }}>{user.role}</p>
                            </div>
<<<<<<< HEAD:src/components/layout/Navbar.jsx
                            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-danger/20 text-text-muted hover:text-danger transition-colors" title="Déconnexion">
                                <HiOutlineLogout className="w-4 h-4"/>
=======
                            <button
                                onClick={handleLogout}
                                className="logout-btn ms-2"
                                title="Déconnexion"
                            >
                                <HiOutlineLogout style={{ width: '1.25rem', height: '1.25rem' }} />
>>>>>>> ayyoub:src/components/layout/Navbar.tsx
                            </button>
                        </div>)}
                </div>
            </div>
        </header>);
};
export default Navbar;
