'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
    phoneNumber?: string; // Format: +971501234567
    defaultMessage?: string;
}

export function WhatsAppButton({
    phoneNumber = '+971501234567', // Placeholder - replace with actual business number
    defaultMessage,
}: WhatsAppButtonProps) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState('home');
    const [propertyRef, setPropertyRef] = useState<string | null>(null);

    useEffect(() => {
        // Show tooltip after 3 seconds on first visit
        const hasSeenTooltip = localStorage.getItem('whatsappTooltipSeen');
        if (!hasSeenTooltip) {
            const timer = setTimeout(() => {
                setIsTooltipVisible(true);
                localStorage.setItem('whatsappTooltipSeen', 'true');
                // Auto-hide after 5 seconds
                setTimeout(() => setIsTooltipVisible(false), 5000);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        // Track current section for context-aware messaging
        const handleScroll = () => {
            const sections = ['home', 'about', 'pillars', 'properties', 'press', 'contact'];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const generateMessage = () => {
        if (defaultMessage) return defaultMessage;

        let message = `مرحباً! أنا مهتم بعقارات دبي الفاخرة\nHello! I'm interested in Dubai luxury properties\n\n`;

        // Add context based on current section
        switch (currentSection) {
            case 'properties':
                message += `📍 القسم: العقارات المتاحة\n📍 Section: Available Properties\n`;
                if (propertyRef) {
                    message += `🏢 العقار: ${propertyRef}\n🏢 Property: ${propertyRef}\n`;
                }
                break;
            case 'about':
                message += `📍 القسم: عن الشركة\n📍 Section: About Us\n`;
                break;
            case 'pillars':
                message += `📍 القسم: ركائز الاستثمار\n📍 Section: Investment Pillars\n`;
                break;
            case 'contact':
                message += `📍 القسم: اتصل بنا\n📍 Section: Contact\n`;
                break;
            default:
                message += `📍 القسم: الصفحة الرئيسية\n📍 Section: Home Page\n`;
        }

        message += `\nأود الحصول على مزيد من المعلومات\nI would like more information`;

        return message;
    };

    const handleClick = () => {
        const message = encodeURIComponent(generateMessage());
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* Floating Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
                className="fixed bottom-6 right-6 z-40"
            >
                {/* Tooltip */}
                <AnimatePresence>
                    {isTooltipVisible && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            className="absolute bottom-full right-0 mb-4 w-64"
                        >
                            <div className="relative bg-slate-900 border border-amber-400/30 rounded-2xl p-4 shadow-2xl">
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsTooltipVisible(false)}
                                    className="absolute -top-2 -right-2 p-1 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-3 h-3 text-slate-400" />
                                </button>

                                {/* Content */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm mb-1">
                                            تحتاج مساعدة؟
                                        </p>
                                        <p className="text-slate-400 text-xs leading-relaxed">
                                            تواصل معنا عبر واتساب للحصول على استشارة فورية
                                            <br />
                                            <span className="text-amber-400">Chat with us on WhatsApp!</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-900 border-r border-b border-amber-400/30 transform rotate-45" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Button */}
                <motion.button
                    onClick={handleClick}
                    onHoverStart={() => setIsTooltipVisible(true)}
                    onHoverEnd={() => setIsTooltipVisible(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                >
                    {/* Pulse Rings */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1.5],
                            opacity: [0.5, 0, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                        className="absolute inset-0 bg-green-500 rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1.5],
                            opacity: [0.5, 0, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: 0.5,
                        }}
                        className="absolute inset-0 bg-green-500 rounded-full"
                    />

                    {/* Button */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 group-hover:shadow-green-500/70 transition-shadow">
                        <MessageCircle className="w-8 h-8 text-white" />

                        {/* Notification Badge */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                        >
                            <span className="text-white text-xs font-bold">1</span>
                        </motion.div>
                    </div>
                </motion.button>
            </motion.div>
        </>
    );
}
