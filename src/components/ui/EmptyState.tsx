interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            {icon && (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center mb-5 text-indigo-300">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">{description}</p>
            )}
            {action}
        </div>
    );
};

export default EmptyState;
