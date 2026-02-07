'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { captureLead } from '@/actions/capture-lead';

// Validation Schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    message: z.string().optional(),
    budgetRange: z.string().min(1, 'Select a budget'),
    propertyType: z.string().min(1, 'Select a type')
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            // Simulate API call to capture lead
            const result = await captureLead({
                ...data,
                contactPreference: 'whatsapp',
                propertyRef: 'GENERAL-INQUIRY',
            });

            if (result.success) {
                setSubmitStatus('success');
                reset();
                // Reset after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        }
    };

    return (
        <section id="contact-form" className="py-24 px-6 bg-slate-900 border-t border-white/5 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
                        <MessageSquare className="w-4 h-4" />
                        <span>24/7 Consultation</span>
                    </div>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Ready to secure your <br />
                        <span className="text-amber-400">Dream Investment?</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 max-w-lg">
                        Our experts are ready to guide you through Dubai's most exclusive opportunities.
                        Fill out the form to receive a curated portfolio via WhatsApp instantly.
                    </p>

                    <div className="flex gap-4">
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-white mb-1">15+</div>
                            <div className="text-xs text-slate-400">Years Experience</div>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-white mb-1">$2B+</div>
                            <div className="text-xs text-slate-400">Sales Volume</div>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 relative"
                >
                    <AnimatePresence mode="wait">
                        {submitStatus === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                                <p className="text-slate-400 mb-6">
                                    We have sent a confirmation to your WhatsApp.<br />
                                    An agent will contact you shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitStatus('idle')}
                                    className="text-amber-400 hover:text-amber-300 font-semibold underline"
                                >
                                    Send another request
                                </button>

                                <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-white/5 text-xs text-slate-500 font-mono text-left">
                                    <div className="text-green-400 mb-1">✓ Lead captured in CRM</div>
                                    <div className="text-green-400 mb-1">✓ WhatsApp API Triggered</div>
                                    <div className="text-green-400">✓ Admin Notification Sent</div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-sm text-slate-300 mb-1 block">Full Name</label>
                                    <input
                                        {...register('name')}
                                        className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                                </div>

                                <div>
                                    <label className="text-sm text-slate-300 mb-1 block">Phone Number (WhatsApp)</label>
                                    <input
                                        {...register('phone')}
                                        className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                                        placeholder="+971 50 000 0000"
                                    />
                                    {errors.phone && <span className="text-red-400 text-xs">{errors.phone.message}</span>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-slate-300 mb-1 block">Budget</label>
                                        <select
                                            {...register('budgetRange')}
                                            className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${errors.budgetRange ? 'border-red-500' : 'border-white/10'}`}
                                        >
                                            <option value="">Select Range</option>
                                            <option value="<1M">&lt; 1M AED</option>
                                            <option value="1M-3M">1M - 3M AED</option>
                                            <option value="3M+">3M+ AED</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-slate-300 mb-1 block">Property</label>
                                        <select
                                            {...register('propertyType')}
                                            className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${errors.propertyType ? 'border-red-500' : 'border-white/10'}`}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Penthouse">Penthouse</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2 mt-4"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Request Consultation <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                                    <span>🔒 Commercial Grade Encryption</span>
                                    <span>⚡ Powered by Supabase</span>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
