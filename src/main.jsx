import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
<<<<<<< HEAD:src/main.jsx
createRoot(document.getElementById('root')).render(<StrictMode>
=======
import './styles/shared.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
>>>>>>> ayyoub:src/main.tsx
        <App />
    </StrictMode>);
