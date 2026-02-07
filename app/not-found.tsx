'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="text-center max-w-lg">
                <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20">
                    <Sparkles className="w-10 h-10 text-amber-400" />
                </div>

                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
                    Page Under Construction
                </h1>

                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    This area involves backend integrations (CMS/ERP) that are currently being simulated.
                    Please explore our interactive showcase instead.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/showcase"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-transform hover:scale-105"
                    >
                        <Sparkles className="w-5 h-5" />
                        View Live Showcase
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors border border-white/10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
