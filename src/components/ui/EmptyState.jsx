const EmptyState = ({ icon, title, description, action }) => {
    return (<div className="flex flex-col items-center justify-center py-16 text-center">
            {icon && <div className="text-text-muted mb-4 opacity-50">{icon}</div>}
            <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
            {description && (<p className="text-sm text-text-muted max-w-md mb-6">{description}</p>)}
            {action}
        </div>);
};
export default EmptyState;
