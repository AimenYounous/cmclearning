import React from 'react';
import '../styles/auth-components.css';

interface AuthSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string | number; label: string }[];
    error?: string;
    placeholder?: string;
}

export const AuthSelect: React.FC<AuthSelectProps> = ({
    label,
    options,
    error,
    id,
    placeholder = "Sélectionner...",
    ...props
}) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="auth-input-group">
            <label htmlFor={selectId} className="auth-input-label">
                {label}
            </label>
            <div className="auth-input-wrapper group">
                <select
                    id={selectId}
                    className={`auth-input-field auth-select ${error ? 'is-invalid' : ''} ${props.disabled ? 'disabled' : ''}`}
                    {...props}
                >
                    <option value="" disabled className="text-secondary">
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-white text-dark">
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="position-absolute end-0 top-50 translate-middle-y pe-3 pointer-events-none d-flex align-items-center">
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && <p className="auth-input-error-text">{error}</p>}
        </div>
    );
};
