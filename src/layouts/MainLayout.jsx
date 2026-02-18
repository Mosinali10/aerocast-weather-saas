import React from 'react';
import Navbar from '../components/common/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-mesh text-slate-200">
            {/* Dynamic Glow Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-600/20 rounded-full blur-[160px] animate-glow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] animate-glow" style={{ animationDelay: '-4s' }} />

            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="py-8 glass-dark border-t border-white/5 text-center mt-auto">
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} AeroCast Weather Intelligence. Powered by Weatherstack.
                </p>
            </footer>
        </div>
    );
};

export default MainLayout;
