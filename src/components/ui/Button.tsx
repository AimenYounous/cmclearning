import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:
            'gradient-primary text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0',
        secondary:
            'bg-white/5 border border-white/10 text-text-primary hover:bg-white/10 hover:border-white/20',
        danger:
            'bg-danger/20 border border-danger/30 text-danger hover:bg-danger/30',
        ghost:
            'text-text-secondary hover:bg-white/5 hover:text-text-primary',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3 text-base',
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : (
                icon
            )}
            {children}
        </button>
    );
};

export default Button;
