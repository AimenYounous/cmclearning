import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchService } from '../services/searchService';
import { CourseCard } from '@/features/courses';
import { Input, LoadingSpinner, EmptyState } from '@/components/ui';
import { SPECIALITIES, YEARS } from '@/utils/constants';
import type { Course } from '@/types';
import { HiOutlineSearch } from 'react-icons/hi';
import '../styles/search.css';

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
        <div className="search-wrapper">
            <h1 className="search-title">Recherche</h1>

            {/* Search bar */}
            <div className="search-bar-container">
                <div className="search-bar-row">
                    <div className="search-input-wrapper">
                        <Input
                            placeholder="Rechercher des cours..."
                            icon={<HiOutlineSearch />}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="search-btn"
                    >
                        Rechercher
                    </button>
                </div>

                {/* Filters */}
                <div className="search-filters-row">
                    <select
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        className="search-filter-select"
                    >
                        <option value="">Toutes spécialités</option>
                        {SPECIALITIES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="search-filter-select"
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
                    <p className="search-results-info">{results.length} résultat(s) trouvé(s)</p>
                    <div className="search-results-grid">
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
