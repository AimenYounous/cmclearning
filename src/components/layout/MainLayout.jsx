import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
<<<<<<< HEAD:src/components/layout/MainLayout.jsx
const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (<div className="min-h-screen flex flex-col bg-surface">
            {/* The Navbar takes up space at the top */}
            <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>

            {/* The main layout area minus the navbar height */}
            <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
                <main className="flex-1 overflow-y-auto bg-surface p-6 lg:p-8 relative">
                    {/* Decorative background gradients for main content */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"/>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none"/>

                    <div className="max-w-7xl mx-auto animate-fade-in-up">
=======
import './styles/layout.css';

const MainLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout-wrapper">
            <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="layout-body">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="layout-main">
                    <div className="layout-content animate-fade-in-up">
>>>>>>> ayyoub:src/components/layout/MainLayout.tsx
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>);
};
export default MainLayout;
