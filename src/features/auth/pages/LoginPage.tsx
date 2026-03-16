import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser, clearError } from '../store/authSlice';
import { Button, Input } from '@/components/ui';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginUser(form));
        if (loginUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 rounded-2xl gradient-primary items-center justify-center text-2xl font-bold mb-4 animate-pulse-glow">
                        CMC
                    </div>
                    <h1 className="text-3xl font-bold gradient-text">Bienvenue</h1>
                    <p className="text-text-muted mt-2">Connectez-vous à CMC-Learning</p>
                </div>

                {/* Form */}
                <div className="glass-strong rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email"
                            type="email"
                            placeholder="votre@email.com"
                            icon={<HiOutlineMail className="w-4 h-4" />}
                            value={form.email}
                            onChange={(e) => {
                                setForm({ ...form, email: e.target.value });
                                if (error) dispatch(clearError());
                            }}
                            required
                        />

                        <Input
                            label="Mot de passe"
                            type="password"
                            placeholder="••••••••"
                            icon={<HiOutlineLockClosed className="w-4 h-4" />}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Se connecter
                        </Button>
                    </form>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Pas encore de compte ?{' '}
                        <Link
                            to="/register"
                            className="text-primary-light hover:text-primary font-medium transition-colors"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
