import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authService } from '@/features/auth/services/authService';
import { Card, Button, Input } from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import { HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';
import '../styles/profile.css';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
    });
    const [saving, setSaving] = useState(false);

    if (!user) return null;

    const handleSave = async () => {
        setSaving(true);
        try {
            await authService.updateProfile(form);
            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="profile-wrapper">
            <h1 className="profile-title">Mon Profil</h1>

            {/* Avatar card */}
            <Card className="profile-avatar-card">
                <div className="profile-avatar">
                    {getInitials(user.firstName, user.lastName)}
                </div>
                <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                <p className="profile-role">{user.role}</p>
                {user.speciality && (
                    <p className="profile-speciality">
                        {user.speciality} · {user.year}ère année
                    </p>
                )}
            </Card>

            {/* Info card */}
            <Card>
                <div className="profile-info-header">
                    <h2 className="profile-info-title">Informations personelles</h2>
                    <Button
                        variant={editing ? 'primary' : 'secondary'}
                        size="sm"
                        icon={editing ? <HiOutlineCheck /> : <HiOutlinePencil />}
                        isLoading={saving}
                        onClick={editing ? handleSave : () => setEditing(true)}
                    >
                        {editing ? 'Enregistrer' : 'Modifier'}
                    </Button>
                </div>

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
                    </div>
                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={!editing}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;
