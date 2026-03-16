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
    HiOutlineAcademicCap,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineDownload,
    HiArrowLeft,
} from 'react-icons/hi';

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
        <div className="space-y-6">
            {/* Back button */}
            <button
                onClick={() => navigate('/courses')}
                className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm"
            >
                <HiArrowLeft className="w-4 h-4" /> Retour aux cours
            </button>

            {/* Hero */}
            <div className="glass-strong rounded-2xl overflow-hidden">
                <div className="h-56 gradient-accent relative">
                    {course.thumbnail && (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-lg bg-primary/30 text-primary-light text-xs font-medium">
                                {course.speciality}
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">
                                {course.year}ère année
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold">{course.title}</h1>
                    </div>
                </div>

                <div className="p-6">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-text-muted">
                        <div className="flex items-center gap-2">
                            <HiOutlineUser className="w-4 h-4" />
                            {course.formateur.firstName} {course.formateur.lastName}
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-4 h-4" />
                            {formatDate(course.createdAt)}
                        </div>
                        <div className="flex items-center gap-2">
                            <StarRating rating={course.averageRating} size="sm" />
                            <span>{course.averageRating.toFixed(1)} ({course.totalRatings} avis)</span>
                        </div>
                    </div>

                    {/* Actions */}
                    {canEdit && (
                        <div className="flex gap-3 mb-6">
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<HiOutlinePencil className="w-4 h-4" />}
                                onClick={() => navigate(`/courses/${course.id}/edit`)}
                            >
                                Modifier
                            </Button>
                            <Button variant="danger" size="sm" icon={<HiOutlineTrash className="w-4 h-4" />}>
                                Supprimer
                            </Button>
                        </div>
                    )}

                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-semibold mb-3">Description</h2>
                        <p className="text-text-secondary leading-relaxed">{course.description}</p>
                    </div>

                    {/* Content */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-3">Contenu du cours</h2>
                        <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                            {course.content}
                        </div>
                    </div>
                </div>
            </div>

            {/* Resources */}
            {course.resources && course.resources.length > 0 && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Ressources</h2>
                    <div className="space-y-3">
                        {course.resources.map((resource) => (
                            <div
                                key={resource.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold uppercase">
                                        {resource.type}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{resource.title}</p>
                                        <p className="text-xs text-text-muted">{resource.fileName}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" icon={<HiOutlineDownload className="w-4 h-4" />}>
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
