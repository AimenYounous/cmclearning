import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchQuestions } from '../store/forumSlice';
import { forumService } from '../services/forumService';
import { Card, Button, Input, LoadingSpinner, EmptyState } from '@/components/ui';
import { timeAgo, getInitials } from '@/utils/helpers';
import {
    HiOutlineChatAlt2,
    HiOutlinePlus,
    HiOutlineChevronUp,
    HiOutlineChat,
    HiOutlineX,
} from 'react-icons/hi';
import '../styles/forum.css';

const ForumPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { questions, isLoading } = useAppSelector((s) => s.forum);
    const [showNewQuestion, setShowNewQuestion] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ title: '', body: '', tags: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { dispatch(fetchQuestions({})); }, [dispatch]);

    const handleAskQuestion = async () => {
        if (!newQuestion.title.trim() || !newQuestion.body.trim()) return;
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
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="forum-wrapper">
            <div className="forum-header">
                <div>
                    <h1 className="forum-title">Forum</h1>
                    <p className="forum-subtitle">Posez vos questions et aidez les autres</p>
                </div>
                <Button
                    size="sm"
                    icon={showNewQuestion ? <HiOutlineX /> : <HiOutlinePlus />}
                    onClick={() => setShowNewQuestion(!showNewQuestion)}
                >
                    {showNewQuestion ? 'Annuler' : 'Poser une question'}
                </Button>
            </div>

            {/* New question form */}
            {showNewQuestion && (
                <Card className="forum-new-question-card">
                    <h2 className="forum-new-question-title">Nouvelle question</h2>
                    <Input
                        label="Titre"
                        placeholder="Votre question en une phrase..."
                        value={newQuestion.title}
                        onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    />
                    <div className="forum-new-question-textarea-wrapper">
                        <label className="forum-new-question-label">Détails</label>
                        <textarea
                            placeholder="Décrivez votre problème en détail..."
                            value={newQuestion.body}
                            onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
                            className="forum-new-question-textarea"
                            rows={5}
                        />
                    </div>
                    <Input
                        label="Tags (séparés par des virgules)"
                        placeholder="react, typescript, api"
                        value={newQuestion.tags}
                        onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
                    />
                    <Button isLoading={submitting} onClick={handleAskQuestion}>
                        Publier la question
                    </Button>
                </Card>
            )}

            {/* Questions list */}
            {isLoading ? (
                <LoadingSpinner text="Chargement des questions..." />
            ) : questions.length === 0 ? (
                <EmptyState
                    icon={<HiOutlineChatAlt2 className="w-16 h-16" />}
                    title="Aucune question"
                    description="Soyez le premier à poser une question !"
                />
            ) : (
                <div className="forum-list">
                    {questions.map((q) => (
                        <Card
                            key={q.id}
                            hover
                            onClick={() => navigate(`/forum/${q.id}`)}
                            className="forum-question-card"
                        >
                            {/* Vote count */}
                            <div className="forum-question-votes">
                                <HiOutlineChevronUp className="forum-question-vote-icon" />
                                <span className="forum-question-vote-count">{q.votes}</span>
                                <span className="forum-question-vote-label">votes</span>
                            </div>

                            {/* Content */}
                            <div className="forum-question-content">
                                <h3 className="forum-question-title">{q.title}</h3>
                                <p className="forum-question-body">{q.body}</p>

                                <div className="forum-question-meta">
                                    {q.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="forum-question-tag"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <div className="forum-question-answers-count">
                                        <HiOutlineChat className="w-3.5 h-3.5" />
                                        {q.answersCount} réponses
                                    </div>
                                    <div className="forum-question-author-meta">
                                        <div className="forum-question-author-avatar">
                                            {getInitials(q.author.firstName, q.author.lastName)}
                                        </div>
                                        <span className="forum-question-time">{timeAgo(q.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ForumPage;
