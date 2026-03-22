import React from 'react';
import '../styles/auth-components.css';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ isLoading, children, ...props }) => {
    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={`auth-btn auth-btn-primary`}
        >
            {isLoading && (
                <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {children}
        </button>
    );
};
