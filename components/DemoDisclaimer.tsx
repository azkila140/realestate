'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { useState } from 'react';

export function DemoDisclaimer() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm border-t border-amber-400/30"
            >
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Info className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-semibold text-sm md:text-base">
                                ⚠️ <span className="font-bold">Demo Mode</span> – This project uses simulated data and integrations to demonstrate full real-estate lead automation architecture and performance.
                            </p>
                            <p className="text-white/80 text-xs hidden md:block">
                                All leads, properties, agents, and WhatsApp integrations are mocked for demonstration purposes.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                        aria-label="Close disclaimer"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
