import React from 'react';
import { Wind, Droplets, Thermometer, Compass, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherCard = ({ data }) => {
    const { current, location } = data;

    const stats = [
        { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { icon: Wind, label: 'Wind Velocity', value: `${current.wind_speed} km/h`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { icon: Thermometer, label: 'Perception', value: `${current.feelslike}°`, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { icon: Compass, label: 'Atm. Pressure', value: `${current.pressure} mb`, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    ];

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-5xl mx-auto w-full glass-card p-10 md:p-16 overflow-hidden relative border-t border-white/10"
        >
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="text-center lg:text-left flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest truncate max-w-[200px]">
                            {location.name}, {location.country}
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                        {current.temperature}<span className="text-primary-500/50">°</span>
                    </h2>

                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <div className="p-1 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                            <img
                                src={current.weather_icons[0]}
                                alt={current.weather_descriptions[0]}
                                className="w-16 h-16 object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-white capitalize leading-tight">
                                {current.weather_descriptions[0]}
                            </p>
                            <p className="text-slate-400 text-sm font-medium">Local context: {location.localtime}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 w-full lg:w-auto shrink-0">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="glass bg-white/5 p-6 rounded-3xl flex flex-col gap-4 min-w-[160px] border border-white/5 group hover:border-white/10 transition-colors">
                            <div className={`p-3 rounded-2xl ${stat.bg} w-fit`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    {stat.label}
                                </span>
                                <p className="text-white text-2xl font-black mt-1">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherCard;
