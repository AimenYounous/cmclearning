import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchQuestions } from '../store/forumSlice';
import { forumService } from '../services/forumService';
import { Card, Button, Input, LoadingSpinner, EmptyState } from '@/components/ui';
import { timeAgo, getInitials } from '@/utils/helpers';
import { HiOutlineChatAlt2, HiOutlinePlus, HiOutlineChevronUp, HiOutlineChat, HiOutlineX, } from 'react-icons/hi';
const ForumPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { questions, isLoading } = useAppSelector((s) => s.forum);
    const [showNewQuestion, setShowNewQuestion] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ title: '', body: '', tags: '' });
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => { dispatch(fetchQuestions({})); }, [dispatch]);
    const handleAskQuestion = async () => {
        if (!newQuestion.title.trim() || !newQuestion.body.trim())
            return;
        setSubmitting(true);
        try {
            await forumService.createQuestion({
                title: newQuestion.title,
                body: newQuestion.body,
                tags: newQuestion.tags.split(',').map((t) => t.trim()).filter(Boolean),
            });
            setNewQuestion({ title: '', body: '', tags: '' });
            setShowNewQuestion(false);
            dispatch(fetchQuestions({}));
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Forum</h1>
                    <p className="text-text-muted text-sm mt-1">Posez vos questions et aidez les autres</p>
                </div>
                <Button size="sm" icon={showNewQuestion ? <HiOutlineX className="w-4 h-4"/> : <HiOutlinePlus className="w-4 h-4"/>} onClick={() => setShowNewQuestion(!showNewQuestion)}>
                    {showNewQuestion ? 'Annuler' : 'Poser une question'}
                </Button>
            </div>

            {/* New question form */}
            {showNewQuestion && (<Card className="animate-fade-in-up space-y-4">
                    <h2 className="text-lg font-semibold">Nouvelle question</h2>
                    <Input label="Titre" placeholder="Votre question en une phrase..." value={newQuestion.title} onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}/>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-text-secondary">Détails</label>
                        <textarea placeholder="Décrivez votre problème en détail..." value={newQuestion.body} onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 resize-none" rows={5}/>
                    </div>
                    <Input label="Tags (séparés par des virgules)" placeholder="react, typescript, api" value={newQuestion.tags} onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}/>
                    <Button isLoading={submitting} onClick={handleAskQuestion}>
                        Publier la question
                    </Button>
                </Card>)}

            {/* Questions list */}
            {isLoading ? (<LoadingSpinner text="Chargement des questions..."/>) : questions.length === 0 ? (<EmptyState icon={<HiOutlineChatAlt2 className="w-16 h-16"/>} title="Aucune question" description="Soyez le premier à poser une question !"/>) : (<div className="space-y-3">
                    {questions.map((q) => (<Card key={q.id} hover onClick={() => navigate(`/forum/${q.id}`)} className="flex gap-4">
                            {/* Vote count */}
                            <div className="flex flex-col items-center gap-1 min-w-[50px] text-center">
                                <HiOutlineChevronUp className="w-5 h-5 text-text-muted"/>
                                <span className="text-lg font-bold">{q.votes}</span>
                                <span className="text-[10px] text-text-muted">votes</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold mb-1 line-clamp-1">{q.title}</h3>
                                <p className="text-sm text-text-muted line-clamp-2 mb-3">{q.body}</p>

                                <div className="flex flex-wrap items-center gap-3">
                                    {q.tags.map((tag) => (<span key={tag} className="px-2 py-0.5 rounded-md bg-primary/15 text-primary-light text-xs font-medium">
                                            {tag}
                                        </span>))}
                                    <div className="flex items-center gap-1.5 text-xs text-text-muted ml-auto">
                                        <HiOutlineChat className="w-3.5 h-3.5"/>
                                        {q.answersCount} réponses
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 rounded-full gradient-accent flex items-center justify-center text-[8px] font-bold">
                                            {getInitials(q.author.firstName, q.author.lastName)}
                                        </div>
                                        <span className="text-xs text-text-muted">{timeAgo(q.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>))}
                </div>)}
        </div>);
};
export default ForumPage;
