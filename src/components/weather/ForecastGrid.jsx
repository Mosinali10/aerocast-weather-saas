import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const ForecastCard = ({ day, delay }) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex-shrink-0 w-40 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all text-center group"
        >
            <div className="text-slate-400 text-xs font-bold uppercase mb-1">{dayName}</div>
            <div className="text-slate-500 text-[10px] mb-4">{monthDay}</div>

            <div className="flex justify-center mb-4">
                <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt="weather"
                    className="h-12 w-12 group-hover:scale-110 transition-transform"
                />
            </div>

            <div className="text-xl font-black text-white mb-1">{Math.round(day.temp)}°</div>
            <div className="text-[10px] text-slate-400 font-medium uppercase truncate px-2">
                {day.description}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-[10px]">
                <div className="flex flex-col">
                    <span className="text-slate-600 font-bold uppercase">Max</span>
                    <span className="text-primary-400 font-bold">{Math.round(day.temp_max)}°</span>
                </div>
                <div className="flex flex-col border-l border-white/5 pl-4">
                    <span className="text-slate-600 font-bold uppercase">Min</span>
                    <span className="text-secondary-400 font-bold">{Math.round(day.temp_min)}°</span>
                </div>
            </div>
        </motion.div>
    );
};

const ForecastGrid = ({ forecastData }) => {
    if (!forecastData) return null;

    // OpenWeather provides 3-hour intervals. We gather highlights per day.
    const dailyForecasts = [];
    const seenDates = new Set();

    forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!seenDates.has(date) && dailyForecasts.length < 5) {
            seenDates.add(date);
            dailyForecasts.push({
                date,
                temp: item.main.temp,
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
                description: item.weather[0].description,
                icon: item.weather[0].icon
            });
        }
    });

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-primary-500 rounded-full"></span>
                    5-Day Forecast Analytics
                </h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                {dailyForecasts.map((day, index) => (
                    <ForecastCard key={day.date} day={day} delay={index * 0.1} />
                ))}
            </div>
        </div>
    );
};

export default ForecastGrid;
