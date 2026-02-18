import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FavoriteToggle = ({ isFavorite, onToggle }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className={`p-3 rounded-2xl border transition-all ${isFavorite
                    ? 'bg-rose-500/10 border-rose-500/50 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
        >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>
    );
};

export default FavoriteToggle;
