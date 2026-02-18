import React from 'react';
import { Waves, Wind, Compass, Droplets, MapPin, Anchor, Info, Ship } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AutocompleteSearch from '../components/weather/AutocompleteSearch';
import WeatherBackground from '../components/layout/WeatherBackground';
import { useWeather } from '../hooks/useWeather';

const MarineWeather = () => {
    const {
        suggestions,
        fetchSuggestions,
    } = useWeather();

    // Mock data as free plan doesn't support marine
    const mockMarineData = {
        location: { name: 'Pacific Offshore', region: 'Sector 7G', country: 'INT' },
        marine: {
            wave_height: '2.4m',
            swell_direction: 'NW',
            water_temp: '18°C',
            visibility: '15km',
            salinity: '35 ppt',
            current_speed: '1.2 knots'
        }
    };

    const metrics = [
        { icon: Waves, label: 'Wave Displacement', value: mockMarineData.marine.wave_height, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { icon: Compass, label: 'Swell Vector', value: mockMarineData.marine.swell_direction, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
        { icon: Droplets, label: 'Thermal Index', value: mockMarineData.marine.water_temp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { icon: Ship, label: 'Current Velocity', value: mockMarineData.marine.current_speed, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-4">
            <WeatherBackground condition="rain" />

            <div className="relative z-10 max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                        Maritime <span className="text-primary-500 underline decoration-primary-500/30">Intelligence.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Professional oceanographic telemetry for strategic navigation and
                        marine research environments.
                    </p>
                </div>

                <div className="max-w-xl mx-auto bg-blue-500/5 backdrop-blur-xl border border-blue-500/20 px-8 py-4 rounded-[2rem] flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                        <Info className="w-5 h-5 text-blue-400 shrink-0" />
                    </div>
                    <p className="text-xs text-blue-200/60 font-medium uppercase tracking-widest leading-relaxed">
                        <strong className="text-blue-400">Registry Protocol:</strong> Marine endpoints prioritize enterprise Tier 4 nodes. Displaying high-fidelity mock telemetry.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <AutocompleteSearch
                        onSelect={() => { }} // No-op as it's mock
                        suggestions={suggestions}
                        fetchSuggestions={fetchSuggestions}
                    />
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="bg-slate-900/40 backdrop-blur-2xl p-10 group relative border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
                                <metric.icon className="w-24 h-24" />
                            </div>
                            <div className={`p-4 rounded-2xl ${metric.bg} w-fit mb-8`}>
                                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                            </div>
                            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{metric.label}</h3>
                            <p className="text-4xl font-black text-white tracking-tighter">{metric.value}</p>
                        </div>
                    ))}
                </motion.div>

                <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-3xl p-10 md:p-12 rounded-[3rem] border border-white/10 space-y-8 shadow-3xl overflow-hidden relative">
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />
                    <div className="flex items-center justify-between relative z-10">
                        <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                            <Wind className="w-6 h-6 text-primary-400" />
                            Oceanic Environment Breakdown
                        </h2>
                        <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-[10px] font-black uppercase">Stable Vector</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-5 border-b border-white/5">
                                <span className="text-slate-400 font-bold text-sm">Optical Visibility</span>
                                <span className="text-white font-black text-xl tracking-tighter">{mockMarineData.marine.visibility}</span>
                            </div>
                            <div className="flex justify-between items-center py-5 border-b border-white/5">
                                <span className="text-slate-400 font-bold text-sm">Atmospheric Salinity</span>
                                <span className="text-white font-black text-xl tracking-tighter">{mockMarineData.marine.salinity}</span>
                            </div>
                        </div>
                        <div className="p-8 bg-white/5 rounded-[2rem] text-sm text-slate-400 leading-relaxed italic border border-white/5 relative group">
                            <span className="absolute -top-3 left-6 px-3 bg-slate-900 border border-white/10 rounded-lg text-[10px] font-bold text-primary-400 uppercase tracking-widest leading-none py-1.5 shadow-xl">Analyst Insight</span>
                            "Oceanographic patterns currently indicate stable surface currents with moderate swell patterns
                            originating from the Northern quadrants. Ideal conditions for light vessel navigation and offshore data-collecting nodes."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarineWeather;
