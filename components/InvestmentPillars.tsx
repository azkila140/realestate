'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, PieChart, Building2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function InvestmentPillars() {
    const [activeTab, setActiveTab] = useState(0);

    const pillars = [
        {
            id: 0,
            icon: Building2,
            iconColor: 'text-blue-400',
            bgGradient: 'from-blue-600 to-cyan-600',
            title: 'لماذا الاستثمار في دبي؟',
            titleEn: 'Why Invest in Dubai?',
            subtitle: 'دبي هي واحدة من أقوى مدن الاستثمار في العالم',
            subtitleEn: 'Dubai is one of the strongest investment cities in the world and offers an ideal environment to grow your real estate wealth.',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
            benefits: [
                { text: 'عوائد استثمارية عالية', textEn: 'High investment returns' },
                { text: 'بيئة اقتصادية آمنة ومتقدمة', textEn: 'Safe and advanced economic environment' },
                { text: 'لا ضرائب على الدخل أو الأرباح العقارية', textEn: 'No taxes on income or real estate profits' },
                { text: 'خيار الحصول على التأشيرة الذهبية', textEn: 'Option to obtain a Golden Visa' },
                { text: 'بنية تحتية عالمية المستوى', textEn: 'World-class infrastructure' },
                { text: 'طلب عالمي متزايد على عقارات دبي', textEn: 'Growing global demand for Dubai property' },
                { text: 'سهولة تملك العقارات للأجانب', textEn: 'Easy property ownership for foreigners' },
            ],
        },
        {
            id: 1,
            icon: PieChart,
            iconColor: 'text-amber-400',
            bgGradient: 'from-amber-600 to-orange-600',
            title: 'ما هي المحفظة العقارية؟',
            titleEn: 'What is a Real Estate Portfolio?',
            subtitle: 'امتلاك أكثر من عقار واحد - جاهز وعلى الخريطة',
            subtitleEn: 'Owning more than one property – both ready and off-plan – with the goal of building a strong, balanced real estate fortune.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
            benefits: [
                { text: 'تنويع دخلك عبر عقارات متعددة', textEn: 'Diversifies your income across multiple properties' },
                { text: 'تقليل المخاطر من خلال توزيع الاستثمارات', textEn: 'Reduces risk by spreading investments' },
                { text: 'تعظيم العوائد من خلال الإيجار وزيادة رأس المال', textEn: 'Maximises returns through rental income and capital appreciation' },
                { text: 'نحن ندير المحفظة بالكامل لك', textEn: 'We manage the entire portfolio for you' },
            ],
        },
        {
            id: 2,
            icon: TrendingUp,
            iconColor: 'text-green-400',
            bgGradient: 'from-green-600 to-emerald-600',
            title: 'ما هو الاستثمار على الخريطة في دبي؟',
            titleEn: 'What is Off-Plan Investment in Dubai?',
            subtitle: 'شراء عقار في مراحله الأولى، قبل أو أثناء البناء',
            subtitleEn: 'Buying a property in its early stages, before or during construction, with flexible instalments paid directly to the developer.',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
            benefits: [
                { text: 'سعر شراء أقل مقارنة بالعقارات الجاهزة', textEn: 'Lower purchase price compared to ready properties' },
                { text: 'إمكانية تحقيق الربح عند التسليم', textEn: 'Potential to realise profit at handover' },
                { text: 'مرونة عالية في الدفع مع أقساط مريحة', textEn: 'High payment flexibility with comfortable instalments' },
                { text: 'لا حاجة للتمويل البنكي', textEn: 'No need for bank financing' },
            ],
        },
    ];

    const activePillar = pillars[activeTab];

    return (
        <section id="pillars" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/10 backdrop-blur-xl rounded-full border border-amber-400/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
                            من المفهوم إلى الإنجاز / From Concept to Completion
                        </span>
                    </motion.div>

                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                        تحديد{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-white">ركائزنا</span>
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 opacity-50 blur-sm"></span>
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        ثلاث ركائز أساسية لنجاح استثمارك العقاري في دبي
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        const isActive = activeTab === index;
                        return (
                            <motion.button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-6 py-4 rounded-2xl transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r ' + pillar.bgGradient + ' text-white shadow-2xl'
                                        : 'glass-morphism border border-white/10 text-slate-400 hover:border-amber-400/30'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : pillar.iconColor}`} />
                                    <div className="text-left">
                                        <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white'}`}>
                                            {pillar.titleEn}
                                        </div>
                                        <div className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                                            {pillar.title}
                                        </div>
                                    </div>
                                </div>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl"
                                        transition={{ type: 'spring', duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                                {/* Glow Effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${activePillar.bgGradient} rounded-3xl blur-2xl opacity-50`} />

                                {/* Image */}
                                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10">
                                    <Image
                                        src={activePillar.image}
                                        alt={activePillar.titleEn}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                                    {/* Icon Badge */}
                                    <div className="absolute top-6 left-6">
                                        <div className={`p-4 bg-gradient-to-br ${activePillar.bgGradient} rounded-2xl shadow-2xl`}>
                                            <activePillar.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute -bottom-6 -right-6 glass-morphism p-6 rounded-2xl border border-white/10 shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 bg-gradient-to-br ${activePillar.bgGradient} rounded-xl`}>
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">{activePillar.benefits.length}+</div>
                                        <div className="text-xs text-slate-400">Key Benefits</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Title */}
                            <div className="mb-6">
                                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
                                    {activePillar.title}
                                </h3>
                                <p className="text-amber-400 font-semibold text-lg">
                                    {activePillar.titleEn}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-slate-300 text-lg leading-relaxed mb-4">
                                {activePillar.subtitle}
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                {activePillar.subtitleEn}
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4">
                                {activePillar.benefits.map((benefit, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-amber-400/30 transition-all group"
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${activePillar.bgGradient} flex items-center justify-center`}>
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium mb-1">{benefit.text}</div>
                                            <div className="text-slate-400 text-sm">{benefit.textEn}</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
