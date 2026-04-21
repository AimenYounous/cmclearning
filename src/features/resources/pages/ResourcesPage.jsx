import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchResources } from '../store/resourcesSlice';
import { resourcesService } from '../services/resourcesService';
import { Card, Button, LoadingSpinner, EmptyState } from '@/components/ui';
import { SPECIALITIES, YEARS, RESOURCE_TYPES } from '@/utils/constants';
import { formatFileSize, formatDate } from '@/utils/helpers';
import { useAuth } from '@/features/auth/hooks/useAuth';
<<<<<<< HEAD:src/features/resources/pages/ResourcesPage.jsx
import { HiOutlineFolder, HiOutlineDownload, HiOutlineUpload, HiOutlineDocumentText, HiOutlineFilm, HiOutlineFilter, } from 'react-icons/hi';
const typeIcons = {
    pdf: <HiOutlineDocumentText className="w-5 h-5"/>,
    video: <HiOutlineFilm className="w-5 h-5"/>,
    document: <HiOutlineDocumentText className="w-5 h-5"/>,
    other: <HiOutlineFolder className="w-5 h-5"/>,
=======
import {
    HiOutlineFolder,
    HiOutlineDownload,
    HiOutlineUpload,
    HiOutlineDocumentText,
    HiOutlineFilm,
    HiOutlineFilter,
} from 'react-icons/hi';
import '../styles/resources.css';

const typeIcons: Record<string, React.ReactNode> = {
    pdf: <HiOutlineDocumentText className="w-5 h-5" />,
    video: <HiOutlineFilm className="w-5 h-5" />,
    document: <HiOutlineDocumentText className="w-5 h-5" />,
    other: <HiOutlineFolder className="w-5 h-5" />,
>>>>>>> ayyoub:src/features/resources/pages/ResourcesPage.tsx
};
const ResourcesPage = () => {
    const dispatch = useAppDispatch();
    const { resources, isLoading } = useAppSelector((s) => s.resources);
    const { isFormateur, isAdmin } = useAuth();
    const fileInputRef = useRef(null);
    const [filters, setFilters] = useState({ speciality: '', year: '', type: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        dispatch(fetchResources({
            speciality: filters.speciality || undefined,
            year: filters.year ? Number(filters.year) : undefined,
            type: filters.type || undefined,
        }));
    }, [dispatch, filters]);
    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name);
            await resourcesService.upload(formData);
            dispatch(fetchResources({}));
        }
        finally {
            setUploading(false);
        }
    };
    const handleDownload = async (id, fileName) => {
        const blob = await resourcesService.download(id);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };
<<<<<<< HEAD:src/features/resources/pages/ResourcesPage.jsx
    return (<div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
=======

    return (
        <div className="resources-wrapper">
            <div className="resources-header">
>>>>>>> ayyoub:src/features/resources/pages/ResourcesPage.tsx
                <div>
                    <h1 className="resources-title">Ressources</h1>
                    <p className="resources-subtitle">Parcourir et télécharger les ressources pédagogiques</p>
                </div>
<<<<<<< HEAD:src/features/resources/pages/ResourcesPage.jsx
                <div className="flex gap-3">
                    <Button variant="secondary" size="sm" icon={<HiOutlineFilter className="w-4 h-4"/>} onClick={() => setShowFilters(!showFilters)}>
                        Filtres
                    </Button>
                    {(isFormateur || isAdmin) && (<>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload}/>
                            <Button size="sm" icon={<HiOutlineUpload className="w-4 h-4"/>} isLoading={uploading} onClick={() => fileInputRef.current?.click()}>
=======
                <div className="resources-actions">
                    <Button variant="secondary" size="sm" icon={<HiOutlineFilter />} onClick={() => setShowFilters(!showFilters)}>
                        Filtres
                    </Button>
                    {(isFormateur || isAdmin) && (
                        <>
                            <input ref={fileInputRef} type="file" className="d-none" onChange={handleUpload} />
                            <Button size="sm" icon={<HiOutlineUpload />} isLoading={uploading} onClick={() => fileInputRef.current?.click()}>
>>>>>>> ayyoub:src/features/resources/pages/ResourcesPage.tsx
                                Upload
                            </Button>
                        </>)}
                </div>
            </div>

<<<<<<< HEAD:src/features/resources/pages/ResourcesPage.jsx
            {showFilters && (<div className="glass rounded-xl p-4 flex flex-wrap gap-4 animate-fade-in-up">
                    <select value={filters.speciality} onChange={(e) => setFilters({ ...filters, speciality: e.target.value })} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-text-primary focus:outline-none">
=======
            {showFilters && (
                <div className="resources-filters-container">
                    <select value={filters.speciality} onChange={(e) => setFilters({ ...filters, speciality: e.target.value })} className="resources-filter-select">
>>>>>>> ayyoub:src/features/resources/pages/ResourcesPage.tsx
                        <option value="">Toutes spécialités</option>
                        {SPECIALITIES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })} className="resources-filter-select">
                        <option value="">Toutes années</option>
                        {YEARS.map((y) => <option key={y} value={String(y)}>{y}ère année</option>)}
                    </select>
                    <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="resources-filter-select">
                        <option value="">Tous types</option>
                        {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                    </select>
                </div>)}

<<<<<<< HEAD:src/features/resources/pages/ResourcesPage.jsx
            {isLoading ? (<LoadingSpinner text="Chargement des ressources..."/>) : resources.length === 0 ? (<EmptyState icon={<HiOutlineFolder className="w-16 h-16"/>} title="Aucune ressource" description="Pas de ressources pour le moment."/>) : (<div className="space-y-3">
                    {resources.map((r) => (<Card key={r.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
=======
            {isLoading ? (
                <LoadingSpinner text="Chargement des ressources..." />
            ) : resources.length === 0 ? (
                <EmptyState icon={<HiOutlineFolder className="w-16 h-16" />} title="Aucune ressource" description="Pas de ressources pour le moment." />
            ) : (
                <div className="resources-list">
                    {resources.map((r) => (
                        <Card key={r.id} className="resource-card">
                            <div className="resource-info-container">
                                <div className="resource-icon-wrapper">
>>>>>>> ayyoub:src/features/resources/pages/ResourcesPage.tsx
                                    {typeIcons[r.type]}
                                </div>
                                <div>
                                    <h3 className="resource-title">{r.title}</h3>
                                    <p className="resource-meta-text">
                                        {r.speciality} · {r.year}ère année · {formatFileSize(r.fileSize)} · {formatDate(r.createdAt)}
                                    </p>
                                </div>
                            </div>
<<<<<<< HEAD:src/features/resources/pages/ResourcesPage.jsx
                            <div className="flex items-center gap-2">
                                {!r.isValidated && (<span className="px-2 py-1 rounded-lg bg-warning/20 text-warning text-xs">En attente</span>)}
                                <Button variant="ghost" size="sm" icon={<HiOutlineDownload className="w-4 h-4"/>} onClick={() => handleDownload(r.id, r.fileName)}>
=======
                            <div className="resource-actions">
                                {!r.isValidated && (
                                    <span className="resource-pending-badge">En attente</span>
                                )}
                                <Button variant="ghost" size="sm" icon={<HiOutlineDownload />} onClick={() => handleDownload(r.id, r.fileName)}>
>>>>>>> ayyoub:src/features/resources/pages/ResourcesPage.tsx
                                    Télécharger
                                </Button>
                            </div>
                        </Card>))}
                </div>)}
        </div>);
};
export default ResourcesPage;
