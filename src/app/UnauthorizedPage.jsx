import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { HiOutlineShieldExclamation, HiArrowLeft } from 'react-icons/hi';
const UnauthorizedPage = () => (<div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
            <HiOutlineShieldExclamation className="w-20 h-20 text-danger mx-auto mb-6 opacity-60"/>
            <h1 className="text-3xl font-bold mb-2">Accès refusé</h1>
            <p className="text-text-muted mb-8 max-w-md">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <Link to="/dashboard">
                <Button icon={<HiArrowLeft className="w-4 h-4"/>}>
                    Retour au tableau de bord
                </Button>
            </Link>
        </div>
    </div>);
export default UnauthorizedPage;
