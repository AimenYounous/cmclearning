import { useAuth } from '@/features/auth/hooks/useAuth';
import { Card } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineFolder, HiOutlineChatAlt2, HiOutlineSearch, HiOutlineAcademicCap, HiOutlineTrendingUp, } from 'react-icons/hi';
const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const quickLinks = [
        { label: 'Mes Cours', icon: HiOutlineBookOpen, to: '/courses', color: 'from-indigo-500 to-purple-500' },
        { label: 'Ressources', icon: HiOutlineFolder, to: '/resources', color: 'from-emerald-500 to-teal-500' },
        { label: 'Forum', icon: HiOutlineChatAlt2, to: '/forum', color: 'from-pink-500 to-rose-500' },
        { label: 'Recherche', icon: HiOutlineSearch, to: '/search', color: 'from-amber-500 to-orange-500' },
    ];
    return (<div className="space-y-8">
            {/* Welcome hero */}
            <div className="glass-strong rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
                <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                        <HiOutlineAcademicCap className="w-6 h-6 text-primary-light"/>
                        <span className="text-sm text-primary-light font-medium">CMC-Learning</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Bienvenue, {user?.firstName} ! 👋
                    </h1>
                    <p className="text-text-muted max-w-lg">
                        Continuez votre apprentissage. Explorez les cours, participez au forum et accédez aux ressources pédagogiques.
                    </p>
                </div>
            </div>

            {/* Quick links */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Accès rapide</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (<Card key={link.label} hover onClick={() => navigate(link.to)} className="text-center py-8 group">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                <link.icon className="w-7 h-7 text-white"/>
                            </div>
                            <p className="font-semibold text-sm">{link.label}</p>
                        </Card>))}
                </div>
            </div>

            {/* Stats placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10 -translate-y-4 translate-x-4"/>
                    <div className="flex items-center gap-3">
                        <HiOutlineBookOpen className="w-8 h-8 text-primary-light"/>
                        <div>
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-sm text-text-muted">Cours suivis</p>
                        </div>
                    </div>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 -translate-y-4 translate-x-4"/>
                    <div className="flex items-center gap-3">
                        <HiOutlineTrendingUp className="w-8 h-8 text-success"/>
                        <div>
                            <p className="text-2xl font-bold">85%</p>
                            <p className="text-sm text-text-muted">Progression</p>
                        </div>
                    </div>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 opacity-10 -translate-y-4 translate-x-4"/>
                    <div className="flex items-center gap-3">
                        <HiOutlineChatAlt2 className="w-8 h-8 text-secondary"/>
                        <div>
                            <p className="text-2xl font-bold">7</p>
                            <p className="text-sm text-text-muted">Questions posées</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>);
};
export default Dashboard;
