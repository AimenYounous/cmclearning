import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ isLoading, children, ...props }) => {
    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-semibold text-white shadow-lg transition-all duration-200 flex justify-center items-center gap-2 ${isLoading || props.disabled
                    ? 'bg-primary/50 cursor-not-allowed text-white/70'
                    : 'gradient-primary shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0'
                }`}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};
