import React, { useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import { useDebounce } from '../hooks/useDebounce';
import Input from '../components/common/Input';
import WeatherCard from '../components/weather/WeatherCard';
import LoadingSkeleton from '../components/weather/LoadingSkeleton';
import SearchHistory from '../components/weather/SearchHistory';
import { Search, AlertCircle, CloudRain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CurrentWeather = () => {
    const [searchTerm, setSearchTerm] = useState('New York');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data, loading, error, fetchWeather } = useWeather();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('weather_history') || '[]');
        setHistory(saved);
    }, [data]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchWeather(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, fetchWeather]);

    const handleClearHistory = () => {
        localStorage.removeItem('weather_history');
        setHistory([]);
    };

    return (
        <div className="space-y-16 py-12">
            <div className="text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                >
                    <span className="animate-pulse">●</span> Real-time Analysis Active
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                >
                    Intelligence for Every <br /> <span className="text-primary-500 italic">Atmosphere.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
                >
                    Experience precision atmospheric telemetry with our high-fidelity,
                    glass-morphism analytics engine.
                </motion.p>
            </div>

            <div className="space-y-8 max-w-2xl mx-auto">
                <Input
                    placeholder="Analyze location (e.g., San Francisco)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    loading={loading}
                    icon={Search}
                />

                <SearchHistory
                    history={history}
                    onSelect={setSearchTerm}
                    onClear={handleClearHistory}
                />
            </div>

            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <LoadingSkeleton />
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-8 rounded-2xl flex flex-col items-center gap-4 text-center border-red-500/20"
                        >
                            <div className="p-4 bg-red-500/10 rounded-full">
                                <AlertCircle className="w-8 h-8 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Observation Failed</h3>
                                <p className="text-slate-400 max-w-xs">{error}</p>
                            </div>
                            <button
                                onClick={() => fetchWeather(searchTerm)}
                                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10"
                            >
                                Retry Request
                            </button>
                        </motion.div>
                    ) : data ? (
                        <motion.div
                            key="data"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <WeatherCard data={data} />
                        </motion.div>
                    ) : (
                        <div className="text-center text-slate-500 space-y-4">
                            <CloudRain className="w-12 h-12 mx-auto opacity-20" />
                            <p>Type a location to begin atmospheric analysis</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CurrentWeather;
