import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import '../styles/auth-components.css';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
    error?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, icon, error, id, type = 'text', ...props }) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="auth-input-group">
            <label htmlFor={inputId} className="auth-input-label">
                {label}
            </label>
            <div className="auth-input-wrapper group">
                {icon && (
                    <div className="auth-input-icon">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    type={inputType}
                    className={`auth-input-field ${icon ? 'has-icon-left' : ''} ${isPassword ? 'has-icon-right' : ''} ${error ? 'is-invalid' : ''}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-input-toggle-btn"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                        {showPassword ? <HiOutlineEyeOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <HiOutlineEye style={{ width: '1.25rem', height: '1.25rem' }} />}
                    </button>
                )}
            </div>
            {error && <p className="auth-input-error-text">{error}</p>}
        </div>
    );
};
