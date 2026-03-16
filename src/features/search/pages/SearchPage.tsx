import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchService } from '../services/searchService';
import { CourseCard } from '@/features/courses';
import { Input, LoadingSpinner, EmptyState } from '@/components/ui';
import { SPECIALITIES, YEARS } from '@/utils/constants';
import type { Course } from '@/types';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [speciality, setSpeciality] = useState('');
    const [year, setYear] = useState('');
    const [results, setResults] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            doSearch(q);
        }
    }, [searchParams]);

    const doSearch = async (q?: string) => {
        setLoading(true);
        try {
            const data = await searchService.searchCourses({
                q: q || query || undefined,
                speciality: speciality || undefined,
                year: year ? Number(year) : undefined,
            });
            setResults(data);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setSearchParams({ q: query });
        doSearch();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Recherche</h1>

            {/* Search bar */}
            <div className="glass-strong rounded-2xl p-6">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Input
                            placeholder="Rechercher des cours..."
                            icon={<HiOutlineSearch className="w-4 h-4" />}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2.5 rounded-xl gradient-primary text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
                    >
                        Rechercher
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mt-4">
                    <select
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none"
                    >
                        <option value="">Toutes spécialités</option>
                        {SPECIALITIES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none"
                    >
                        <option value="">Toutes années</option>
                        {YEARS.map((y) => <option key={y} value={String(y)}>{y}ère année</option>)}
                    </select>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <LoadingSpinner text="Recherche en cours..." />
            ) : results.length > 0 ? (
                <div>
                    <p className="text-sm text-text-muted mb-4">{results.length} résultat(s) trouvé(s)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            ) : query ? (
                <EmptyState
                    icon={<HiOutlineSearch className="w-16 h-16" />}
                    title="Aucun résultat"
                    description={`Aucun résultat pour "${query}". Essayez avec d'autres mots-clés.`}
                />
            ) : null}
        </div>
    );
};

export default SearchPage;
