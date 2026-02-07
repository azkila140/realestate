'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { captureLead } from '@/actions/capture-lead';

interface Property {
    name: string;
    ref: string;
    price: string;
}

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyRef: string;
}

const formSchema = z.object({
    name: z.string().min(2, 'يجب أن يكون الاسم حرفين على الأقل'),
    phone: z.string().regex(/^(\+971|00971|971|0)?[0-9]{9}$/, 'الرجاء إدخال رقم هاتف إماراتي صحيح'),
});

type FormData = z.infer<typeof formSchema>;

export function LeadModal({ isOpen, onClose, propertyRef }: LeadModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const result = await captureLead({
                name: data.name,
                phone: data.phone,
                propertyRef: propertyRef,
            });

            if (result.success && result.whatsappLink) {
                setSubmitStatus('success');

                // Wait 1.5 seconds to show success state, then redirect
                setTimeout(() => {
                    window.location.href = result.whatsappLink!;
                }, 1500);
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'فشل الإرسال. يرجى المحاولة مرة أخرى.');
                setIsSubmitting(false);
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            reset();
            setSubmitStatus('idle');
            setErrorMessage('');
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-slate-900 border-amber-400/30 text-white">
                <DialogHeader>
                    <DialogTitle className="font-playfair text-3xl font-bold text-center">
                        <span className="gold-gradient bg-clip-text text-transparent">
                            استفسار حصري
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {submitStatus === 'success' ? (
                        // Success State
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="py-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            >
                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white mb-2">تم التقاط العميل!</h3>
                            <p className="text-slate-400 mb-4">جاري الاتصال بمندوب المبيعات...</p>
                            <div className="flex justify-center">
                                <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
                            </div>
                        </motion.div>
                    ) : (
                        // Form State
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Property Reference */}
                            <div className="glass-morphism p-4 rounded-lg border border-amber-400/20 mb-6">
                                <p className="text-sm text-slate-400">Property Reference</p>
                                <p className="text-lg font-semibold text-amber-400">{propertyRef}</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <Label htmlFor="name" className="text-slate-300">
                                        الاسم الكامل
                                    </Label>
                                    <Input
                                        id="name"
                                        {...register('name')}
                                        placeholder="أحمد المكتوم"
                                        className="mt-1.5 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <Label htmlFor="phone" className="text-slate-300">
                                        رقم الهاتف
                                    </Label>
                                    <Input
                                        id="phone"
                                        {...register('phone')}
                                        placeholder="+971 50 123 4567"
                                        className="mt-1.5 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
                                        disabled={isSubmitting}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <div className="p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
                                        <p className="text-red-400 text-sm">{errorMessage}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300 font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            جاري تأمين العميل...
                                        </span>
                                    ) : (
                                        'الاتصال عبر واتساب'
                                    )}
                                </Button>
                            </form>

                            {/* Privacy Note */}
                            <p className="text-xs text-slate-500 text-center mt-4">
                                معلوماتك مؤمنة بتشفير على مستوى المؤسسات. بالإرسال، أنت توافق على الاتصال بك عبر واتساب.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
