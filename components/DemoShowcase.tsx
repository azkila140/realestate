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
            title: "Dubai Skyline Night",
            subtitle: "Urban Masterpiece",
            image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1920&auto=format&fit=crop",
            icon: Moon,
            desc: "Experience the glittering majesty of the world's most dynamic city after dark."
        },
        {
            id: 2,
            title: "Palm Jumeirah Villa",
            subtitle: "Exclusive Living",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop",
            icon: Building2,
            desc: "Private beachfront sanctuaries redefining luxury living standards."
        },
        {
            id: 3,
            title: "High-End Retail",
            subtitle: "World Class Shopping",
            image: "https://images.unsplash.com/photo-1562970766-3d23190fc684?q=80&w=1920&auto=format&fit=crop",
            icon: ShoppingBag,
            desc: "Access to the globe's most exclusive fashion and lifestyle brands."
        },
        {
            id: 4,
            title: "Downtown Views",
            subtitle: "Iconic Perspectives",
            image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=1920&auto=format&fit=crop",
            icon: Sparkles,
            desc: "Waking up to the Burj Khalifa and the dancing fountains every morning."
        }
    ];

    return (
        <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden">
            {/* Disclaimer Banner */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/10 backdrop-blur-md border-b border-amber-500/20 py-2 px-4 text-center">
                <p className="text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                    ⚠️ Demo Preview • Concept Showcase
                </p>
            </div>

            {/* Back Button */}
            <Link href="/" className="fixed top-0 left-0 z-50 p-6 group">
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10 group-hover:border-amber-400/50 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
                </div>
            </Link>

            {/* Horizontal Scroll Section */}
            <div ref={containerRef} className="relative h-[400vh]"> {/* Tall container to drive scroll */}
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x, opacity }} className="flex gap-0 w-[500vw]">
                        {/* Intro Slide */}
                        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-slate-950 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40">
                                <img
                                    src="https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1920&auto=format&fit=crop"
                                    alt="Dubai Skyline"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="relative z-10 text-center px-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-8"
                                >
                                    <Sparkles className="w-10 h-10 text-white" />
                                </motion.div>
                                <h1 className="text-5xl md:text-8xl font-playfair font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                    The Luxury Standard
                                </h1>
                                <p className="text-xl md:text-2xl text-amber-400 font-light tracking-wide mb-8">
                                    Digital Experience Demo
                                </p>
                                <div className="animate-bounce text-slate-500 text-sm">
                                    Scroll to Explore
                                </div>
                            </div>
                        </div>

                        {/* Gallery Slides */}
                        {showcaseItems.map((item) => (
                            <div key={item.id} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
                                {/* Background Image with Parallax-like scale */}
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center lg:text-left lg:flex lg:items-end lg:justify-between w-full mt-32">
                                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                                            {/* @ts-ignore */}
                                            <item.icon className="w-3 h-3" /> {item.subtitle}
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4 leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="hidden lg:block">
                                        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400 w-full animate-pulse" />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2 text-right">0{item.id} / 04</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Final Contact Section */}
            <div className="h-screen bg-slate-950 flex items-center justify-center relative px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6">
                        Proven Development <span className="text-amber-400">Excellence</span>
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        This demo proves the capability to build high-performance, visually stunning, and interactive web experiences tailored for the ultra-luxury market.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-slate-950 font-bold text-lg hover:scale-105 transition-transform"
                    >
                        Success <Sparkles className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
