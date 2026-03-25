import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
const NotFoundPage = () => (<div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
            <p className="text-8xl font-bold gradient-text mb-4">404</p>
            <h1 className="text-2xl font-bold mb-2">Page introuvable</h1>
            <p className="text-text-muted mb-8">La page que vous cherchez n'existe pas.</p>
            <Link to="/dashboard">
                <Button icon={<HiArrowLeft className="w-4 h-4"/>}>
                    Retour au tableau de bord
                </Button>
            </Link>
        </div>
    </div>);
export default NotFoundPage;
