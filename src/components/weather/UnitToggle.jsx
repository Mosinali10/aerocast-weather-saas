import React from 'react';
import { motion } from 'framer-motion';

const UnitToggle = ({ units, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all"
        >
            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${units === 'metric' ? 'bg-primary-500 text-white shadow-lg' : 'text-slate-400'
                }`}>
                °C
            </div>
            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${units === 'imperial' ? 'bg-primary-500 text-white shadow-lg' : 'text-slate-400'
                }`}>
                °F
            </div>
        </button>
    );
};

export default UnitToggle;
