import React from 'react';

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
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl bg-white/5 border text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all duration-200 ${error
                            ? 'border-danger/50 focus:border-danger'
                            : 'border-white/10 focus:border-primary/50 focus:bg-white/8'
                        } ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
};

export default Input;
