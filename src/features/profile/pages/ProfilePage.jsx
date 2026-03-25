import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authService } from '@/features/auth/services/authService';
import { Card, Button, Input } from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import { HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';
const ProfilePage = () => {
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
    return (<div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Mon Profil</h1>

            {/* Avatar card */}
            <Card className="text-center py-8">
                <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold mx-auto mb-4 animate-pulse-glow">
                    {getInitials(user.firstName, user.lastName)}
                </div>
                <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-text-muted capitalize mt-1">{user.role}</p>
                {user.speciality && (<p className="text-sm text-primary-light mt-2">
                        {user.speciality} · {user.year}ère année
                    </p>)}
            </Card>

            {/* Info card */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Informations personelles</h2>
                    <Button variant={editing ? 'primary' : 'secondary'} size="sm" icon={editing ? <HiOutlineCheck className="w-4 h-4"/> : <HiOutlinePencil className="w-4 h-4"/>} isLoading={saving} onClick={editing ? handleSave : () => setEditing(true)}>
                        {editing ? 'Enregistrer' : 'Modifier'}
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} disabled={!editing}/>
                        <Input label="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} disabled={!editing}/>
                    </div>
                    <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing}/>
                </div>
            </Card>
        </div>);
};
export default ProfilePage;
