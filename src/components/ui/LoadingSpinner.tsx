const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; text?: string }> = ({
    size = 'md',
    text,
}) => {
    const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div
                className={`${sizes[size]} border-3 border-primary/20 border-t-primary rounded-full animate-spin`}
            />
            {text && <p className="text-sm text-text-muted">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
