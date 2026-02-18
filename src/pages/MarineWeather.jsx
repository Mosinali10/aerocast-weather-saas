import React, { useState } from 'react';
import { Waves, Wind, Compass, Droplets, MapPin, Anchor, Info } from 'lucide-react';
import Input from '../components/common/Input';
import { motion } from 'framer-motion';

const MarineWeather = () => {
    const [city, setCity] = useState('');

    // Mock data as free plan doesn't support marine
    const mockMarineData = {
        location: { name: 'Pacific Offshore', region: 'Sector 7G', country: 'International Waters' },
        marine: {
            wave_height: '2.4m',
            swell_direction: 'NW',
            water_temp: '18°C',
            visibility: '15km',
            salinity: '35 ppt'
        }
    };

    const metrics = [
        { icon: Waves, label: 'Wave Displacement', value: mockMarineData.marine.wave_height, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { icon: Compass, label: 'Swell Vector', value: mockMarineData.marine.swell_direction, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
        { icon: Droplets, label: 'Thermal Index', value: mockMarineData.marine.water_temp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { icon: Anchor, label: 'Salinity Ratio', value: mockMarineData.marine.salinity, color: 'text-slate-400', bg: 'bg-slate-500/10' },
    ];

    return (
        <div className="space-y-16 py-12">
            <div className="text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                    Maritime <span className="text-primary-500">Intelligence.</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                    Professional oceanographic telemetry for strategic navigation and
                    marine research environments.
                </p>
            </div>

            <div className="max-w-xl mx-auto glass p-1.5 rounded-[2rem] border-blue-500/20 shadow-2xl overflow-hidden">
                <div className="bg-blue-500/5 border border-blue-500/10 px-6 py-4 rounded-3xl flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                        <Info className="w-5 h-5 text-blue-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-blue-200/60 font-medium uppercase tracking-[0.1em] leading-relaxed">
                        <strong>Registry Protocol:</strong> Marine endpoints are prioritized for enterprise tiers.
                        Displaying simulated oceanic telemetry.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <Input
                    placeholder="Search oceanic polygons (e.g. North Sea)..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    icon={MapPin}
                />
            </div>

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {metrics.map((metric, idx) => (
                    <div key={idx} className="glass-card p-10 group relative overflow-hidden border-white/5">
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

            <div className="max-w-4xl mx-auto glass-dark p-10 md:p-12 rounded-[2.5rem] border border-white/10 space-y-8 shadow-3xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <Wind className="w-6 h-6 text-primary-400" />
                        Environmental Breakdown
                    </h2>
                    <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-[10px] font-black uppercase">Stable Conditions</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-slate-400 font-bold text-sm">Optical Visibility</span>
                            <span className="text-white font-black text-lg tracking-tighter">{mockMarineData.marine.visibility}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-slate-400 font-bold text-sm">Atmospheric Salinity</span>
                            <span className="text-white font-black text-lg tracking-tighter">{mockMarineData.marine.salinity}</span>
                        </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl text-sm text-slate-400 leading-relaxed italic border border-white/5 relative">
                        <span className="absolute -top-3 left-6 px-2 bg-slate-900 border border-white/10 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none py-1">Analysis</span>
                        "Oceanographic patterns currently indicate stable surface currents with moderate swell patterns
                        originating from the Northern quadrants. Ideal conditions for light vessel navigation."
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarineWeather;
