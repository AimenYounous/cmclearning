import React from 'react';
const Input = ({ label, error, icon, className = '', id, ...props }) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (<div className="space-y-1.5 w-full">
            {label && (<label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
                    {label}
                </label>)}
            <div className="relative">
                {icon && (<div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        {icon}
                    </div>)}
                <input id={inputId} className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl bg-surface-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-200 ${error
            ? 'border-danger/50 focus:border-danger focus:ring-danger/20'
            : 'border-white/10 focus:border-primary/50 focus:bg-white/5 focus:ring-primary/20'} ${className}`} {...props}/>
            </div>
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>);
};
export default Input;
