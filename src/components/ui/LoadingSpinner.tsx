const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; text?: string }> = ({
    size = 'md',
    text,
}) => {
    const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="relative">
                <div
                    className={`${sizes[size]} rounded-full animate-spin`}
                    style={{
                        border: '3px solid rgba(79, 70, 229, 0.1)',
                        borderTopColor: '#4f46e5',
                        borderRightColor: '#7c3aed',
                    }}
                />
                <div className={`absolute inset-0 ${sizes[size]} rounded-full animate-pulse-glow`} />
            </div>
            {text && <p className="text-sm text-gray-500 font-medium">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
