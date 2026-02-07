'use client';

import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function FounderSection() {
    const achievements = [
        {
            icon: Award,
            value: '15+',
            label: 'سنوات من الخبرة',
            labelEn: 'Years of Experience',
        },
        {
            icon: TrendingUp,
            value: '500M+',
            label: 'قيمة المعاملات',
            labelEn: 'AED in Transactions',
        },
        {
            icon: Users,
            value: '1000+',
            label: 'عميل راضٍ',
            labelEn: 'Satisfied Clients',
        },
    ];

    const values = [
        'Meticulous attention to detail',
        'Artistry of craftsmanship',
        'Commitment to perfection',
        'Immersive experiences',
        'Thoughtful consideration',
    ];

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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
                            WHERE
                        </span>
                    </div>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                        The 1%{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-white">Own</span>
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 opacity-50 blur-sm"></span>
                        </span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-amber-400 tracking-wider uppercase mb-2">
                                MOHAMAD KODMANI REAL ESTATE BROKERS
                            </h3>
                        </div>

                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            At Mohamad Kodmani Real Estate Brokers, we understand that true excellence lies in the meticulous attention to detail and the artistry of craftsmanship. Guided by a commitment to perfection, we believe in crafting not just homes but immersive experiences where every nuance is thoughtfully considered.
                        </p>

                        {/* Values List */}
                        <div className="space-y-3 mb-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                    <span className="text-slate-300">{value}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-amber-400/30 text-amber-400 font-semibold rounded-full hover:bg-amber-400/10 transition-all duration-300 uppercase tracking-wider text-sm"
                        >
                            Discover More
                        </motion.button>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-30" />

                            {/* Image */}
                            <div className="relative h-full bg-slate-800 rounded-2xl overflow-hidden border border-white/10">
                                <Image
                                    src="/mohamad-hero.png"
                                    alt="Mohamad Kodmani - Real Estate Broker"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Achievements Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className="glass-morphism p-8 rounded-2xl border border-white/10 text-center hover-lift"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 mx-auto mb-4 bg-amber-400/10 rounded-xl flex items-center justify-center">
                                    <Icon className="w-8 h-8 text-amber-400" />
                                </div>

                                {/* Value */}
                                <div className="font-playfair text-4xl font-bold text-white mb-2">
                                    {achievement.value}
                                </div>

                                {/* Label */}
                                <div className="text-slate-400 mb-1">{achievement.label}</div>
                                <div className="text-amber-400 text-sm">{achievement.labelEn}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Secondary Portrait Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24"
                >
                    <div className="glass-morphism rounded-3xl overflow-hidden border border-white/10">
                        <div className="grid md:grid-cols-5 gap-0">
                            {/* Image - Takes 2 columns */}
                            <div className="md:col-span-2 relative h-96 md:h-auto">
                                <Image
                                    src="/mohamad-portrait.jpg"
                                    alt="Mohamad Kodmani - Professional Portrait"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Content - Takes 3 columns */}
                            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
                                        Excellence in Every Detail
                                    </h3>
                                    <p className="text-amber-400 font-semibold">
                                        التميز في كل التفاصيل
                                    </p>
                                </div>

                                <p className="text-slate-300 leading-relaxed mb-6">
                                    With over 15 years of experience in Dubai's luxury real estate market, Mohamad Kodmani has established himself as a trusted advisor to high-net-worth individuals seeking exceptional properties in the world's most dynamic city.
                                </p>

                                <p className="text-slate-400 text-sm leading-relaxed">
                                    من خلال أكثر من 15 عامًا من الخبرة في سوق العقارات الفاخرة في دبي، أثبت محمد قدماني نفسه كمستشار موثوق به للأفراد ذوي الثروات العالية الذين يبحثون عن عقارات استثنائية في أكثر مدن العالم ديناميكية.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
