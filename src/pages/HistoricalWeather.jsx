import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { Calendar, Search, History as HistoryIcon, Thermometer, Wind, Filter, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AutocompleteSearch from '../components/weather/AutocompleteSearch';
import WeatherBackground from '../components/layout/WeatherBackground';

const HistoricalWeather = () => {
    const {
        data,
        forecast,
        loading,
        error,
        suggestions,
        fetchSuggestions,
        fetchAllData
    } = useWeather();

    const handleSelectLocation = (lat, lon, cityName) => {
        fetchAllData(lat, lon, cityName);
    };

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-4">
            <WeatherBackground condition="clear" />

            <div className="relative z-10 max-w-6xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Archive <span className="text-primary-500">Telemetry.</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                        Detailed longitudinal analysis derived from our high-fidelity 5-day predictive engine.
                    </p>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <AutocompleteSearch
                        onSelect={handleSelectLocation}
                        suggestions={suggestions}
                        fetchSuggestions={fetchSuggestions}
                    />
                </div>

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24"
                            >
                                <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                                <p className="mt-4 text-primary-400 font-bold uppercase tracking-widest text-xs">Accessing Data Vault...</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 p-12 rounded-[2rem] text-center max-w-lg mx-auto"
                            >
                                <p className="text-rose-500 font-bold text-lg mb-2">Observation Failed</p>
                                <p className="text-slate-400 text-sm">{error}</p>
                            </motion.div>
                        ) : forecast ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5">
                                                <th className="px-8 py-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Atmospheric Metric</th>
                                                <th className="px-8 py-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Timestamp / Node</th>
                                                <th className="px-8 py-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Precision Analysis</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {forecast.list.slice(0, 8).map((item, idx) => (
                                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-2.5 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                                                                <Thermometer className="w-5 h-5 text-primary-400" />
                                                            </div>
                                                            <div>
                                                                <div className="text-white font-bold tracking-tight">Temperature Node</div>
                                                                <div className="text-[10px] text-slate-500 uppercase font-black">{item.weather[0].main}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="text-primary-400 font-black text-2xl tracking-tighter">
                                                            {Math.round(item.main.temp)}°
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 uppercase font-bold">
                                                            {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-slate-400 text-xs font-medium leading-relaxed uppercase tracking-tighter">
                                                        {item.weather[0].description} at {Math.round(item.main.feels_like)}° feels-like threshold
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-slate-600 gap-6 opacity-40 py-24">
                                <div className="p-8 bg-white/5 rounded-full border border-white/5">
                                    <HistoryIcon className="w-16 h-16" />
                                </div>
                                <p className="font-black uppercase tracking-widest text-sm">Target Location Required for Log Retrieval</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default HistoricalWeather;
