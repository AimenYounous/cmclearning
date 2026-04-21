import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchCourseById, clearCurrentCourse } from '../store/coursesSlice';
import { Card, StarRating, Button, LoadingSpinner } from '@/components/ui';
import { formatDate } from '@/utils/helpers';
import { useAuth } from '@/features/auth/hooks/useAuth';
<<<<<<< HEAD:src/features/courses/pages/CourseDetailsPage.jsx
import { HiOutlineUser, HiOutlineCalendar, HiOutlinePencil, HiOutlineTrash, HiOutlineDownload, HiArrowLeft, } from 'react-icons/hi';
const CourseDetailsPage = () => {
    const { id } = useParams();
=======
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
>>>>>>> ayyoub:src/features/courses/pages/CourseDetailsPage.tsx
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentCourse: course, isLoading } = useAppSelector((s) => s.courses);
    const { user, isFormateur, isAdmin } = useAuth();
    const canEdit = isAdmin || (isFormateur && course?.formateurId === user?.id);
    useEffect(() => {
        if (id)
            dispatch(fetchCourseById(id));
        return () => { dispatch(clearCurrentCourse()); };
    }, [dispatch, id]);
    if (isLoading || !course) {
        return <LoadingSpinner text="Chargement du cours..."/>;
    }
<<<<<<< HEAD:src/features/courses/pages/CourseDetailsPage.jsx
    return (<div className="space-y-6">
            {/* Back button */}
            <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm">
                <HiArrowLeft className="w-4 h-4"/> Retour aux cours
            </button>

            {/* Hero */}
            <div className="glass-strong rounded-2xl overflow-hidden">
                <div className="h-56 gradient-accent relative">
                    {course.thumbnail && (<img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover"/>)}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent"/>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-lg bg-primary/30 text-primary-light text-xs font-medium">
=======

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
>>>>>>> ayyoub:src/features/courses/pages/CourseDetailsPage.tsx
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
<<<<<<< HEAD:src/features/courses/pages/CourseDetailsPage.jsx
                    <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-text-muted">
                        <div className="flex items-center gap-2">
                            <HiOutlineUser className="w-4 h-4"/>
                            {course.formateur.firstName} {course.formateur.lastName}
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-4 h-4"/>
                            {formatDate(course.createdAt)}
                        </div>
                        <div className="flex items-center gap-2">
                            <StarRating rating={course.averageRating} size="sm"/>
=======
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
>>>>>>> ayyoub:src/features/courses/pages/CourseDetailsPage.tsx
                            <span>{course.averageRating.toFixed(1)} ({course.totalRatings} avis)</span>
                        </div>
                    </div>

                    {/* Actions */}
<<<<<<< HEAD:src/features/courses/pages/CourseDetailsPage.jsx
                    {canEdit && (<div className="flex gap-3 mb-6">
                            <Button variant="secondary" size="sm" icon={<HiOutlinePencil className="w-4 h-4"/>} onClick={() => navigate(`/courses/${course.id}/edit`)}>
                                Modifier
                            </Button>
                            <Button variant="danger" size="sm" icon={<HiOutlineTrash className="w-4 h-4"/>}>
=======
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
>>>>>>> ayyoub:src/features/courses/pages/CourseDetailsPage.tsx
                                Supprimer
                            </Button>
                        </div>)}

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
<<<<<<< HEAD:src/features/courses/pages/CourseDetailsPage.jsx
            {course.resources && course.resources.length > 0 && (<Card>
                    <h2 className="text-xl font-semibold mb-4">Ressources</h2>
                    <div className="space-y-3">
                        {course.resources.map((resource) => (<div key={resource.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold uppercase">
=======
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
>>>>>>> ayyoub:src/features/courses/pages/CourseDetailsPage.tsx
                                        {resource.type}
                                    </div>
                                    <div>
                                        <p className="course-details-resource-title">{resource.title}</p>
                                        <p className="course-details-resource-subtitle">{resource.fileName}</p>
                                    </div>
                                </div>
<<<<<<< HEAD:src/features/courses/pages/CourseDetailsPage.jsx
                                <Button variant="ghost" size="sm" icon={<HiOutlineDownload className="w-4 h-4"/>}>
=======
                                <Button variant="ghost" size="sm" icon={<HiOutlineDownload />}>
>>>>>>> ayyoub:src/features/courses/pages/CourseDetailsPage.tsx
                                    Télécharger
                                </Button>
                            </div>))}
                    </div>
                </Card>)}
        </div>);
};
export default CourseDetailsPage;
