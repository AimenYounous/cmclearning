import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchCourses } from '../store/coursesSlice';
import CourseCard from '../components/CourseCard';
import { Button, LoadingSpinner, EmptyState } from '@/components/ui';
import { SPECIALITIES, YEARS } from '@/utils/constants';
import { HiOutlineBookOpen, HiOutlineFilter, HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import '../styles/courses.css';

const CoursesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { courses, isLoading, totalPages, currentPage } = useAppSelector((s) => s.courses);
    const { isFormateur } = useAuth();

    const [filters, setFilters] = useState({ speciality: '', year: '' });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        dispatch(
            fetchCourses({
                page: 1,
                speciality: filters.speciality || undefined,
                year: filters.year ? Number(filters.year) : undefined,
            })
        );
    }, [dispatch, filters]);

    return (
        <div className="courses-page-wrapper">
            {/* Header */}
            <div className="courses-header">
                <div>
                    <h1 className="courses-title">Cours</h1>
                    <p className="courses-subtitle">
                        Découvrez les cours disponibles sur la plateforme
                    </p>
                </div>
                <div className="courses-actions">
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<HiOutlineFilter className="w-4 h-4" />}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        Filtres
                    </Button>
                    {isFormateur && (
                        <Button
                            size="sm"
                            icon={<HiOutlinePlus className="w-4 h-4" />}
                            onClick={() => navigate('/courses/create')}
                        >
                            Nouveau cours
                        </Button>
                    )}
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="courses-filters-container">
                    <select
                        value={filters.speciality}
                        onChange={(e) => setFilters({ ...filters, speciality: e.target.value })}
                        className="courses-filter-select"
                    >
                        <option value="">Toutes les spécialités</option>
                        {SPECIALITIES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <select
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        className="courses-filter-select"
                    >
                        <option value="">Toutes les années</option>
                        {YEARS.map((y) => (
                            <option key={y} value={y}>{y}ère année</option>
                        ))}
                    </select>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ speciality: '', year: '' })}
                    >
                        Réinitialiser
                    </Button>
                </div>
            )}

            {/* Content */}
            {isLoading ? (
                <LoadingSpinner text="Chargement des cours..." />
            ) : courses.length === 0 ? (
                <EmptyState
                    icon={<HiOutlineBookOpen className="w-16 h-16" />}
                    title="Aucun cours trouvé"
                    description="Il n'y a pas encore de cours. Revenez plus tard !"
                />
            ) : (
                <>
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="courses-pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => dispatch(fetchCourses({ page: i + 1 }))}
                                    className={`courses-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CoursesPage;
