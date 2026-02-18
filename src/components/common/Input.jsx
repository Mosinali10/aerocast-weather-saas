import React from 'react';
import { Search, Loader2 } from 'lucide-react';

const Input = ({ label, icon: Icon = Search, loading, error, ...props }) => {
    return (
        <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
            {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                    ) : (
                        <Icon className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                    )}
                </div>
                <input
                    {...props}
                    className={`w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-all focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 ${error ? 'border-red-500/50' : ''
                        }`}
                />
            </div>
            {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
        </div>
    );
};

export default Input;
