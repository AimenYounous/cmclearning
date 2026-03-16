import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { registerUser, clearError } from '../store/authSlice';
import { Button, Input } from '@/components/ui';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineAcademicCap } from 'react-icons/hi';
import { SPECIALITIES } from '@/utils/constants';
import type { UserRole } from '@/types';

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'stagiaire' as UserRole,
        speciality: '',
        year: 1,
    });

    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setValidationError('');

        if (form.password !== form.confirmPassword) {
            setValidationError('Les mots de passe ne correspondent pas');
            return;
        }
        if (form.password.length < 6) {
            setValidationError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        const { confirmPassword, ...registerData } = form;
        const result = await dispatch(registerUser(registerData));
        if (registerUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    const displayError = validationError || error;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 py-12">
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 rounded-2xl gradient-accent items-center justify-center text-2xl font-bold mb-4">
                        CMC
                    </div>
                    <h1 className="text-3xl font-bold gradient-text">Créer un compte</h1>
                    <p className="text-text-muted mt-2">Rejoignez CMC-Learning</p>
                </div>

                {/* Form */}
                <div className="glass-strong rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {displayError && (
                            <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
                                {displayError}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Prénom"
                                placeholder="Ahmed"
                                icon={<HiOutlineUser className="w-4 h-4" />}
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                required
                            />
                            <Input
                                label="Nom"
                                placeholder="Bennani"
                                icon={<HiOutlineUser className="w-4 h-4" />}
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                required
                            />
                        </div>

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

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-text-secondary">Rôle</label>
                            <div className="flex gap-3">
                                {(['stagiaire', 'formateur'] as UserRole[]).map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setForm({ ...form, role })}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.role === role
                                                ? 'gradient-primary border-primary/50 text-white'
                                                : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'
                                            }`}
                                    >
                                        {role === 'stagiaire' ? '🎓 Stagiaire' : '👨‍🏫 Formateur'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {form.role === 'stagiaire' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-text-secondary">Spécialité</label>
                                    <select
                                        value={form.speciality}
                                        onChange={(e) => setForm({ ...form, speciality: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none focus:border-primary/50"
                                    >
                                        <option value="">Choisir...</option>
                                        {SPECIALITIES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-text-secondary">Année</label>
                                    <select
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none focus:border-primary/50"
                                    >
                                        <option value={1}>1ère année</option>
                                        <option value={2}>2ème année</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Mot de passe"
                                type="password"
                                placeholder="••••••••"
                                icon={<HiOutlineLockClosed className="w-4 h-4" />}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                            <Input
                                label="Confirmer"
                                type="password"
                                placeholder="••••••••"
                                icon={<HiOutlineLockClosed className="w-4 h-4" />}
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Créer mon compte
                        </Button>
                    </form>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Déjà un compte ?{' '}
                        <Link
                            to="/login"
                            className="text-primary-light hover:text-primary font-medium transition-colors"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
