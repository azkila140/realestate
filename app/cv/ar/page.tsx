import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, ExternalLink, Server, Code, Database, Globe, Award, Briefcase, GraduationCap, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
    title: 'المهدي نوردين | خبير تطوير برمجيات ومستشار تقني',
    description: 'السيرة الذاتية المهنية للمهدي نوردين - خبير البنية التحتية ومطور برمجيات شامل (خبرة +15 عاماً).',
};

export default function CVPageArabic() {
    return (
        <div dir="rtl" className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500/30">
            {/* Navigation Back */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-sm">
                <div className="flex gap-4">
                    <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
                        <div className="p-2 rounded-full border border-white/10 group-hover:border-amber-400/50 bg-black/50 backdrop-blur-md">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium uppercase tracking-widest hidden md:inline-block">العودة للعرض التجريبي</span>
                    </Link>
                    <Link href="/cv" className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
                        <div className="p-2 px-4 rounded-full border border-white/10 group-hover:border-amber-400/50 bg-black/50 backdrop-blur-md text-sm font-bold font-sans">
                            English
                        </div>
                    </Link>
                </div>
                <a
                    href="/El_Mehdi_Noreddine_CV.pdf" // Placeholder for actual PDF
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                    <Download className="w-4 h-4" />
                    <span>تحميل السيرة الذاتية</span>
                </a>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                        {/* Avatar / Profile Image Placeholder */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 shadow-2xl shrink-0 rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                                <span className="text-4xl font-bold text-amber-500">MN</span>
                            </div>
                        </div>

                        <div className="text-center md:text-right space-y-4 flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                متاح لفرص عمل جديدة
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight">
                                المهدي <span className="bg-gradient-to-l from-amber-200 to-yellow-500 bg-clip-text text-transparent">نوردين</span>
                            </h1>
                            <h2 className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl">
                                خبير تطوير برمجيات شامل (Full Stack) ومستشار بنية تحتية
                                <span className="block text-amber-500/80 text-lg mt-1 font-mono">خبرة تفوق 15 عاماً في المشاريع الكبرى</span>
                            </h2>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-sm text-slate-400">
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors cursor-default">
                                    <MapPin className="w-4 h-4 text-amber-500" /> أكادير، المغرب (مستعد للانتقال لدبي)
                                </span>
                                <a href="mailto:sys.mehdi@gmail.com" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:bg-white/10 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 text-amber-500" /> sys.mehdi@gmail.com
                                </a>
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors cursor-default">
                                    <Phone className="w-4 h-4 text-amber-500" /> +212-XXX-XXX-XXX
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-24">

                {/* 1. Featured Information (Project) */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h3 className="text-2xl font-playfair font-bold text-amber-400 uppercase tracking-widest">المشروع الأبرز (Masterpiece)</h3>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="bg-gradient-to-bl from-slate-900 to-slate-950 rounded-3xl border border-amber-500/20 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)] group hover:border-amber-500/40 transition-colors">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="p-8 md:p-12 space-y-8 order-2 lg:order-1">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded mb-4">
                                        عرض حي (Live Demo)
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-white">
                                        منصة عقارات دبي الفاخرة
                                    </h2>
                                    <p className="text-slate-400 leading-relaxed">
                                        منصة عقارية بمواصفات المؤسسات الكبرى، صممت خصيصاً لاستعراض القدرات التقنية في الأسواق الراقية.
                                        تم هندستها كـ "آلة مبيعات" متكاملة مع توجيه ذكي للعملاء المحتملين، تحليلات فورية، وحماية ضد النسخ (Anti-Cloning).
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">أبرز التقنيات المستخدمة</h4>
                                    <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span><strong>Next.js 16 App Router</strong> للأداء العالي</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span><strong>Anti-Cloning Middleware</strong> حماية من النسخ</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span><strong>Intelligent Lead Routing</strong> توجيه ذكي للصفقات</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span><strong>100/100 Lighthouse</strong> أداء مثالي</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-4">
                                    <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors mt-4">
                                        <Globe className="w-5 h-5" />
                                        تصفح النسخة الحية
                                        <ExternalLink className="w-4 h-4 mr-1 opacity-50" />
                                    </Link>
                                    <Link href="/performance" className="inline-flex items-center gap-2 px-6 py-4 text-slate-400 hover:text-white transition-colors mr-4 text-sm font-medium">
                                        تقرير التدقيق التقني &larr;
                                    </Link>
                                </div>
                            </div>

                            {/* Interactive Project Preview/Visual */}
                            <div className="relative min-h-[400px] lg:min-h-full bg-slate-800 border-t lg:border-t-0 lg:border-r border-white/10 group-hover:border-amber-500/20 transition-colors order-1 lg:order-2">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-60 transition-all duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10" dir="ltr">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs text-amber-500 font-mono mb-1">REAL-TIME METRICS</p>
                                                <p className="text-2xl font-bold text-white">0.8s Load Time</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex gap-1 mb-1 justify-end">
                                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-green-500 rounded-full" />)}
                                                </div>
                                                <p className="text-xs text-green-400">System Healthy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Professional Experience */}
                <section>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-12 flex items-center gap-4">
                        <Briefcase className="w-8 h-8 text-amber-500" />
                        المسيرة المهنية
                    </h3>

                    <div className="relative border-r border-white/10 mr-4 md:mr-8 space-y-16">
                        {/* Item 1 */}
                        <div className="relative pr-12 md:pr-16">
                            <div className="absolute -right-3 top-0 w-6 h-6 rounded-full bg-slate-950 border-4 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <h4 className="text-2xl font-bold text-white">مستشار تقني أول ومطور مستقل (Full Stack)</h4>
                                <span className="bg-amber-500/10 text-amber-400 px-4 py-1 rounded-full text-xs font-bold border border-amber-500/20">2017 – حتى الآن</span>
                            </div>
                            <p className="text-slate-400 mb-6 italic">العمل كـ "جيش من رجل واحد" (One-Man Army) لحل التحديات التقنية المعقدة لعملاء دوليين.</p>
                            <ul className="space-y-4">
                                <li className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Code className="w-4 h-4 text-amber-400" /> تطوير تطبيقات الويب
                                    </h5>
                                    <p className="text-sm text-slate-400">تصميم وإطلاق أكثر من 20 تطبيق ويب مخصص باستخدام MERN Stack و Next.js، مع التركيز على السرعة وزيادة معدلات التحويل.</p>
                                </li>
                                <li className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Server className="w-4 h-4 text-amber-400" /> إدارة البنية التحتية
                                    </h5>
                                    <p className="text-sm text-slate-400">إدارة عمليات النشر السحابي المعقدة على Vercel و AWS و VPS. إدارة DNS و SSL وخطوط أنابيب CI/CD لضمان تحديثات بدون توقف.</p>
                                </li>
                            </ul>
                        </div>

                        {/* Item 2 */}
                        <div className="relative pr-12 md:pr-16">
                            <div className="absolute -right-2 top-2 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600"></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <h4 className="text-xl font-bold text-slate-300">أخصائي دعم فني ومسؤول شبكات</h4>
                                <span className="text-slate-500 text-sm">2011 – 2017</span>
                            </div>
                            <p className="text-slate-500 mb-4">إدارة البنية التحتية لتكنولوجيا المعلومات للشركات وتقديم دعم فني متقدم للعملاء.</p>
                        </div>
                    </div>
                </section>

                {/* 3. Technical Arsenal */}
                <section>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-12 flex items-center gap-4">
                        <Database className="w-8 h-8 text-amber-500" />
                        الترسانة التقنية
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Frontend */}
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                            <h4 className="text-amber-400 font-bold mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                                <Code className="w-4 h-4" /> الواجهات الأمامية (Frontend)
                            </h4>
                            <div className="space-y-3">
                                {['Next.js 16 (Expert)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Zod Validation'].map(skill => (
                                    <div key={skill} dir="ltr" className="flex items-center justify-end gap-3 text-slate-300 text-sm">
                                        {skill} <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Backend */}
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                            <h4 className="text-blue-400 font-bold mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                                <Server className="w-4 h-4" /> الخلفيات والعمليات (Backend)
                            </h4>
                            <div className="space-y-3">
                                {['Node.js', 'Supabase (PostgreSQL)', 'Server Actions', 'Docker', 'CI/CD Pipelines', 'Linux Administration'].map(skill => (
                                    <div key={skill} dir="ltr" className="flex items-center justify-end gap-3 text-slate-300 text-sm">
                                        {skill} <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Business */}
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                            <h4 className="text-green-400 font-bold mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                                <Award className="w-4 h-4" /> القيمة التجارية
                            </h4>
                            <div className="space-y-3">
                                {['WhatsApp API Integration', 'CRM Automation', 'Technical SEO', 'Lead Generation Logic', 'Sales Funnel Optimization'].map(skill => (
                                    <div key={skill} dir="ltr" className="flex items-center justify-end gap-3 text-slate-300 text-sm">
                                        {skill} <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-center pt-20 border-t border-white/5">
                    <p className="text-slate-500 mb-8">
                        جاهز لنشر حلول عالية الأداء لتطوير أعمالك.
                    </p>
                    <a href="mailto:sys.mehdi@gmail.com" className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-lg rounded-full shadow-2xl hover:scale-105 transition-transform">
                        تواصل معي للعمل
                    </a>
                </footer>

            </main>
        </div>
    );
}
