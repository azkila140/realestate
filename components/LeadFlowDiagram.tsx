'use client';

import { motion } from 'framer-motion';
import {
    UserCircle,
    FileText,
    CheckCircle,
    GitBranch,
    MessageCircle,
    Database,
    Bell,
    Phone
} from 'lucide-react';

const flowSteps = [
    {
        icon: UserCircle,
        title: 'Visitor Arrives',
        titleAr: 'زائر يصل',
        description: 'High-net-worth client visits website',
        descriptionAr: 'عميل ذو ثروة عالية يزور الموقع',
        color: 'from-blue-500 to-cyan-500',
        time: '< 1s'
    },
    {
        icon: FileText,
        title: 'Form Submission',
        titleAr: 'إرسال النموذج',
        description: 'Client fills lead capture form',
        descriptionAr: 'العميل يملأ نموذج التقاط العملاء',
        color: 'from-cyan-500 to-teal-500',
        time: '~30s'
    },
    {
        icon: CheckCircle,
        title: 'Validation',
        titleAr: 'التحقق',
        description: 'Server validates data & checks duplicates',
        descriptionAr: 'الخادم يتحقق من البيانات والتكرارات',
        color: 'from-teal-500 to-green-500',
        time: '< 100ms'
    },
    {
        icon: GitBranch,
        title: 'Smart Routing',
        titleAr: 'التوجيه الذكي',
        description: 'AI assigns agent based on budget & property type',
        descriptionAr: 'الذكاء الاصطناعي يعين الوكيل بناءً على الميزانية ونوع العقار',
        color: 'from-green-500 to-emerald-500',
        time: '< 50ms'
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp Triggered',
        titleAr: 'تفعيل واتساب',
        description: 'Formatted message sent to assigned agent',
        descriptionAr: 'رسالة منسقة مرسلة للوكيل المعين',
        color: 'from-emerald-500 to-amber-500',
        time: 'Instant'
    },
    {
        icon: Database,
        title: 'CRM Updated',
        titleAr: 'تحديث نظام CRM',
        description: 'Lead saved in Supabase with full context',
        descriptionAr: 'العميل المحتمل محفوظ في Supabase مع السياق الكامل',
        color: 'from-amber-500 to-orange-500',
        time: '< 200ms'
    },
    {
        icon: Bell,
        title: 'Agent Notified',
        titleAr: 'إخطار الوكيل',
        description: 'Real-time notification to sales team',
        descriptionAr: 'إشعار فوري لفريق المبيعات',
        color: 'from-orange-500 to-red-500',
        time: 'Real-time'
    },
    {
        icon: Phone,
        title: 'Follow-up',
        titleAr: 'المتابعة',
        description: 'Agent contacts client within 5 minutes',
        descriptionAr: 'الوكيل يتصل بالعميل خلال 5 دقائق',
        color: 'from-red-500 to-pink-500',
        time: '< 5min'
    }
];

export function LeadFlowDiagram() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="inline-block mb-4"
                    >
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                            <GitBranch className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>

                    <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
                        <span className="gold-gradient bg-clip-text text-transparent">
                            How Leads Are Processed
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        كيف تتم معالجة العملاء المحتملين
                    </p>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        From visitor to qualified lead in under 1 second. Fully automated, enterprise-grade pipeline.
                    </p>
                </motion.div>

                {/* Flow Steps - Desktop */}
                <div className="hidden lg:grid grid-cols-4 gap-8 mb-12">
                    {flowSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="relative"
                            >
                                {/* Connector Line */}
                                {index < flowSteps.length - 1 && (
                                    <div className="absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-amber-400/50 to-transparent z-0" />
                                )}

                                {/* Card */}
                                <div className="glass-morphism p-6 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 relative z-10">
                                    {/* Step Number */}
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                                    <p className="text-sm text-amber-400 mb-2">{step.titleAr}</p>
                                    <p className="text-xs text-slate-400 mb-3">{step.description}</p>

                                    {/* Time Badge */}
                                    <div className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full">
                                        <span className="text-xs text-amber-400 font-semibold">⚡ {step.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Flow Steps - Mobile */}
                <div className="lg:hidden space-y-6">
                    {flowSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Connector Line */}
                                {index < flowSteps.length - 1 && (
                                    <div className="absolute top-full left-8 w-0.5 h-6 bg-gradient-to-b from-amber-400/50 to-transparent z-0" />
                                )}

                                {/* Card */}
                                <div className="glass-morphism p-6 rounded-2xl border border-white/10 relative z-10">
                                    <div className="flex items-start gap-4">
                                        {/* Step Number & Icon */}
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                                            <p className="text-sm text-amber-400 mb-2">{step.titleAr}</p>
                                            <p className="text-sm text-slate-400 mb-3">{step.description}</p>
                                            <div className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full">
                                                <span className="text-xs text-amber-400 font-semibold">⚡ {step.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: 'Total Time', value: '< 1s', icon: '⚡' },
                        { label: 'Conversion Rate', value: '98%', icon: '📈' },
                        { label: 'Response Time', value: '< 5min', icon: '⏱️' },
                        { label: 'Automation', value: '100%', icon: '🤖' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-morphism p-6 rounded-2xl border border-white/10 text-center"
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold gold-gradient bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-400 text-sm">
                        💡 <span className="text-amber-400 font-semibold">Simulated integrations</span> to demonstrate logic, speed, and scalability
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
