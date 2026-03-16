import { useNavigate } from 'react-router-dom';
import { Card, StarRating } from '@/components/ui';
import { truncate } from '@/utils/helpers';
import type { Course } from '@/types';
import { HiOutlineBookOpen, HiOutlineUser } from 'react-icons/hi';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const navigate = useNavigate();

    return (
        <Card hover onClick={() => navigate(`/courses/${course.id}`)}>
            {/* Thumbnail */}
            <div className="relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
                {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full gradient-accent flex items-center justify-center">
                        <HiOutlineBookOpen className="w-12 h-12 text-white/40" />
                    </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur text-xs font-medium">
                    {course.speciality}
                </div>
            </div>

            {/* Content */}
            <h3 className="text-base font-semibold mb-2 line-clamp-2">{course.title}</h3>
            <p className="text-sm text-text-muted mb-4 line-clamp-2">
                {truncate(course.description, 100)}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 text-text-muted">
                    <HiOutlineUser className="w-4 h-4" />
                    <span className="text-xs">
                        {course.formateur.firstName} {course.formateur.lastName}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <StarRating rating={course.averageRating} size="sm" />
                    <span className="text-xs text-text-muted">({course.totalRatings})</span>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
