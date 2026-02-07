'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export function SectionWrapper({ children, id, className = '', delay = 0 }: SectionWrapperProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100]);

    return (
        <motion.section
            ref={ref}
            id={id}
            style={{ opacity, y }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay, ease: [0.6, 0.05, 0.01, 0.9] }}
            className={`relative ${className}`}
        >
            {children}
        </motion.section>
    );
}
