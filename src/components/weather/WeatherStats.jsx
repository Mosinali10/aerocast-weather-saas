import React from 'react';
import { Sunrise, Sunset, Eye, Droplets, Wind, Thermometer, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, unit, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all group"
    >
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-500/10 rounded-xl group-hover:scale-110 transition-transform">
                <Icon className="h-4 w-4 text-primary-400" />
            </div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">{value}</span>
            <span className="text-xs text-slate-500">{unit}</span>
        </div>
    </motion.div>
);

const WeatherStats = ({ data, units }) => {
    if (!data) return null;

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const stats = [
        { icon: Thermometer, label: 'Feels Like', value: Math.round(data.main.feels_like), unit: units === 'metric' ? '°C' : '°F' },
        { icon: Droplets, label: 'Humidity', value: data.main.humidity, unit: '%' },
        { icon: Wind, label: 'Wind Speed', value: data.wind.speed, unit: units === 'metric' ? 'm/s' : 'mph' },
        { icon: Eye, label: 'Visibility', value: (data.visibility / 1000).toFixed(1), unit: 'km' },
        { icon: Sunrise, label: 'Sunrise', value: formatTime(data.sys.sunrise), unit: 'AM' },
        { icon: Sunset, label: 'Sunset', value: formatTime(data.sys.sunset), unit: 'PM' },
        { icon: Compass, label: 'Pressure', value: data.main.pressure, unit: 'hPa' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
                <StatCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
        </div>
    );
};

export default WeatherStats;
