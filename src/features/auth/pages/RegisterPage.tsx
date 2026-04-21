import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { registerUser, clearError } from '../store/authSlice';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { RoleSelector } from '../components/RoleSelector';
import { FormCard } from '../components/FormCard';
import { AuthSelect } from '../components/AuthSelect';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { academicStructure } from '@/utils/academicStructure';
import type { UserRole } from '@/types';
import '../styles/register.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'stagiaire' as UserRole,
        formationType: '',
        formationLevel: '',
        pole: '',
        speciality: '',
        year: 1,
    });

    const [validationError, setValidationError] = useState('');

    // --- Static Select Options ---
    const formationTypeOptions = [
        { value: 'Diplômante', label: 'Diplômante' },
        { value: 'Qualifiante', label: 'Qualifiante' },
    ];

    const formationLevelOptions = [
        { value: 'Technicien spécialisé', label: 'Technicien spécialisé' },
        { value: 'Qualification', label: 'Qualification' },
        { value: 'Spécialisation', label: 'Spécialisation' },
        { value: 'Technicien', label: 'Technicien' },
    ];

    const levelMap: Record<string, string> = {
        'Technicien spécialisé': 'Technicien Specialise',
        'Technicien': 'Technicien',
        'Qualification': 'Qualification',
        'Spécialisation': 'Specialisation'
    };

    // --- Dynamic Select Options ---
    const filteredStructure = academicStructure.structure.filter((item) => {
        if (form.role === 'stagiaire' && form.formationLevel) {
            return item.niveau === levelMap[form.formationLevel];
        }
        return true;
    });

    const poleOptions = filteredStructure.map((item) => ({
        value: item.pole,
        label: item.pole,
    }));

    const selectedPoleObj = filteredStructure.find((s) => s.pole === form.pole);

    // Filtered years for stagiaire
    const anneeOptions =
        selectedPoleObj?.annees.map((a) => {
            const yearNum = parseInt(a.annee) || 1;
            return { value: yearNum, label: a.annee };
        }) || [];

    // Filtered filieres depending on role
    let filiereOptions: { value: string; label: string }[] = [];

    if (form.role === 'stagiaire') {
        // Find filieres explicitly for this pole AND year
        const selectedAnneeObj = selectedPoleObj?.annees.find(
            (a) => (parseInt(a.annee) || 1) === form.year
        );
        if (selectedAnneeObj) {
            filiereOptions = selectedAnneeObj.filieres.map((f) => ({ value: f, label: f }));
        }
    } else if (form.role === 'formateur') {
        // Flatten ALL filieres from all years for this pole
        if (selectedPoleObj) {
            const allFilieres = Array.from(
                new Set(selectedPoleObj.annees.flatMap((a) => a.filieres))
            );
            filiereOptions = allFilieres.map((f) => ({ value: f, label: f }));
        }
    }

    // --- Edge Cases / Auto-selection ---
    useEffect(() => {
        // Resets when pole changes
        if (form.pole) {
            const newForm = { ...form };
            let hasChanges = false;

            // If a pole is selected but it only has 1 year available, auto-select it (for stagiaire)
            if (form.role === 'stagiaire') {
                const singleYearObj = selectedPoleObj?.annees.length === 1 ? selectedPoleObj.annees[0] : null;
                const singleYearNum = singleYearObj ? parseInt(singleYearObj.annee) || 1 : null;

                // If year is invalid for this pole, reset it
                const validYear = selectedPoleObj?.annees.some(a => (parseInt(a.annee) || 1) === form.year);

                if (singleYearNum !== null && form.year !== singleYearNum) {
                    newForm.year = singleYearNum;
                    hasChanges = true;
                } else if (!validYear && anneeOptions.length > 0) {
                    newForm.year = anneeOptions[0].value as number;
                    hasChanges = true;
                }
            }

            // Always clear speciality if pole changes and previous speciality is not valid anymore
            const validFiliere = filiereOptions.some(f => f.value === form.speciality);
            if (!validFiliere && form.speciality !== '') {
                newForm.speciality = '';
                hasChanges = true;
            }

            if (hasChanges) {
                setForm((prev) => ({ ...prev, ...newForm }));
            }
        } else {
            // Reset if no pole
            if (form.speciality !== '' || form.year !== 1) {
                setForm((prev) => ({ ...prev, speciality: '', year: 1 }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.formationLevel, form.pole, form.role, form.year]); // Triggered cautiously

    const handleRoleChange = (role: UserRole) => {
        setForm({ ...form, role, formationType: '', formationLevel: '', pole: '', speciality: '', year: 1 });
        setValidationError('');
    };

    const validateForm = (): string | null => {
        if (!form.firstName.trim() || !form.lastName.trim()) return 'Le prénom et le nom sont requis';
        if (!EMAIL_REGEX.test(form.email)) return 'Veuillez entrer un email valide';
        if (form.password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
        if (form.password !== form.confirmPassword) return 'Les mots de passe ne correspondent pas';

        if (form.role === 'stagiaire') {
            if (!form.formationType) return 'Veuillez sélectionner un type de formation';
            if (!form.formationLevel) return 'Veuillez sélectionner un niveau de formation';
            if (!form.pole) return 'Veuillez sélectionner un pôle';
            if (!form.speciality) return 'Veuillez sélectionner une filière';
        } else if (form.role === 'formateur') {
            if (!form.pole) return 'Veuillez sélectionner un pôle';
            if (!form.speciality) return 'Veuillez sélectionner une filière';
        }

        return null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setValidationError('');

        const validationMsg = validateForm();
        if (validationMsg) {
            setValidationError(validationMsg);
            return;
        }

        const payload: import('@/types').RegisterData = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            role: form.role,
        };

        if (form.role === 'stagiaire') {
            payload.formationType = form.formationType;
            payload.formationLevel = form.formationLevel;
            payload.pole = form.pole;
            payload.speciality = form.speciality;
            payload.year = form.year;
        } else if (form.role === 'formateur') {
            payload.pole = form.pole;
            payload.speciality = form.speciality;
        }

        const result = await dispatch(registerUser(payload));
        if (registerUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    const displayError = validationError || error;

    return (
        <FormCard
            title="Créer un compte"
            subtitle="Rejoignez CMC-Learning"
            error={displayError}
            footer={
                <p className="text-secondary fw-medium small mb-0">
                    Déjà un compte ?{' '}
                    <Link
                        to="/login"
                        className="register-footer-link"
                    >
                        Se connecter
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="register-form-wrapper">
                <div className="register-grid">
                    <AuthInput
                        label="Prénom"
                        placeholder="Ahmed"
                        icon={<HiOutlineUser />}
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                    />
                    <AuthInput
                        label="Nom"
                        placeholder="Bennani"
                        icon={<HiOutlineUser />}
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                    />
                </div>

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

                <RoleSelector selectedRole={form.role} onSelect={handleRoleChange} />

                {form.role !== 'admin' && (
                    <div className="register-student-section">
                        {form.role === 'stagiaire' && (
                            <>
                                <AuthSelect
                                    label="Type de formation"
                                    placeholder="Sélectionner Type de formation"
                                    options={formationTypeOptions}
                                    value={form.formationType}
                                    onChange={(e) => setForm({ ...form, formationType: e.target.value })}
                                />
                                <AuthSelect
                                    label="Niveau de formation"
                                    placeholder="Sélectionner Niveau de formation"
                                    options={formationLevelOptions}
                                    value={form.formationLevel}
                                    onChange={(e) => setForm({ ...form, formationLevel: e.target.value, pole: '', speciality: '', year: 1 })}
                                />
                            </>
                        )}

                        <AuthSelect
                            label="Pôle"
                            placeholder="Choisir un pôle..."
                            options={poleOptions}
                            disabled={form.role === 'stagiaire' && !form.formationLevel}
                            value={form.pole}
                            onChange={(e) => setForm({ ...form, pole: e.target.value, speciality: '' })}
                        />

                        {form.role === 'stagiaire' && form.pole && (
                            <AuthSelect
                                label="Année"
                                placeholder="Choisir une année..."
                                options={anneeOptions}
                                value={form.year}
                                onChange={(e) => setForm({ ...form, year: Number(e.target.value), speciality: '' })}
                            />
                        )}

                        {form.pole && (
                            <AuthSelect
                                label={form.role === 'stagiaire' ? "1er Choix (Filière)" : "Filière"}
                                placeholder={filiereOptions.length > 0 ? "Choisir une filière..." : "Aucune filière disponible"}
                                disabled={filiereOptions.length === 0}
                                options={filiereOptions}
                                value={form.speciality}
                                onChange={(e) => setForm({ ...form, speciality: e.target.value })}
                            />
                        )}
                    </div>
                )}

                <div className="register-grid pt-2">
                    <AuthInput
                        label="Mot de passe"
                        type="password"
                        placeholder="••••••••"
                        icon={<HiOutlineLockClosed />}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <AuthInput
                        label="Confirmer"
                        type="password"
                        placeholder="••••••••"
                        icon={<HiOutlineLockClosed />}
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                    />
                </div>

                <div className="pt-2">
                    <AuthButton type="submit" isLoading={isLoading}>
                        Créer mon compte
                    </AuthButton>
                </div>
            </form>
        </FormCard>
    );
};

export default RegisterPage;
