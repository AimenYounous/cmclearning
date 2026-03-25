import React from 'react';
export const AuthSelect = ({ label, options, error, id, placeholder = "Sélectionner...", ...props }) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (<div className="space-y-2 w-full">
            <label htmlFor={selectId} className="block text-sm font-medium text-text-secondary">
                {label}
            </label>
            <div className="relative">
                <select id={selectId} className={`w-full px-4 py-3 rounded-xl bg-surface-card border text-sm text-text-primary focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer appearance-none ${error
            ? 'border-danger/50 focus:border-danger focus:ring-danger/20'
            : 'border-white/10 focus:border-primary/50 focus:bg-white/5 focus:ring-primary/20'} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`} {...props}>
                    <option value="" disabled className="text-gray-500">
                        {placeholder}
                    </option>
                    {options.map((opt) => (<option key={opt.value} value={opt.value} className="bg-surface text-text-primary">
                            {opt.label}
                        </option>))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </div>
            </div>
            {error && <p className="text-xs text-danger font-medium mt-1">{error}</p>}
        </div>);
};
