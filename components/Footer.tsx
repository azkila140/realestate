'use client';

import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook, Lock } from 'lucide-react';

import Link from 'next/link';

export function Footer() {
    return (
        <footer id="contact" className="bg-slate-950 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
                                <span className="text-slate-950 font-bold text-xl">MK</span>
                            </div>
                            <div>
                                <h3 className="font-playfair text-xl font-bold text-white">
                                    محمد قدماني
                                </h3>
                                <p className="text-xs text-slate-400">Mohamad Kodmani</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            وكيل عقاري متميز ومستشار استثماري في دبي. عقارات فاخرة وفرص استثمارية.
                        </p>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            Premier real estate advisor and investment expert in Dubai. Luxury properties and investment opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-playfair text-lg font-bold text-white mb-6">
                            روابط سريعة / Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'الرئيسية / Home', href: '#home' },
                                { label: 'من نحن / About', href: '#about' },
                                { label: 'الركائز / Pillars', href: '#pillars' },
                                { label: 'العقارات / Properties', href: '#properties' },
                                { label: 'الأخبار / Press', href: '#press' },
                                { label: 'أداء الموقع / Performance', href: '/performance' },
                                { label: 'لوحة التحكم / Admin', href: '/admin', adminLink: true },
                            ].map((link, index) => (
                                <li key={index}>
                                    {link.adminLink ? (
                                        <a
                                            href={link.href}
                                            className="text-amber-500/50 hover:text-amber-400 transition-colors flex items-center gap-1 text-xs"
                                        >
                                            <Lock className="w-3 h-3" /> {link.label}
                                        </a>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h4 className="font-playfair text-lg font-bold text-white mb-6">
                            أنواع العقارات / Property Types
                        </h4>
                        <ul className="space-y-3">
                            {[
                                'شقق / Apartments',
                                'فلل / Villas',
                                'بنتهاوس / Penthouses',
                                'على الخريطة / Off-Plan',
                                'جاهزة / Ready',
                                'استثمارية / Investment',
                            ].map((type, index) => (
                                <li key={index}>
                                    <span className="text-slate-400 text-sm">{type}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-playfair text-lg font-bold text-white mb-6">
                            اتصل بنا / Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:+971566665560"
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                                        <Phone className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Phone</p>
                                        <p className="text-sm font-semibold">+971 56 666 5560</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+97145859279"
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                                        <Phone className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Office</p>
                                        <p className="text-sm font-semibold">+971 4 585 9279</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@mohamadkodmani.ae"
                                    className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                                        <Mail className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Email</p>
                                        <p className="text-sm font-semibold">info@mohamadkodmani.ae</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Location</p>
                                        <p className="text-sm font-semibold">Dubai, UAE</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="mt-6">
                            <p className="text-slate-500 text-xs mb-3">تابعنا / Follow Us</p>
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: Instagram, href: '#' },
                                    { icon: Linkedin, href: '#' },
                                    { icon: Facebook, href: '#' },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center hover:bg-amber-400/20 transition-colors group"
                                    >
                                        <social.icon className="w-5 h-5 text-amber-400" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm text-center md:text-right">
                            © 2026 محمد قدماني للعقارات. جميع الحقوق محفوظة.
                        </p>
                        <p className="text-[10px] text-slate-600 text-center md:text-right mt-1 font-medium tracking-wide">
                            Created with love By <span className="text-amber-400 font-bold">Mehdi</span> in stylish and stunning way
                        </p>
                        <div className="flex gap-4 items-center">
                            <Link href="/admin" className="text-slate-600 hover:text-amber-400 transition-colors text-xs font-semibold">
                                Admin Access
                            </Link>
                            <p className="text-slate-600 text-xs text-center md:text-left">
                                Built with Next.js 16 • Tailwind v4 • Supabase
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
