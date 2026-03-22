import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser, clearError } from '../store/authSlice';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { FormCard } from '../components/FormCard';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import '../styles/login.css';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    const [form, setForm] = useState({ email: '', password: '' });

    // US-01.6: Auto-redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginUser(form));
        if (loginUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    return (
        <FormCard
            title="Bienvenue"
            subtitle="Connectez-vous à CMC-Learning"
            error={error}
            footer={
                <p className="text-secondary fw-medium small mb-0">
                    Nouveau sur CMC Learning ?{' '}
                    <Link
                        to="/register"
                        className="login-footer-link"
                    >
                        Créer un compte
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="login-form-wrapper">
                <div className="login-inputs-wrapper">
                    <AuthInput
                        label="Email"
                        type="email"
                        placeholder="votre@email.com"
                        icon={<HiOutlineMail />}
                        value={form.email}
                        onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            if (error) dispatch(clearError());
                        }}
                        required
                    />

                    <AuthInput
                        label="Mot de passe"
                        type="password"
                        placeholder="••••••••"
                        icon={<HiOutlineLockClosed />}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                <AuthButton type="submit" isLoading={isLoading}>
                    Se connecter
                </AuthButton>
            </form>
        </FormCard>
    );
};

export default LoginPage;
