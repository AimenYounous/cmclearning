import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser, clearError } from '../store/authSlice';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { FormCard } from '../components/FormCard';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

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
                <p className="text-text-secondary">
                    Pas encore de compte ?{' '}
                    <Link
                        to="/register"
                        className="text-white hover:text-primary-light font-semibold transition-colors duration-200"
                    >
                        Créer un compte
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                    <AuthInput
                        label="Email"
                        type="email"
                        placeholder="votre@email.com"
                        icon={<HiOutlineMail className="w-5 h-5" />}
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
                        icon={<HiOutlineLockClosed className="w-5 h-5" />}
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
