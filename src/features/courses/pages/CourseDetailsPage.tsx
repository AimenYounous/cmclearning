import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchCourseById, clearCurrentCourse } from '../store/coursesSlice';
import { Card, StarRating, Button, LoadingSpinner } from '@/components/ui';
import { formatDate } from '@/utils/helpers';
import { useAuth } from '@/features/auth/hooks/useAuth';
import {
    HiOutlineUser,
    HiOutlineCalendar,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineDownload,
    HiArrowLeft,
} from 'react-icons/hi';
import '../styles/course-details.css';

const CourseDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentCourse: course, isLoading } = useAppSelector((s) => s.courses);
    const { user, isFormateur, isAdmin } = useAuth();

    const canEdit = isAdmin || (isFormateur && course?.formateurId === user?.id);

    useEffect(() => {
        if (id) dispatch(fetchCourseById(id));
        return () => { dispatch(clearCurrentCourse()); };
    }, [dispatch, id]);

    if (isLoading || !course) {
        return <LoadingSpinner text="Chargement du cours..." />;
    }

    return (
        <div className="course-details-wrapper">
            {/* Back button */}
            <button
                onClick={() => navigate('/courses')}
                className="course-details-back-btn"
            >
                <HiArrowLeft /> Retour aux cours
            </button>

            {/* Hero */}
            <div className="course-details-hero-container">
                <div className="course-details-hero-img-wrapper">
                    {course.thumbnail && (
                        <img src={course.thumbnail} alt={course.title} className="course-details-hero-img" />
                    )}
                    <div className="course-details-hero-overlay" />
                    <div className="course-details-hero-content">
                        <div className="course-details-badges">
                            <span className="course-details-badge">
                                {course.speciality}
                            </span>
                            <span className="course-details-badge">
                                {course.year}ère année
                            </span>
                        </div>
                        <h1 className="course-details-hero-title">{course.title}</h1>
                    </div>
                </div>

                <div className="course-details-body">
                    {/* Meta row */}
                    <div className="course-details-meta">
                        <div className="course-details-meta-item">
                            <HiOutlineUser />
                            {course.formateur.firstName} {course.formateur.lastName}
                        </div>
                        <div className="course-details-meta-item">
                            <HiOutlineCalendar />
                            {formatDate(course.createdAt)}
                        </div>
                        <div className="course-details-meta-item">
                            <StarRating rating={course.averageRating} size="sm" />
                            <span>{course.averageRating.toFixed(1)} ({course.totalRatings} avis)</span>
                        </div>
                    </div>

                    {/* Actions */}
                    {canEdit && (
                        <div className="course-details-actions">
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<HiOutlinePencil />}
                                onClick={() => navigate(`/courses/${course.id}/edit`)}
                            >
                                Modifier
                            </Button>
                            <Button variant="danger" size="sm" icon={<HiOutlineTrash />}>
                                Supprimer
                            </Button>
                        </div>
                    )}

                    {/* Description */}
                    <div className="course-details-section" style={{ marginTop: canEdit ? '0' : '0' }}>
                        <h2 className="course-details-section-title">Description</h2>
                        <p className="course-details-section-content">{course.description}</p>
                    </div>

                    {/* Content */}
                    <div className="course-details-section">
                        <h2 className="course-details-section-title">Contenu du cours</h2>
                        <div className="course-details-section-content">
                            {course.content}
                        </div>
                    </div>
                </div>
            </div>

            {/* Resources */}
            {course.resources && course.resources.length > 0 && (
                <Card>
                    <h2 className="course-details-section-title">Ressources</h2>
                    <div className="course-details-resources-list">
                        {course.resources.map((resource) => (
                            <div
                                key={resource.id}
                                className="course-details-resource-item"
                            >
                                <div className="course-details-resource-info">
                                    <div className="course-details-resource-icon">
                                        {resource.type}
                                    </div>
                                    <div>
                                        <p className="course-details-resource-title">{resource.title}</p>
                                        <p className="course-details-resource-subtitle">{resource.fileName}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" icon={<HiOutlineDownload />}>
                                    Télécharger
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default CourseDetailsPage;
