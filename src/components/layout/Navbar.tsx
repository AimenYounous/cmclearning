import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/features/auth/store/authSlice';
import { HiOutlineSearch, HiOutlineBell, HiOutlineLogout, HiMenuAlt2 } from 'react-icons/hi';
import { getInitials } from '@/utils/helpers';
import logo from '@/assets/logo.png';
import './styles/layout.css';

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
        <header className="navbar-header sticky-top">
            <div className="d-flex align-items-center justify-content-between">
                {/* Left */}
                <div className="d-flex align-items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="d-lg-none btn btn-light p-2 border-0"
                    >
                        <HiMenuAlt2 className="ms-n1 me-n1" style={{ width: '1.25rem', height: '1.25rem' }} />
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
                    </div>
                </div>

                {/* Right */}
                <div className="d-flex align-items-center gap-2 text-decoration-none">
                    <button className="notification-btn">
                        <HiOutlineBell style={{ width: '1.25rem', height: '1.25rem' }} />
                        <span className="notification-badge" />
                    </button>

                    {user && (
                        <div className="d-flex align-items-center gap-2 ms-2">
                            <div className="user-avatar gradient-primary">
                                {getInitials(user.firstName, user.lastName)}
                            </div>
                            <div className="d-none d-sm-block lh-sm">
                                <p className="mb-0 fw-medium text-dark flex-grow-1" style={{ fontSize: '0.875rem' }}>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="mb-0 text-muted text-capitalize" style={{ fontSize: '0.75rem' }}>{user.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="logout-btn ms-2"
                                title="Déconnexion"
                            >
                                <HiOutlineLogout style={{ width: '1.25rem', height: '1.25rem' }} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
