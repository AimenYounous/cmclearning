import React from 'react';
import './styles/ui-components.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="input-ui-wrapper">
            {label && (
                <label htmlFor={inputId} className="input-ui-label">
                    {label}
                </label>
            )}
            <div className="input-ui-container">
                {icon && (
                    <div className="input-ui-icon-wrapper">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`input-ui ${icon ? 'input-ui-with-icon' : 'input-ui-no-icon'} ${error ? 'input-ui-error' : 'input-ui-default'} ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="input-ui-error-text">{error}</p>}
        </div>
    );
};

export default Input;
