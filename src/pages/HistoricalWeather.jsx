import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import Input from '../components/common/Input';
import { Calendar, Search, History as HistoryIcon, Thermometer, Wind, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HistoricalWeather = () => {
    const [city, setCity] = useState('');
    const { data, loading, error, fetchHistorical } = useWeather();

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            fetchHistorical(city);
        }
    };

    return (
        <div className="space-y-12 py-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                    Archive <span className="text-primary-500">Telemetry.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                    Review predictive and historical trajectory patterns Across
                    the global atmospheric timeline.
                </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto glass-card p-4 flex gap-4 items-center border-white/5">
                <div className="flex-grow">
                    <Input
                        placeholder="Enter location for analysis..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        icon={Search}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !city}
                    className="btn-primary flex items-center justify-center gap-2 group w-48"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <HistoryIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    )}
                    Analyze
                </button>
            </form>

            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="glass p-12 rounded-[2rem] text-center border-red-500/20 max-w-lg mx-auto"
                        >
                            <p className="text-red-400 font-bold text-lg mb-2">Observation Failed</p>
                            <p className="text-slate-400 text-sm">{error}</p>
                        </motion.div>
                    ) : data && data.historical ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-dark rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5">
                                            <th className="px-8 py-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Metric</th>
                                            <th className="px-8 py-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Telemetry</th>
                                            <th className="px-8 py-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Analysis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {Object.entries(data.historical).map(([date, details]) => (
                                            <React.Fragment key={date}>
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-6 flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-orange-500/10">
                                                            <Thermometer className="w-5 h-5 text-orange-400" />
                                                        </div>
                                                        <span className="text-white font-bold tracking-tight">Avg Temperature</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-primary-400 font-black text-2xl tracking-tighter">{details.avgtemp}°<span className="text-primary-500/30">C</span></td>
                                                    <td className="px-8 py-6 text-slate-400 text-xs font-medium leading-relaxed uppercase tracking-tighter">
                                                        Averages: {details.summary}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-6 flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-red-500/10">
                                                            <Thermometer className="w-5 h-5 text-red-100/40" />
                                                        </div>
                                                        <span className="text-white font-bold tracking-tight">Peak Intensity</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-slate-200 font-black text-2xl tracking-tighter">{details.maxtemp}°<span className="text-red-500/30">C</span></td>
                                                    <td className="px-8 py-6 text-slate-400 text-xs font-medium leading-relaxed uppercase tracking-tighter">
                                                        Threshold: {details.summary}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-6 flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-blue-500/10">
                                                            <Thermometer className="w-5 h-5 text-blue-400" />
                                                        </div>
                                                        <span className="text-white font-bold tracking-tight">Baseline Min</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-slate-200 font-black text-2xl tracking-tighter">{details.mintemp}°<span className="text-blue-500/30">C</span></td>
                                                    <td className="px-8 py-6 text-slate-400 text-xs font-medium leading-relaxed uppercase tracking-tighter">
                                                        Minimums: {details.summary}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-white/5 transition-colors border-b-0">
                                                    <td className="px-8 py-6 flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-emerald-500/10">
                                                            <Wind className="w-5 h-5 text-emerald-400" />
                                                        </div>
                                                        <span className="text-white font-bold tracking-tight">Solar Exposure</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-slate-200 font-black text-2xl tracking-tighter">{details.sunhour || 'N/A'} <span className="text-emerald-500/30 font-bold uppercase text-[10px]">HRS</span></td>
                                                    <td className="px-8 py-6 text-slate-400 text-xs font-medium leading-relaxed uppercase tracking-tighter">
                                                        State: {details.summary}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-600 gap-4 opacity-40">
                            <HistoryIcon className="w-16 h-16" />
                            <p className="font-medium">Enter location and date to retrieve archive</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HistoricalWeather;
