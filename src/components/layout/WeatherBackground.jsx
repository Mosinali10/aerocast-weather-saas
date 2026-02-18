import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherBackground = ({ condition }) => {
    // Determine background colors based on weather condition
    const getBgColors = () => {
        const lowerCondition = condition?.toLowerCase() || '';
        if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return 'from-slate-900 via-blue-900 to-slate-900';
        if (lowerCondition.includes('cloud')) return 'from-slate-900 via-slate-800 to-slate-900';
        if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) return 'from-slate-900 via-indigo-950 to-slate-900';
        if (lowerCondition.includes('snow')) return 'from-slate-900 via-blue-950 to-slate-900';
        return 'from-slate-950 via-slate-900 to-black';
    };

    return (
        <div className={`fixed inset-0 z-0 transition-all duration-1000 bg-gradient-to-br ${getBgColors()}`}>
            {/* Animated Mesh Gradients */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -left-1/4 w-full h-full bg-primary-500/20 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-secondary-500/20 blur-[120px] rounded-full"
                />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
    );
};

export default WeatherBackground;
