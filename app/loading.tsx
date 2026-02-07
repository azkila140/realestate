'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
            <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin relative z-10" />
            </div>
            <p className="mt-4 text-slate-400 font-light tracking-widest text-sm uppercase">Loading Experience</p>
        </div>
    );
}
