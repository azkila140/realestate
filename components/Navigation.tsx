'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Phone, Sparkles } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const router = useRouter();

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ['rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.95)']
    );
    const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

    const scrollToSection = (id: string) => {
        if (pathname !== '/') {
            router.push(`/#${id}`);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    interface MenuItem {
        id: string;
        label: string;
        isLink?: boolean;
        isScroll?: boolean;
    }

    const menuItems: MenuItem[] = [
        { id: 'home', label: 'Home' },
        { id: 'founder', label: 'About' }, // Changed to 'founder' to match section ID
        { id: 'pillars', label: 'Invest' },
        { id: 'properties', label: 'Properties' },
        { id: '/secondary', label: 'Secondary', isLink: true },
        { id: 'press', label: 'News' },
        { id: 'contact', label: 'Contact', isScroll: true },
    ];

    return (
        <motion.nav
            style={{ backgroundColor }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
        >
            <motion.div
                style={{ borderColor: `rgba(251, 191, 36, ${borderOpacity})` }}
                className="border-b"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 group cursor-pointer"
                            onClick={() => scrollToSection('home')}
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="relative w-12 h-12"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl" />
                                <div className="absolute inset-0.5 bg-slate-950 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-amber-400" />
                                </div>
                            </motion.div>
                            <div>
                                <div className="font-playfair text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                    MK
                                </div>
                                <div className="text-xs text-slate-400">Real Estate</div>
                            </div>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1">
                            {menuItems.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => {
                                        if (item.isLink) {
                                            window.location.href = item.id;
                                        } else {
                                            scrollToSection(item.id);
                                        }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative px-4 py-2 text-slate-300 hover:text-white transition-colors group"
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    <motion.div
                                        className="absolute inset-0 bg-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        layoutId="navHover"
                                    />
                                </motion.button>
                            ))}
                        </div>

                        {/* Contact Button */}
                        <div className="hidden lg:flex items-center gap-3">
                            <motion.a
                                href="tel:+971566665560"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl overflow-hidden group"
                            >
                                {/* Shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                />

                                <span className="relative flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </span>
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-white"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4"
                        >
                            <div className="flex flex-col gap-2">
                                {menuItems.map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => {
                                            if (item.isLink) {
                                                window.location.href = item.id;
                                            } else {
                                                scrollToSection(item.id);
                                            }
                                        }}
                                        className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                                <motion.a
                                    href="tel:+971566665560"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: menuItems.length * 0.05 }}
                                    className="px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-lg text-center"
                                >
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Call Now
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.nav>
    );
}
