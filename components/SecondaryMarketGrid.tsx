'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Search, Filter, ArrowUpRight, CheckCircle } from 'lucide-react';
import { LeadModal } from '@/components/LeadModal';
import Link from 'next/link';

// Fake Data for Secondary Market
const secondaryProperties = [
    {
        id: 'SEC-001',
        title: 'Luxury 4BR Villa',
        location: 'Palm Jumeirah, Frond N',
        price: '28,500,000 AED',
        type: 'Villa',
        beds: 4,
        baths: 5,
        sqft: 6500,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
        tag: 'Vacant on Transfer'
    },
    {
        id: 'SEC-002',
        title: 'Modern Penthouse',
        location: 'Downtown Dubai, Il Primo',
        price: '45,000,000 AED',
        type: 'Penthouse',
        beds: 5,
        baths: 6,
        sqft: 5200,
        image: 'https://images.unsplash.com/photo-1512918760532-3ed465901d19?q=80&w=2070',
        tag: 'Full Burj View'
    },
    {
        id: 'SEC-003',
        title: 'Garden Apartment',
        location: 'Dubai Hills Estate',
        price: '3,200,000 AED',
        type: 'Apartment',
        beds: 2,
        baths: 3,
        sqft: 1450,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
        tag: 'Park Facing'
    },
    {
        id: 'SEC-004',
        title: 'Waterfront Mansion',
        location: 'District One',
        price: '85,000,000 AED',
        type: 'Villa',
        beds: 7,
        baths: 9,
        sqft: 12000,
        image: 'https://images.unsplash.com/photo-1600596542815-e32c21216f3d?q=80&w=2938',
        tag: 'Brand New'
    },
    {
        id: 'SEC-005',
        title: 'High Floor Unit',
        location: 'Dubai Marina, Cayan Tower',
        price: '2,100,000 AED',
        type: 'Apartment',
        beds: 2,
        baths: 2,
        sqft: 1250,
        image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=2070',
        tag: 'Rented (High ROI)'
    },
    {
        id: 'SEC-006',
        title: 'Golf Course Villa',
        location: 'Emirates Hills',
        price: '42,000,000 AED',
        type: 'Villa',
        beds: 6,
        baths: 7,
        sqft: 9800,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
        tag: 'Fully Upgraded'
    }
];

export function SecondaryMarketGrid() {
    const [filter, setFilter] = useState('All');
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

    const filteredProperties = filter === 'All'
        ? secondaryProperties
        : secondaryProperties.filter(p => p.type === filter);

    return (
        <section className="bg-slate-950 min-h-screen py-32 px-6 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 mb-6">
                        <CheckCircle className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Verified Resale</span>
                    </div>
                    <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
                        Secondary <span className="text-amber-400">Market</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Ready-to-move properties in Dubai's most established communities.
                        Fully verified listings with premium finishes.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['All', 'Villa', 'Apartment', 'Penthouse'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2 rounded-xl border transition-all duration-300 ${filter === type
                                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                                    : 'bg-slate-900 border-white/10 text-slate-400 hover:border-amber-400/50 hover:text-white'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProperties.map((property) => (
                            <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 bg-slate-950/80 backdrop-blur border border-white/10 rounded-lg text-xs font-bold text-white">
                                            {property.tag}
                                        </span>
                                    </div>
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-playfair text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                                                {property.title}
                                            </h3>
                                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                                                <MapPin className="w-3 h-3 text-amber-500" />
                                                {property.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Specs */}
                                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/5 border-b border-white/5 mb-4">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                                                <Bed className="w-4 h-4" /> Beds
                                            </div>
                                            <div className="text-white font-semibold">{property.beds}</div>
                                        </div>
                                        <div className="text-center border-l border-white/10 border-r">
                                            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                                                <Bath className="w-4 h-4" /> Baths
                                            </div>
                                            <div className="text-white font-semibold">{property.baths}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                                                <Maximize className="w-4 h-4" /> Sq.ft
                                            </div>
                                            <div className="text-white font-semibold">{property.sqft}</div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-amber-400 font-bold text-lg">
                                            {property.price}
                                        </div>
                                        <button
                                            onClick={() => setSelectedProperty(property.id)}
                                            className="p-3 bg-white/5 rounded-full hover:bg-amber-400 hover:text-slate-950 transition-colors group/btn"
                                        >
                                            <ArrowUpRight className="w-5 h-5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lead Modal Integration */}
            <LeadModal
                isOpen={!!selectedProperty}
                onClose={() => setSelectedProperty(null)}
                propertyRef={selectedProperty || ''}
            />
        </section>
    );
}
