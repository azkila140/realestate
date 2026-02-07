'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeEmail } from '@/actions/subscribe-email';

export function ExitIntentPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if popup has been shown/dismissed before
        const dismissed = localStorage.getItem('exitIntentDismissed');
        const lastShown = localStorage.getItem('exitIntentLastShown');

        if (dismissed === 'true') {
            const dismissedDate = new Date(lastShown || 0);
            const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

            // Show again after 7 days
            if (daysSinceDismissed < 7) {
                return;
            }
        }

        // Only trigger on desktop (better UX)
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) return;

        let timeoutId: NodeJS.Timeout;

        const handleMouseLeave = (e: MouseEvent) => {
            // Detect mouse leaving from top of viewport (exit intent)
            if (e.clientY <= 50 && !hasShown && !isOpen) {
                // Small delay to avoid false positives
                timeoutId = setTimeout(() => {
                    setIsOpen(true);
                    setHasShown(true);
                    localStorage.setItem('exitIntentLastShown', new Date().toISOString());
                }, 200);
            }
        };

        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseout', handleMouseLeave);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [hasShown, isOpen]);

    const handleClose = (dontShowAgain: boolean = false) => {
        setIsOpen(false);
        if (dontShowAgain) {
            localStorage.setItem('exitIntentDismissed', 'true');
            localStorage.setItem('exitIntentLastShown', new Date().toISOString());
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const result = await subscribeEmail({
            email,
            source: 'exit_intent',
            pageUrl: window.location.href,
            metadata: {
                referrer: document.referrer,
                timestamp: new Date().toISOString(),
            },
        });

        setIsSubmitting(false);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setEmail('');
            // Auto-close after success
            setTimeout(() => {
                handleClose(true);
            }, 2000);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleClose(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-lg pointer-events-auto">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />

                            {/* Card */}
                            <div className="relative bg-slate-900 border border-amber-400/30 rounded-3xl overflow-hidden">
                                {/* Close Button */}
                                <button
                                    onClick={() => handleClose(false)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                                </button>

                                {/* Animated Background */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl animate-pulse" />
                                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                                </div>

                                {/* Content */}
                                <div className="relative p-8 md:p-12">
                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                        className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center"
                                    >
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </motion.div>

                                    {/* Heading */}
                                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center text-white mb-3">
                                        انتظر! لا تفوت الفرصة
                                    </h2>
                                    <p className="text-amber-400 text-center font-semibold mb-4">
                                        Wait! Don't Miss Out
                                    </p>

                                    {/* Description */}
                                    <p className="text-slate-300 text-center mb-6 leading-relaxed">
                                        احصل على تحديثات حصرية حول أفضل العقارات الفاخرة في دبي
                                        <br />
                                        <span className="text-sm text-slate-400">
                                            Get exclusive updates on Dubai's finest luxury properties
                                        </span>
                                    </p>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your.email@example.com"
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                                            />
                                        </div>

                                        {/* Message */}
                                        {message && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`p-3 rounded-lg text-sm text-center ${message.type === 'success'
                                                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                                    }`}
                                            >
                                                {message.text}
                                            </motion.div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                        >
                                            {/* Shimmer Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            />
                                            <span className="relative">
                                                {isSubmitting ? 'جاري الإرسال...' : 'احصل على التحديثات / Get Updates'}
                                            </span>
                                        </button>
                                    </form>

                                    {/* Don't Show Again */}
                                    <button
                                        onClick={() => handleClose(true)}
                                        className="mt-4 w-full text-sm text-slate-500 hover:text-slate-400 transition-colors"
                                    >
                                        لا تظهر هذا مرة أخرى / Don't show this again
                                    </button>

                                    {/* Privacy Note */}
                                    <p className="mt-6 text-xs text-slate-500 text-center">
                                        نحترم خصوصيتك. لن نشارك بريدك الإلكتروني أبداً
                                        <br />
                                        We respect your privacy. We'll never share your email.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
