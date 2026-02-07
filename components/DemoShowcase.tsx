'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, Sparkles, Building2, ShoppingBag, Moon } from 'lucide-react';
import Link from 'next/link';

export function DemoShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']); // Move 4 screens out of 5 (80%)
    const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    const showcaseItems = [
        {
            id: 1,
            title: "Burj Khalifa Views",
            subtitle: "The Center of Now",
            image: "https://images.unsplash.com/photo-1582672060674-bc4099238383?q=80&w=2000&auto=format&fit=crop", // Iconic Night View
            icon: Sparkles,
            desc: "Commanding views of the world's tallest tower from your private terrace."
        },
        {
            id: 2,
            title: "Palm Jumeirah Frond",
            subtitle: "Exclusive Island Living",
            image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=2000&auto=format&fit=crop", // Aerial Palm/Marina
            icon: Building2,
            desc: "Private beachfront villas on the world's most iconic man-made island."
        },
        {
            id: 3,
            title: "Jumeirah Beach Residence",
            subtitle: "Waterfront Luxury",
            image: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?q=80&w=2000&auto=format&fit=crop", // Beach/Waterfront
            icon: ShoppingBag,
            desc: "Direct beach access combined with world-class dining and retail."
        },
        {
            id: 4,
            title: "Marina Penthouse",
            subtitle: "Sky-High Elegance",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop", // Luxury Interior
            icon: Moon,
            desc: "Sophisticated interiors with panoramic views of the Dubai Marina skyline."
        }
    ];

    return (
        <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden">
            {/* Disclaimer Banner */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/10 backdrop-blur-md border-b border-amber-500/20 py-2 px-4 text-center">
                <p className="text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                    ⚠️ Showcase V3: Visuals & Scroll Active
                </p>
            </div>

            {/* Back Button */}
            <Link href="/" className="fixed top-0 left-0 z-50 p-6 group">
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10 group-hover:border-amber-400/50 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
                </div>
            </Link>

            {/* Horizontal Scroll Section - SCROLL DRIVEN SLIDER */}
            <div ref={containerRef} className="relative h-[500vh]"> {/* 500vh for 5 slides */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-slate-950">
                    <motion.div style={{ x }} className="flex h-full w-[500vw]"> {/* 5 slides total */}

                        {/* 1. Intro Slide */}
                        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-slate-900">
                            {/* Image Container - Absolute */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=2000&auto=format&fit=crop"
                                    alt="Dubai Skyline"
                                    className="w-full h-full object-cover opacity-60" // Increased opacity
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/80" />
                            </div>

                            {/* Content - Relative Z-10 */}
                            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                                <div
                                    className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-orange-500/20"
                                >
                                    <Sparkles className="w-12 h-12 text-white" />
                                </div>
                                <h1 className="text-6xl md:text-9xl font-playfair font-bold mb-6 text-white drop-shadow-2xl">
                                    The Luxury Standard
                                </h1>
                                <p className="text-2xl md:text-3xl text-amber-400 font-light tracking-[0.2em] uppercase mb-12">
                                    Dubai Prime Estates
                                </p>
                                <div className="animate-bounce flex flex-col items-center gap-3 opacity-70">
                                    <span className="text-sm font-medium tracking-widest uppercase">Scroll Down to Explore</span>
                                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Gallery Slides */}
                        {showcaseItems.map((item) => (
                            <div key={item.id} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden bg-slate-950">
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-70 transition-transform duration-[3s] hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 max-w-7xl w-full mx-auto px-8 mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                                    <div>
                                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                                            {/* @ts-ignore */}
                                            <item.icon className="w-4 h-4" /> {item.subtitle}
                                        </div>
                                        <h2 className="text-5xl md:text-8xl font-playfair font-bold text-white mb-8 leading-[0.9] drop-shadow-lg">
                                            {item.title}
                                        </h2>
                                        <p className="text-slate-200 text-xl md:text-2xl leading-relaxed max-w-xl font-light drop-shadow-md border-l-2 border-amber-500 pl-6">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="hidden lg:block text-right self-center">
                                        <div className="text-[12rem] font-playfair font-bold text-white/5 leading-none select-none">
                                            0{item.id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>


        </div>
    );
}
