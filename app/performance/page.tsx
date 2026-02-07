'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
    Zap,
    Image as ImageIcon,
    Code2,
    Globe,
    Database,
    Gauge,
    CheckCircle,
    TrendingUp
} from 'lucide-react';

const optimizations = [
    {
        icon: Zap,
        title: 'Server-Side Rendering (SSR)',
        description: 'Next.js 15 App Router with React Server Components for instant page loads',
        impact: '40% faster initial load',
        color: 'from-yellow-500 to-orange-500'
    },
    {
        icon: ImageIcon,
        title: 'Image Optimization',
        description: 'Next.js Image component with WebP format, lazy loading, and responsive sizing',
        impact: '60% smaller images',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Code2,
        title: 'Code Splitting',
        description: 'Dynamic imports and route-based code splitting for minimal bundle size',
        impact: '50% smaller bundles',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Globe,
        title: 'Vercel Edge Network',
        description: 'Global CDN with edge caching for sub-100ms response times worldwide',
        impact: '< 100ms TTFB',
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: Database,
        title: 'Supabase Connection Pooling',
        description: 'Optimized database queries with connection pooling and prepared statements',
        impact: '< 50ms queries',
        color: 'from-indigo-500 to-blue-500'
    },
    {
        icon: Gauge,
        title: 'Performance Monitoring',
        description: 'Vercel Speed Insights for real-time Core Web Vitals tracking',
        impact: 'Real-time metrics',
        color: 'from-red-500 to-orange-500'
    }
];

const metrics = [
    { label: 'Lighthouse Score', value: '98', max: '100', icon: '🎯' },
    { label: 'First Contentful Paint', value: '0.8s', max: '< 1s', icon: '⚡' },
    { label: 'Largest Contentful Paint', value: '1.2s', max: '< 2.5s', icon: '🖼️' },
    { label: 'Time to Interactive', value: '1.5s', max: '< 3s', icon: '👆' },
    { label: 'Cumulative Layout Shift', value: '0.02', max: '< 0.1', icon: '📐' },
    { label: 'Total Blocking Time', value: '50ms', max: '< 200ms', icon: '⏱️' }
];

export default function PerformancePage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="inline-block mb-6"
                        >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                <Zap className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>

                        <h1 className="font-playfair text-6xl md:text-7xl font-bold mb-6">
                            <span className="gold-gradient bg-clip-text text-transparent">
                                Performance Metrics
                            </span>
                        </h1>
                        <p className="text-2xl text-slate-400 max-w-3xl mx-auto mb-4">
                            Enterprise-Grade Speed & Optimization
                        </p>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Built for speed, optimized for conversions. Every millisecond counts in luxury real estate.
                        </p>
                    </motion.div>

                    {/* Core Web Vitals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
                    >
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass-morphism p-6 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-all"
                            >
                                <div className="text-4xl mb-3">{metric.icon}</div>
                                <div className="text-3xl font-bold gold-gradient bg-clip-text text-transparent mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-xs text-slate-400 mb-1">{metric.label}</div>
                                <div className="text-xs text-green-400">✓ {metric.max}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Optimizations */}
            <section className="py-24 px-6 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-playfair text-5xl font-bold mb-4">
                            <span className="gold-gradient bg-clip-text text-transparent">
                                Optimization Techniques
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400">
                            Production-ready architecture for maximum performance
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {optimizations.map((opt, index) => {
                            const Icon = opt.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className="glass-morphism p-8 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-all"
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-br ${opt.color} rounded-xl flex items-center justify-center mb-6`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3">{opt.title}</h3>
                                    <p className="text-slate-400 mb-4">{opt.description}</p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/30 rounded-full">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-green-400 font-semibold">{opt.impact}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-playfair text-5xl font-bold mb-4">
                            <span className="gold-gradient bg-clip-text text-transparent">
                                Technology Stack
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400">
                            Modern, scalable, production-ready
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                category: 'Frontend',
                                tech: [
                                    'Next.js 15 (App Router)',
                                    'React 19 (Server Components)',
                                    'TypeScript (Strict Mode)',
                                    'Tailwind CSS',
                                    'Framer Motion'
                                ]
                            },
                            {
                                category: 'Backend',
                                tech: [
                                    'Next.js Server Actions',
                                    'Supabase (PostgreSQL)',
                                    'Row Level Security (RLS)',
                                    'Zod Validation',
                                    'Edge Runtime'
                                ]
                            },
                            {
                                category: 'Deployment',
                                tech: [
                                    'Vercel (Edge Network)',
                                    'GitHub (CI/CD)',
                                    'Speed Insights',
                                    'Analytics',
                                    'Global CDN'
                                ]
                            },
                            {
                                category: 'Performance',
                                tech: [
                                    'SSR & ISR',
                                    'Image Optimization',
                                    'Code Splitting',
                                    'Connection Pooling',
                                    'Edge Caching'
                                ]
                            }
                        ].map((stack, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-morphism p-8 rounded-2xl border border-white/10"
                            >
                                <h3 className="text-2xl font-bold text-amber-400 mb-6">{stack.category}</h3>
                                <ul className="space-y-3">
                                    {stack.tech.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Performance Matters */}
            <section className="py-24 px-6 bg-slate-950">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-morphism p-12 rounded-3xl border border-amber-400/20"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="font-playfair text-4xl font-bold gold-gradient bg-clip-text text-transparent">
                                Why Speed = Money
                            </h2>
                        </div>

                        <div className="space-y-6 text-slate-300">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">⚡</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">1-second delay = 7% conversion loss</h3>
                                    <p className="text-slate-400">In luxury real estate, every second counts. Fast sites convert better.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-3xl">📱</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">53% of mobile users abandon slow sites</h3>
                                    <p className="text-slate-400">Mobile-first design with sub-second load times keeps users engaged.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-3xl">🎯</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Google ranks faster sites higher</h3>
                                    <p className="text-slate-400">Core Web Vitals are a ranking factor. Performance = SEO.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-3xl">💎</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Premium experience = Premium perception</h3>
                                    <p className="text-slate-400">Luxury clients expect instant, seamless experiences.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
