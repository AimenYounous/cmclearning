import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authService } from '@/features/auth/services/authService';
import { Card, Button, Input } from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import { HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';
<<<<<<< HEAD:src/features/profile/pages/ProfilePage.jsx
const ProfilePage = () => {
=======
import '../styles/profile.css';

const ProfilePage: React.FC = () => {
>>>>>>> ayyoub:src/features/profile/pages/ProfilePage.tsx
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
    });
    const [saving, setSaving] = useState(false);
    if (!user)
        return null;
    const handleSave = async () => {
        setSaving(true);
        try {
            await authService.updateProfile(form);
            setEditing(false);
        }
        finally {
            setSaving(false);
        }
    };
<<<<<<< HEAD:src/features/profile/pages/ProfilePage.jsx
    return (<div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Mon Profil</h1>
=======

    return (
        <div className="profile-wrapper">
            <h1 className="profile-title">Mon Profil</h1>
>>>>>>> ayyoub:src/features/profile/pages/ProfilePage.tsx

            {/* Avatar card */}
            <Card className="profile-avatar-card">
                <div className="profile-avatar">
                    {getInitials(user.firstName, user.lastName)}
                </div>
<<<<<<< HEAD:src/features/profile/pages/ProfilePage.jsx
                <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-text-muted capitalize mt-1">{user.role}</p>
                {user.speciality && (<p className="text-sm text-primary-light mt-2">
=======
                <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                <p className="profile-role">{user.role}</p>
                {user.speciality && (
                    <p className="profile-speciality">
>>>>>>> ayyoub:src/features/profile/pages/ProfilePage.tsx
                        {user.speciality} · {user.year}ère année
                    </p>)}
            </Card>

            {/* Info card */}
            <Card>
<<<<<<< HEAD:src/features/profile/pages/ProfilePage.jsx
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Informations personelles</h2>
                    <Button variant={editing ? 'primary' : 'secondary'} size="sm" icon={editing ? <HiOutlineCheck className="w-4 h-4"/> : <HiOutlinePencil className="w-4 h-4"/>} isLoading={saving} onClick={editing ? handleSave : () => setEditing(true)}>
=======
                <div className="profile-info-header">
                    <h2 className="profile-info-title">Informations personelles</h2>
                    <Button
                        variant={editing ? 'primary' : 'secondary'}
                        size="sm"
                        icon={editing ? <HiOutlineCheck /> : <HiOutlinePencil />}
                        isLoading={saving}
                        onClick={editing ? handleSave : () => setEditing(true)}
                    >
>>>>>>> ayyoub:src/features/profile/pages/ProfilePage.tsx
                        {editing ? 'Enregistrer' : 'Modifier'}
                    </Button>
                </div>

<<<<<<< HEAD:src/features/profile/pages/ProfilePage.jsx
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} disabled={!editing}/>
                        <Input label="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} disabled={!editing}/>
=======
                <div className="profile-form-wrapper">
                    <div className="profile-form-grid">
                        <Input
                            label="Prénom"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            disabled={!editing}
                        />
                        <Input
                            label="Nom"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            disabled={!editing}
                        />
>>>>>>> ayyoub:src/features/profile/pages/ProfilePage.tsx
                    </div>
                    <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing}/>
                </div>
            </Card>
        </div>);
};
export default ProfilePage;
