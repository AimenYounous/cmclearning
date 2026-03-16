import { HiStar } from 'react-icons/hi';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onChange?: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    size = 'md',
    interactive = false,
    onChange,
}) => {
    const sizes = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-7 h-7' };

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxRating }, (_, i) => (
                <button
                    key={i}
                    type="button"
                    disabled={!interactive}
                    onClick={() => onChange?.(i + 1)}
                    className={`${interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'} transition-transform`}
                >
                    <HiStar
                        className={`${sizes[size]} ${i < Math.round(rating) ? 'text-secondary fill-secondary' : 'text-white/15'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
