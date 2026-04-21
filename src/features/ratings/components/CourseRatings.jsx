import { useState } from 'react';
import { StarRating, Button, Card } from '@/components/ui';
import { ratingsService } from '../services/ratingsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { timeAgo, getInitials } from '@/utils/helpers';
const CourseRatings = ({ courseId, ratings, onRatingAdded }) => {
    const { user } = useAuth();
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const hasRated = ratings.some((r) => r.userId === user?.id);
    const handleSubmit = async () => {
        if (value === 0)
            return;
        setSubmitting(true);
        try {
            await ratingsService.create(courseId, { value, comment: comment || undefined });
            setValue(0);
            setComment('');
            onRatingAdded();
        }
        finally {
            setSubmitting(false);
        }
    };
<<<<<<< HEAD:src/features/ratings/components/CourseRatings.jsx
    return (<Card>
            <h2 className="text-xl font-semibold mb-4">Avis & Évaluations</h2>

            {!hasRated && user && (<div className="mb-6 p-4 rounded-xl bg-white/3 space-y-3">
                    <p className="text-sm font-medium">Donner votre avis</p>
                    <StarRating rating={value} interactive onChange={setValue} size="lg"/>
                    <textarea placeholder="Commentaire optionnel..." value={comment} onChange={(e) => setComment(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 resize-none" rows={3}/>
=======

    return (
        <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Avis & Évaluations</h2>

            {!hasRated && user && (
                <div className="mb-6 p-4 rounded-xl bg-gray-50 space-y-3">
                    <p className="text-sm font-medium text-gray-700">Donner votre avis</p>
                    <StarRating rating={value} interactive onChange={setValue} size="lg" />
                    <textarea
                        placeholder="Commentaire optionnel..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                        rows={3}
                    />
>>>>>>> ayyoub:src/features/ratings/components/CourseRatings.tsx
                    <Button size="sm" isLoading={submitting} onClick={handleSubmit} disabled={value === 0}>
                        Soumettre
                    </Button>
                </div>)}

            <div className="space-y-4">
<<<<<<< HEAD:src/features/ratings/components/CourseRatings.jsx
                {ratings.length === 0 ? (<p className="text-sm text-text-muted">Aucun avis pour le moment.</p>) : (ratings.map((r) => (<div key={r.id} className="flex gap-3 p-3 rounded-xl bg-white/3">
                            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-xs font-bold flex-shrink-0">
=======
                {ratings.length === 0 ? (
                    <p className="text-sm text-gray-400">Aucun avis pour le moment.</p>
                ) : (
                    ratings.map((r) => (
                        <div key={r.id} className="flex gap-3 p-3 rounded-xl bg-gray-50">
                            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
>>>>>>> ayyoub:src/features/ratings/components/CourseRatings.tsx
                                {getInitials(r.user.firstName, r.user.lastName)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900">{r.user.firstName} {r.user.lastName}</span>
                                    <span className="text-xs text-gray-400">{timeAgo(r.createdAt)}</span>
                                </div>
<<<<<<< HEAD:src/features/ratings/components/CourseRatings.jsx
                                <StarRating rating={r.value} size="sm"/>
                                {r.comment && <p className="text-sm text-text-secondary mt-1">{r.comment}</p>}
=======
                                <StarRating rating={r.value} size="sm" />
                                {r.comment && <p className="text-sm text-gray-600 mt-1">{r.comment}</p>}
>>>>>>> ayyoub:src/features/ratings/components/CourseRatings.tsx
                            </div>
                        </div>)))}
            </div>
        </Card>);
};
export default CourseRatings;
