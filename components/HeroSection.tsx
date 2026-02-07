'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            title: 'استثمر في مستقبل دبي',
            titleEn: 'Invest in Dubai\'s Future',
            subtitle: 'عوائد استثنائية في أقوى أسواق العقارات العالمية',
            subtitleEn: 'Exceptional returns in the world\'s strongest real estate market',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
            stats: [
                { value: '15%+', label: 'عائد سنوي / Annual ROI' },
                { value: '0%', label: 'ضرائب / Tax' },
                { value: '337%', label: 'أسرع / Faster' },
            ],
            cta: 'ابدأ الاستثمار / Start Investing',
            gradient: 'from-blue-600/80 via-cyan-600/80 to-blue-600/80',
        },
        {
            id: 2,
            title: 'التأشيرة الذهبية',
            titleEn: 'Golden Visa Opportunity',
            subtitle: 'احصل على الإقامة الدائمة مع استثمار 2 مليون درهم',
            subtitleEn: 'Secure permanent residency with AED 2M investment',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
            stats: [
                { value: '10 سنوات', label: 'إقامة / Residency' },
                { value: '100%', label: 'ملكية / Ownership' },
                { value: 'A+', label: 'تصنيف / Rating' },
            ],
            cta: 'اكتشف المزيد / Learn More',
            gradient: 'from-amber-600/80 via-orange-600/80 to-amber-600/80',
        },
        {
            id: 3,
            title: 'عقارات على الخريطة',
            titleEn: 'Off-Plan Properties',
            subtitle: 'أسعار مخفضة وخطط دفع مرنة مباشرة من المطور',
            subtitleEn: 'Reduced prices and flexible payment plans directly from developers',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
            stats: [
                { value: '30%', label: 'توفير / Savings' },
                { value: '5 سنوات', label: 'دفع / Payment' },
                { value: '2026', label: 'تسليم / Handover' },
            ],
            cta: 'عرض المشاريع / View Projects',
            gradient: 'from-purple-600/80 via-pink-600/80 to-purple-600/80',
        },
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative h-screen overflow-hidden bg-slate-950">
            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    {/* Content */}
                    <div className="relative h-full flex items-center justify-center px-6">
                        <div className="max-w-6xl mx-auto text-center">
                            {/* Slide Number Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-6"
                            >
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                                    <span className="text-white text-sm font-semibold">
                                        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-2xl md:text-3xl text-amber-400 mb-3 font-semibold"
                            >
                                {slides[currentSlide].titleEn}
                            </motion.p>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto mb-2"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-lg text-slate-400 max-w-3xl mx-auto mb-12"
                            >
                                {slides[currentSlide].subtitleEn}
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
                            >
                                {slides[currentSlide].stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                                    >
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-playfair">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-slate-300">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                <button
                                    onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group px-12 py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-lg rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/50 relative overflow-hidden"
                                >
                                    {/* Shimmer */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ['-200%', '200%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    />
                                    <span className="relative">{slides[currentSlide].cta}</span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Prev/Next Buttons */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex items-center gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group relative"
                            >
                                <div
                                    className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'w-16 bg-amber-400'
                                            : 'w-8 bg-white/30 group-hover:bg-white/50'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Play/Pause */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 mr-0.5" />}
                    </motion.button>
                </div>
            </div>

            {/* Progress Bar */}
            {isAutoPlaying && (
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-amber-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    key={currentSlide}
                />
            )}
        </section>
    );
}
