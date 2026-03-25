import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchCourses } from '../store/coursesSlice';
import CourseCard from '../components/CourseCard';
import { Button, LoadingSpinner, EmptyState } from '@/components/ui';
import { SPECIALITIES, YEARS } from '@/utils/constants';
import { HiOutlineBookOpen, HiOutlineFilter, HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
const CoursesPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { courses, isLoading, totalPages, currentPage } = useAppSelector((s) => s.courses);
    const { isFormateur } = useAuth();
    const [filters, setFilters] = useState({ speciality: '', year: '' });
    const [showFilters, setShowFilters] = useState(false);
    useEffect(() => {
        dispatch(fetchCourses({
            page: 1,
            speciality: filters.speciality || undefined,
            year: filters.year ? Number(filters.year) : undefined,
        }));
    }, [dispatch, filters]);
    return (<div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Cours</h1>
                    <p className="text-text-muted text-sm mt-1">
                        Découvrez les cours disponibles sur la plateforme
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" icon={<HiOutlineFilter className="w-4 h-4"/>} onClick={() => setShowFilters(!showFilters)}>
                        Filtres
                    </Button>
                    {isFormateur && (<Button size="sm" icon={<HiOutlinePlus className="w-4 h-4"/>} onClick={() => navigate('/courses/create')}>
                            Nouveau cours
                        </Button>)}
                </div>
            </div>

            {/* Filters */}
            {showFilters && (<div className="glass rounded-xl p-4 flex flex-wrap gap-4 animate-fade-in-up">
                    <select value={filters.speciality} onChange={(e) => setFilters({ ...filters, speciality: e.target.value })} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none focus:border-primary/50">
                        <option value="">Toutes les spécialités</option>
                        {SPECIALITIES.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                    <select value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none focus:border-primary/50">
                        <option value="">Toutes les années</option>
                        {YEARS.map((y) => (<option key={y} value={y}>{y}ère année</option>))}
                    </select>
                    <Button variant="ghost" size="sm" onClick={() => setFilters({ speciality: '', year: '' })}>
                        Réinitialiser
                    </Button>
                </div>)}

            {/* Content */}
            {isLoading ? (<LoadingSpinner text="Chargement des cours..."/>) : courses.length === 0 ? (<EmptyState icon={<HiOutlineBookOpen className="w-16 h-16"/>} title="Aucun cours trouvé" description="Il n'y a pas encore de cours. Revenez plus tard !"/>) : (<>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (<CourseCard key={course.id} course={course}/>))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (<div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: totalPages }, (_, i) => (<button key={i + 1} onClick={() => dispatch(fetchCourses({ page: i + 1 }))} className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${currentPage === i + 1
                        ? 'gradient-primary text-white'
                        : 'bg-white/5 text-text-muted hover:bg-white/10'}`}>
                                    {i + 1}
                                </button>))}
                        </div>)}
                </>)}
        </div>);
};
export default CoursesPage;
