import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import WeatherBackground from '../components/layout/WeatherBackground';
import AutocompleteSearch from '../components/weather/AutocompleteSearch';
import WeatherStats from '../components/weather/WeatherStats';
import ForecastGrid from '../components/weather/ForecastGrid';
import UnitToggle from '../components/weather/UnitToggle';
import FavoriteToggle from '../components/weather/FavoriteToggle';
import { MapPin, Wind, Droplets, Thermometer, ArrowRight, Star } from 'lucide-react';

const CurrentWeather = () => {
    const {
        currentWeather,
        forecast,
        loading,
        error,
        units,
        favorites,
        suggestions,
        toggleUnits,
        toggleFavorite,
        fetchSuggestions,
        fetchAllData
    } = useWeather();

    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        // Load history for the "Welcome" view
        const history = JSON.parse(localStorage.getItem('weather_history') || '[]');
        setSearchHistory(history);

        // Initial fetch for a default city if nothing is loaded
        if (!currentWeather && !loading) {
            fetchAllData(28.6667, 77.2167, 'New Delhi, IN'); // Default to Delhi
        }
    }, []);

    const handleSelectLocation = (lat, lon, cityName) => {
        fetchAllData(lat, lon, cityName);
        // Refresh local history view
        setSearchHistory(prev => [cityName, ...prev.filter(h => h !== cityName)].slice(0, 5));
    };

    const isFavorite = currentWeather ? favorites.includes(`${currentWeather.name}, ${currentWeather.sys.country}`) : false;

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-4 overflow-hidden">
            <WeatherBackground condition={currentWeather?.weather[0]?.main} />

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                        Premium Weather <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 underline decoration-primary-500/30">Analytics</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                        Experience precision atmospheric telemetry with our high-fidelity, glass-morphism analytics engine.
                    </p>
                </motion.div>

                <div className="mb-12">
                    <AutocompleteSearch
                        onSelect={handleSelectLocation}
                        suggestions={suggestions}
                        fetchSuggestions={fetchSuggestions}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24"
                        >
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full animate-ping" />
                                <div className="absolute inset-0 border-t-4 border-primary-500 rounded-full animate-spin" />
                            </div>
                            <p className="mt-8 text-primary-400 font-bold tracking-widest uppercase animate-pulse">Synchronizing Telemetry...</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 p-12 rounded-[2.5rem] text-center max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-rose-500 text-3xl font-black">!</span>
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2">Observation Failed</h2>
                            <p className="text-rose-400/80 mb-8 font-medium">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-rose-600/20"
                            >
                                Retry Request
                            </button>
                        </motion.div>
                    ) : currentWeather && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Stats Card */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-3xl overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-8 flex gap-3">
                                            <UnitToggle units={units} onToggle={toggleUnits} />
                                            <FavoriteToggle
                                                isFavorite={isFavorite}
                                                onToggle={() => toggleFavorite(`${currentWeather.name}, ${currentWeather.sys.country}`)}
                                            />
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div>
                                                <div className="flex items-center gap-2 text-primary-400 mb-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="text-sm font-black uppercase tracking-widest">Atmospheric Station</span>
                                                </div>
                                                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
                                                    {currentWeather.name}
                                                    <span className="text-primary-500/20 ml-4 font-normal text-4xl">{currentWeather.sys.country}</span>
                                                </h2>
                                                <p className="text-slate-400 text-xl font-medium line-clamp-1 italic italic capitalize">
                                                    {currentWeather.weather[0].description} — The atmosphere is currently {currentWeather.weather[0].main.toLowerCase()}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-8">
                                                <motion.div
                                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                                    className="relative"
                                                >
                                                    <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                                                        alt="weather icon"
                                                        className="w-48 h-48 md:w-56 md:h-56 relative z-10"
                                                    />
                                                </motion.div>
                                                <div className="text-right">
                                                    <div className="text-8xl md:text-9xl font-black text-white tracking-tighter leading-none mb-2">
                                                        {Math.round(currentWeather.main.temp)}°
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <WeatherStats data={currentWeather} units={units} />
                                    </div>

                                    {/* 5-Day Forecast Grid */}
                                    <ForecastGrid forecastData={forecast} />
                                </div>

                                {/* Sidebar: Quick Actions & History */}
                                <div className="space-y-8">
                                    {/* Favorites / Recent Searches */}
                                    <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                                        <h3 className="text-sm font-black text-primary-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <Star className="h-4 w-4 fill-current" />
                                            Satellite History
                                        </h3>
                                        <div className="space-y-3">
                                            {(searchHistory.length > 0 ? searchHistory : favorites).map((city, idx) => (
                                                <motion.button
                                                    key={`${city}-${idx}`}
                                                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 hover:text-white transition-all text-left group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                                                            <MapPin className="h-3 w-3 text-primary-400" />
                                                        </div>
                                                        <span className="font-bold text-sm">{city}</span>
                                                    </div>
                                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
                                                </motion.button>
                                            ))}
                                            {searchHistory.length === 0 && favorites.length === 0 && (
                                                <p className="text-slate-500 text-xs text-center py-4 italic">No recent atmospheric logs found</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Insight Card */}
                                    <div className="bg-gradient-to-br from-primary-600/20 to-secondary-600/20 backdrop-blur-xl border border-primary-500/20 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
                                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-white font-black text-xl mb-4 leading-tight">Ready for a professional analysis?</h3>
                                        <p className="text-primary-200/70 text-sm mb-6 leading-relaxed">
                                            Switch to our full-screen analytics engine for detailed historical telemetry and maritime metrics.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 bg-primary-500 hover:bg-primary-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-primary-500/20"
                                        >
                                            Open Analytics Engine
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CurrentWeather;
