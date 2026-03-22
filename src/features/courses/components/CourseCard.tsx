import { useNavigate } from 'react-router-dom';
import { Card, StarRating } from '@/components/ui';
import { truncate } from '@/utils/helpers';
import type { Course } from '@/types';
import { HiOutlineBookOpen, HiOutlineUser } from 'react-icons/hi';
import '../styles/courses.css';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const navigate = useNavigate();

    return (
        <Card hover onClick={() => navigate(`/courses/${course.id}`)}>
            {/* Thumbnail */}
            <div className="course-card-thumbnail-container">
                {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="course-card-img"
                    />
                ) : (
                    <div className="course-card-fallback">
                        <HiOutlineBookOpen />
                    </div>
                )}
                <div className="course-card-badge">
                    {course.speciality}
                </div>
            </div>

            {/* Content */}
            <h3 className="course-card-title">{course.title}</h3>
            <p className="course-card-desc">
                {truncate(course.description, 100)}
            </p>

            {/* Footer */}
            <div className="course-card-footer">
                <div className="course-card-author">
                    <HiOutlineUser className="course-card-author-icon" />
                    <span className="course-card-author-name">
                        {course.formateur.firstName} {course.formateur.lastName}
                    </span>
                </div>
                <div className="course-card-rating">
                    <StarRating rating={course.averageRating} size="sm" />
                    <span className="course-card-rating-count">({course.totalRatings})</span>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
