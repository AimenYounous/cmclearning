import React from 'react';
export const FormCard = ({ title, subtitle, children, footer, error }) => {
    return (<div className="min-h-screen flex items-center justify-center p-6 py-12 bg-surface">
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-surface to-surface"/>
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"/>
                <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]"/>
            </div>

            <div className="w-full max-w-lg z-10 animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex w-20 h-20 rounded-[28px] gradient-primary items-center justify-center text-3xl font-bold mb-6 shadow-xl shadow-primary/30">
                        CMC
                    </div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
                        {title}
                    </h1>
                    <p className="text-text-secondary text-lg">{subtitle}</p>
                </div>

                {/* Card Context */}
                <div className="bg-surface-light/40 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
                    {/* Error Alert */}
                    {error && (<div className="mb-6 p-4 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium flex items-center gap-3">
                            <span className="text-xl">⚠️</span> {error}
                        </div>)}

                    {children}

                    {/* Footer */}
                    <div className="mt-8 text-center pt-6 border-t border-white/10">
                        {footer}
                    </div>
                </div>
            </div>
        </div>);
};
