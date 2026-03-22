import React from 'react';
import '../styles/auth-components.css';
import logo from "../../../assets/logo.png";

interface FormCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footer: React.ReactNode;
    error?: string | null;
}

export const FormCard: React.FC<FormCardProps> = ({ title, subtitle, children, footer, error }) => {
    return (
        <div className="auth-page-wrapper">
            {/* Left Side - Brand Context */}
            <div className="auth-brand-side d-none d-lg-flex">
                {/* Abstract Background Shapes */}
                <div className="auth-abstract-bg-1"></div>
                <div className="auth-abstract-bg-2"></div>
                <div className="auth-abstract-bg-3"></div>

                {/* Logo */}
                <div className="auth-brand-logo-container">
                    <div className="auth-brand-icon">
                        <img src={logo} alt="CMC Logo" className="logo-img" />
                    </div>
                    <span className="auth-brand-title">CMC Learning</span>
                </div>

                <div className="auth-brand-content">
                    <h1 className="auth-brand-heading">
                        CMC Learning
                    </h1>
                    <p className="auth-brand-subtitle">
                        Plateforme éducative collaborative
                    </p>

                    {/* Decorative abstract shapes / illustrations */}
                    <div className="auth-features">
                        <div className="auth-feature-card">
                            <svg className="auth-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div className="auth-feature-card">
                            <svg className="auth-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        </div>
                        <div className="auth-feature-card">
                            <svg className="auth-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form Container */}
            <div className="auth-form-side">
                {/* Right side subtle abstract background */}
                <div className="auth-form-bg"></div>

                <div className="auth-form-container">
                    {/* Header */}
                    <div className="auth-form-header">
                        <h2 className="auth-form-title">{title}</h2>
                        <p className="auth-form-subtitle">{subtitle}</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="auth-form-error">
                            <span className="fs-5 flex-shrink-0">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {children}

                    {/* Footer */}
                    <div className="auth-form-footer">
                        {footer}
                    </div>
                </div>

                {/* Copyright info */}
                <div className="auth-copyright d-none d-sm-flex">
                    <span>© 2024 CMC LEARNING</span>
                    <div className="auth-copyright-links">
                        <a href="#">PRIVACY</a>
                        <a href="#">TERMS</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
