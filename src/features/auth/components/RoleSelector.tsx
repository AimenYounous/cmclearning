import React from 'react';
import type { UserRole } from '@/types';

interface RoleSelectorProps {
    selectedRole: UserRole;
    onSelect: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelect }) => {
    const roles: { id: UserRole; label: string; icon: string }[] = [
        { id: 'stagiaire', label: 'Stagiaire', icon: '🎓' },
        { id: 'formateur', label: 'Formateur', icon: '👨‍🏫' },
    ];

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">Vous êtes ?</label>
            <div className="flex gap-3">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => onSelect(role.id)}
                        className={`flex-1 flex justify-center items-center gap-2 py-3.5 rounded-xl text-sm font-bold border transition-all duration-200 ${selectedRole === role.id
                                ? 'gradient-primary border-transparent text-white shadow-lg shadow-primary/25'
                                : 'bg-surface-card border-white/10 text-text-secondary hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <span>{role.icon}</span>
                        {role.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
