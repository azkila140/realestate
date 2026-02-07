'use client';

import { motion } from 'framer-motion';
import { Zap, Search, Shield, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';

export function PerformanceAudit() {
    const comparisons = [
        {
            category: 'السرعة',
            icon: Zap,
            nextjs: { value: 'وقت تحميل 0.8 ثانية', status: 'excellent', color: 'text-green-400' },
            legacy: { value: 'قديم 3.5 ثانية', status: 'poor', color: 'text-red-400' },
            improvement: 'أسرع بـ 337%',
        },
        {
            category: 'تحسين محركات البحث',
            icon: Search,
            nextjs: { value: 'عرض من جانب الخادم', status: 'excellent', color: 'text-green-400' },
            legacy: { value: 'من جانب العميل (مخفي)', status: 'poor', color: 'text-red-400' },
            improvement: 'جوجل يحب هذا',
        },
        {
            category: 'الأمان',
            icon: Shield,
            nextjs: { value: 'مستوى المؤسسات', status: 'excellent', color: 'text-green-400' },
            legacy: { value: 'حماية أساسية', status: 'poor', color: 'text-red-400' },
            improvement: 'أمان على مستوى البنوك',
        },
        {
            category: 'التحويلات',
            icon: TrendingUp,
            nextjs: { value: '+45% التقاط العملاء', status: 'excellent', color: 'text-green-400' },
            legacy: { value: 'معدل قياسي', status: 'poor', color: 'text-red-400' },
            improvement: 'عائد استثمار مثبت',
        },
    ];

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
                            الميزة الاستراتيجية
                        </span>
                    </div>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                        لماذا الترقية إلى{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-white">Next.js</span>
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 opacity-50 blur-sm"></span>
                        </span>؟
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        هذا ليس مجرد موقع ويب. إنه تحول رقمي يثبت عائد استثمار قابل للقياس
                        لاكتساب عملاء من أصحاب الثروات العالية.
                    </p>
                </motion.div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {comparisons.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="glass-morphism p-8 rounded-2xl border border-white/10 hover-lift"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-amber-400/10 rounded-lg">
                                        <Icon className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white font-playfair">
                                        {item.category}
                                    </h3>
                                </div>

                                {/* Comparison */}
                                <div className="space-y-4">
                                    {/* Next.js (Winner) */}
                                    <div className="flex items-center justify-between p-4 bg-green-400/5 border border-green-400/20 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                            <span className={`font-semibold ${item.nextjs.color}`}>
                                                {item.nextjs.value}
                                            </span>
                                        </div>
                                        <span className="text-xs text-green-400 font-semibold px-3 py-1 bg-green-400/10 rounded-full">
                                            NEXT.JS
                                        </span>
                                    </div>

                                    {/* Legacy (Loser) */}
                                    <div className="flex items-center justify-between p-4 bg-red-400/5 border border-red-400/20 rounded-lg opacity-60">
                                        <div className="flex items-center gap-3">
                                            <XCircle className="w-5 h-5 text-red-400" />
                                            <span className={`font-semibold ${item.legacy.color}`}>
                                                {item.legacy.value}
                                            </span>
                                        </div>
                                        <span className="text-xs text-red-400 font-semibold px-3 py-1 bg-red-400/10 rounded-full">
                                            LEGACY
                                        </span>
                                    </div>
                                </div>

                                {/* Improvement Badge */}
                                <div className="mt-6 text-center">
                                    <span className="inline-block px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 font-semibold text-sm">
                                        ⚡ {item.improvement}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center"
                >
                    <div className="glass-morphism p-8 rounded-2xl border border-amber-400/30 max-w-4xl mx-auto">
                        <p className="text-slate-400 leading-relaxed mb-6">
                            تم بناء منصة "دبي برايم" وفق معايير هندسية صارمة لضمان سرعة تحميل فائقة وتجربة مستخدم سلسة،
                            باستخدام <span className="text-amber-400 font-bold">Next.js 16 App Router</span> و <span className="text-amber-400 font-bold">Tailwind v4</span> و Supabase.
                        </p>
                        <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                            يتم التقاط كل عميل محتمل من جانب الخادم قبل إعادة التوجيه إلى واتساب. صفر فقدان للبيانات.
                            هندسة معمارية على مستوى المؤسسات.
                        </p>

                        <div className="flex justify-center gap-4">
                            <a
                                href="/performance"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 rounded-full border border-amber-400/20 transition-all text-sm font-bold"
                            >
                                📊 View Speed Metrics
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div >
        </section >
    );
}
