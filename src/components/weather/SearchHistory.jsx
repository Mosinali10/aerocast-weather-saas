import React from 'react';
import { History, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchHistory = ({ history, onSelect, onClear }) => {
    if (!history || history.length === 0) return null;

    return (
        <div className="max-w-xl mx-auto w-full mt-8">
            <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <History className="w-3.5 h-3.5" />
                    Archive History
                </span>
                <button
                    onClick={onClear}
                    className="text-[10px] font-black text-slate-600 hover:text-red-400 transition-colors uppercase tracking-[0.2em]"
                >
                    Flush Cache
                </button>
            </div>
            <div className="flex flex-wrap gap-3">
                {history.map((city, idx) => (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={city}
                        onClick={() => onSelect(city.split(',')[0])} // Search for the city part
                        className="px-5 py-2.5 glass rounded-2xl text-xs font-bold text-slate-300 hover:text-primary-400 hover:border-primary-500/40 transition-all flex items-center gap-2 active:scale-95"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                        {city}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SearchHistory;
