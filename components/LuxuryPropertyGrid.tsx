'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { LeadModal } from './LeadModal';

export function LuxuryPropertyGrid() {
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const properties = [
        {
            id: 'VOLGA-001',
            name: 'برج فولغا',
            nameEn: 'Volga Tower',
            location: 'الخليج التجاري',
            locationEn: 'Business Bay',
            price: '2,450,000',
            currency: 'درهم / AED',
            beds: 2,
            baths: 3,
            sqft: '1,450',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
            gradient: 'from-blue-600 to-cyan-600',
        },
        {
            id: 'AZIZI-002',
            name: 'أزيزي فينيسيا',
            nameEn: 'Azizi Venice',
            location: 'دبي الجنوب',
            locationEn: 'Dubai South',
            price: '1,850,000',
            currency: 'درهم / AED',
            beds: 3,
            baths: 2,
            sqft: '1,850',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
            gradient: 'from-purple-600 to-pink-600',
        },
        {
            id: 'PALM-003',
            name: 'فيلا نخلة جميرا',
            nameEn: 'Palm Jumeirah Villa',
            location: 'نخلة جميرا',
            locationEn: 'Palm Jumeirah',
            price: '12,500,000',
            currency: 'درهم / AED',
            beds: 5,
            baths: 6,
            sqft: '8,500',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
            gradient: 'from-amber-600 to-orange-600',
        },
    ];

    return (
        <>
            <section id="properties" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block mb-6"
                        >
                            <div className="px-6 py-2 bg-amber-500/10 backdrop-blur-xl rounded-full border border-amber-400/30">
                                <span className="text-amber-400 font-semibold text-sm tracking-wider">
                                    EXCLUSIVE PROPERTIES
                                </span>
                            </div>
                        </motion.div>

                        <h2 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
                            عقارات{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-white">استثنائية</span>
                                <span className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 opacity-50 blur-sm"></span>
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Handpicked luxury properties in Dubai's most prestigious locations
                        </p>
                    </motion.div>

                    {/* Properties Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property, index) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                index={index}
                                isHovered={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
                                onInquire={() => setSelectedProperty(property.id)}
                            />
                        ))}
                    </div>
                    {/* View All Button */}
                    <div className="mt-16 text-center">
                        <a
                            href="/showcase"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors group"
                        >
                            <span className="uppercase tracking-widest text-sm font-semibold">View Full Collection</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            <LeadModal
                isOpen={selectedProperty !== null}
                onClose={() => setSelectedProperty(null)}
                propertyRef={selectedProperty || ''}
            />
        </>
    );
}

function PropertyCard({ property, index, isHovered, onHover, onLeave, onInquire }: any) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        onLeave();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={onHover}
            onMouseLeave={handleMouseLeave}
            className="group relative cursor-pointer"
        >
            {/* Glow Effect */}
            <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${property.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Card */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${property.image})`,
                            transformStyle: 'preserve-3d',
                            transform: 'translateZ(20px)',
                        }}
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    {/* Price Tag */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="absolute top-4 right-4"
                    >
                        <div className={`px-4 py-2 bg-gradient-to-r ${property.gradient} rounded-xl backdrop-blur-xl`}>
                            <div className="text-white font-bold text-lg">{property.price}</div>
                            <div className="text-white/80 text-xs">{property.currency}</div>
                        </div>
                    </motion.div>

                    {/* Location Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur-xl rounded-lg border border-white/10">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <div>
                            <div className="text-white text-sm font-semibold">{property.location}</div>
                            <div className="text-slate-400 text-xs">{property.locationEn}</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                        {property.name}
                    </h3>
                    <p className="text-amber-400 text-sm mb-4">{property.nameEn}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-6 text-slate-400">
                        <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span className="text-sm">{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span className="text-sm">{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Maximize className="w-4 h-4" />
                            <span className="text-sm">{property.sqft} sqft</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        onClick={onInquire}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 group/btn overflow-hidden relative"
                    >
                        {/* Shimmer */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />

                        <span className="relative">استفسر الآن / Inquire Now</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
