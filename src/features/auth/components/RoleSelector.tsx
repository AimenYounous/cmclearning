import React from 'react';
import type { UserRole } from '@/types';
import '../styles/auth-components.css';

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
        <div className="role-selector-container">
            <label className="auth-input-label">Vous êtes ?</label>
            <div className="role-selector-grid">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => onSelect(role.id)}
                        className={`role-btn ${selectedRole === role.id ? 'active' : ''}`}
                    >
                        <span className="fs-5">{role.icon}</span>
                        {role.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
