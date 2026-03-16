interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
    return (
        <div
            className={`glass rounded-2xl p-6 ${hover
                    ? 'hover:bg-white/8 hover:border-white/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 cursor-pointer'
                    : ''
                } transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
