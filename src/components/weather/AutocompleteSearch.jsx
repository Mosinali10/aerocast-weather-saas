import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';

const AutocompleteSearch = ({ onSelect, suggestions, fetchSuggestions }) => {
    const [query, setQuery] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 400);
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            fetchSuggestions(debouncedQuery);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [debouncedQuery, fetchSuggestions]);

    const handleSelect = (item) => {
        onSelect(item.lat, item.lon, `${item.name}, ${item.country}`);
        setQuery('');
        setIsOpen(false);
    };

    // Filter suggestions based on selected country if a filter is active
    const filteredSuggestions = countryFilter
        ? suggestions.filter(item => item.country === countryFilter)
        : suggestions;

    return (
        <div className="relative w-full max-w-2xl mx-auto z-50 flex flex-col md:flex-row gap-4" ref={dropdownRef}>
            <div className="relative group flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-primary-400 group-focus-within:text-primary-300 transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city globally..."
                    className="block w-full pl-12 pr-12 py-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-2xl"
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Country Filter Swatches/Dropdown */}
            <div className="flex-shrink-0">
                <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="h-full px-6 py-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl text-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer hover:bg-white/5 transition-all outline-none"
                >
                    <option value="" className="bg-slate-900">🌍 All Regions</option>
                    <option value="IN" className="bg-slate-900">🇮🇳 India</option>
                    <option value="PK" className="bg-slate-900">🇵🇰 Pakistan</option>
                    <option value="AE" className="bg-slate-900">🇦🇪 UAE</option>
                    <option value="JO" className="bg-slate-900">🇯🇴 Jordan</option>
                    <option value="US" className="bg-slate-900">🇺🇸 USA</option>
                    <option value="GB" className="bg-slate-900">🇬🇧 UK</option>
                </select>
            </div>

            <AnimatePresence>
                {isOpen && filteredSuggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 w-full mt-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {filteredSuggestions.map((item, index) => (
                            <button
                                key={`${item.lat}-${item.lon}-${index}`}
                                onClick={() => handleSelect(item)}
                                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none text-left"
                            >
                                <div className="p-2 bg-primary-500/10 rounded-lg">
                                    <MapPin className="h-4 w-4 text-primary-400" />
                                </div>
                                <div>
                                    <div className="text-white font-medium flex items-center gap-2">
                                        {item.name}
                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 uppercase font-bold">
                                            {item.country}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-medium">
                                        {item.state ? `${item.state}, ` : ''}{item.country} • Lat: {item.lat.toFixed(2)} Lon: {item.lon.toFixed(2)}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AutocompleteSearch;
