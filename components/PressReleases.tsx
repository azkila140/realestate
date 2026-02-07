'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function PressReleases() {
    const router = useRouter();
    const articles = [
        {
            title: 'الاستثمار العقاري على الخريطة',
            titleEn: 'Off-Plan Real Estate Investment',
            date: 'فبراير 2026 / February 2026',
            excerpt: 'اكتشف فرص الاستثمار في المشاريع على الخريطة في دبي مع عوائد استثنائية.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        },
        {
            title: 'الفرصة الاقتصادية في دبي',
            titleEn: "Dubai's Economic Opportunity",
            date: 'يناير 2026 / January 2026',
            excerpt: 'لماذا دبي هي الوجهة الأولى للمستثمرين العقاريين العالميين.',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
        },
        {
            title: 'الطلب على العقارات في دبي',
            titleEn: 'Dubai Real Estate Demand',
            date: 'ديسمبر 2025 / December 2025',
            excerpt: 'نمو غير مسبوق في الطلب على العقارات الفاخرة في دبي.',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
        },
        {
            title: 'دليل العوائد الإيجارية',
            titleEn: 'Rental Returns Guide',
            date: 'نوفمبر 2025 / November 2025',
            excerpt: 'كيفية تعظيم عوائد الإيجار في سوق دبي العقاري.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
        },
        {
            title: 'اتجاهات العقارات الفاخرة 2024',
            titleEn: 'Luxury Property Trends 2024',
            date: 'أكتوبر 2025 / October 2025',
            excerpt: 'أحدث الاتجاهات في سوق العقارات الفاخرة في دبي.',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
        },
        {
            title: 'قصص نجاح المستثمرين',
            titleEn: 'Investor Success Stories',
            date: 'سبتمبر 2025 / September 2025',
            excerpt: 'قصص حقيقية لمستثمرين حققوا عوائد استثنائية في دبي.',
            image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2073',
        },
    ];

    return (
        <section id="press" className="py-24 px-6 bg-slate-900">
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
                            البيانات الصحفية / Press Releases
                        </span>
                    </div>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                        آخر{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-white">الأخبار</span>
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 opacity-50 blur-sm"></span>
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        ابق على اطلاع بأحدث الاتجاهات والفرص في سوق دبي العقاري
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group glass-morphism rounded-2xl overflow-hidden border border-white/10 hover-lift cursor-pointer"
                            onClick={() => router.push('/showcase')}
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                    <Calendar className="w-3 h-3 text-amber-400" />
                                    <span className="text-amber-400 text-xs font-semibold">
                                        {article.date.split(' / ')[0]}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-playfair text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-amber-400 text-sm mb-3">{article.titleEn}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    {article.excerpt}
                                </p>

                                {/* Read More */}
                                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:gap-3 transition-all">
                                    <span>اقرأ المزيد / Read More</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link href="/showcase" className="inline-flex items-center gap-2 px-8 py-4 glass-morphism border border-amber-400/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-400/10 transition-all duration-300 hover:scale-105">
                        عرض الكل / View All
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div >
        </section >
    );
}
