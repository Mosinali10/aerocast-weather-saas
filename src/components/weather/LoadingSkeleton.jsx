import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="max-w-5xl mx-auto w-full glass rounded-[2rem] p-10 md:p-16 animate-pulse border border-white/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6 w-full">
                    <div className="h-10 bg-white/5 rounded-full w-48" />
                    <div className="h-24 bg-white/10 rounded-3xl w-3/4" />
                    <div className="flex items-center gap-6 mt-12">
                        <div className="h-20 bg-white/10 rounded-2xl w-20" />
                        <div className="space-y-3">
                            <div className="h-8 bg-white/10 rounded-lg w-32" />
                            <div className="h-4 bg-white/5 rounded-lg w-48" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-white/5 rounded-[2rem] min-w-[160px]" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
