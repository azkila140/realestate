'use client';

import { motion } from 'framer-motion';
import { Award, Shield, TrendingUp, Users } from 'lucide-react';

export function AboutSection() {
    const values = [
        {
            icon: Award,
            title: 'التميز / Excellence',
            description: 'الاهتمام الدقيق بالتفاصيل وفن الحرفية',
        },
        {
            icon: Shield,
            title: 'الثقة / Trust',
            description: 'الشفافية والنزاهة في كل معاملة',
        },
        {
            icon: TrendingUp,
            title: 'النمو / Growth',
            description: 'بناء ثروة عقارية قوية ومتوازنة',
        },
        {
            icon: Users,
            title: 'الخدمة / Service',
            description: 'تجارب غامرة مدروسة بعناية',
        },
    ];

    return (
        <section id="about" className="py-24 px-6 bg-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
                            من نحن / About Us
                        </span>
                    </div>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                        محمد قدماني{' '}
                        <span className="gold-gradient bg-clip-text text-transparent">
                            للعقارات
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        في محمد قدماني للعقارات، نفهم أن التميز الحقيقي يكمن في الاهتمام الدقيق بالتفاصيل وفن الحرفية.
                        نحن نؤمن بصناعة ليس فقط المنازل، بل تجارب غامرة حيث يتم النظر بعناية في كل فارق دقيق.
                    </p>
                    <p className="text-lg text-slate-400 max-w-4xl mx-auto mt-4 leading-relaxed">
                        At Mohamad Kodmani Real Estate Brokers, we understand that true excellence lies in the
                        meticulous attention to detail and the artistry of craftsmanship. We believe in crafting
                        not just homes but immersive experiences where every nuance is thoughtfully considered.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="glass-morphism p-6 rounded-2xl border border-white/10 hover-lift"
                        >
                            <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4">
                                <value.icon className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="font-playfair text-xl font-bold text-white mb-2">
                                {value.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <a
                        href="tel:+971566665560"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-slate-950 font-semibold text-lg rounded-lg hover:bg-amber-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/50"
                    >
                        اكتشف المزيد / Discover More
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
