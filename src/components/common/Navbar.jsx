import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, History, Anchor, Search } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 px-6 py-4 glass-dark border-b border-white/5 shadow-2xl backdrop-blur-3xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <NavLink to="/" className="flex items-center gap-2 group">
                    <div className="p-2.5 glass rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300 group-hover:rotate-12">
                        <Cloud className="w-6 h-6 text-primary-400" />
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-br from-white via-white to-primary-400 bg-clip-text text-transparent tracking-tighter">
                        AeroCast
                    </span>
                </NavLink>

                <div className="flex items-center gap-1 md:gap-4 p-1 rounded-2xl bg-white/5 border border-white/5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl ${isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        <Cloud className="w-4 h-4" />
                        <span className="hidden md:inline uppercase tracking-widest text-[10px]">Current</span>
                    </NavLink>

                    <NavLink
                        to="/historical"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl ${isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        <History className="w-4 h-4" />
                        <span className="hidden md:inline uppercase tracking-widest text-[10px]">Archive</span>
                    </NavLink>

                    <NavLink
                        to="/marine"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl ${isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        <Anchor className="w-4 h-4" />
                        <span className="hidden md:inline uppercase tracking-widest text-[10px]">Marine</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
