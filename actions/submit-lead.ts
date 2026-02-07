/**
 * ============================================================================
 * ENTERPRISE LEAD SUBMISSION - SERVER ACTION
 * ============================================================================
 * Purpose: Secure, validated lead capture with business logic
 * Features: Zod validation, duplicate detection, auto-routing, analytics
 * Author: Senior Full Stack Architect
 * ============================================================================
 */

'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// ============================================================================
// VALIDATION SCHEMA - Type-Safe Input Validation
// ============================================================================

const leadSubmissionSchema = z.object({
    // Required Fields
    fullName: z
        .string()
        .min(2, 'الاسم يجب أن يكون حرفين على الأقل / Name must be at least 2 characters')
        .max(100, 'الاسم طويل جداً / Name is too long')
        .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, 'الاسم يجب أن يحتوي على أحرف فقط / Name must contain only letters'),

    phone: z
        .string()
        .regex(
            /^(\+971|00971|971|0)?[0-9]{9}$/,
            'الرجاء إدخال رقم هاتف إماراتي صحيح / Please enter a valid UAE phone number'
        )
        .transform((val) => {
            // Normalize to international format: +971XXXXXXXXX
            const cleaned = val.replace(/\D/g, '');
            if (cleaned.startsWith('971')) return `+${cleaned}`;
            if (cleaned.startsWith('00971')) return `+${cleaned.slice(2)}`;
            if (cleaned.startsWith('0')) return `+971${cleaned.slice(1)}`;
            return `+971${cleaned}`;
        }),

    // Optional but recommended
    email: z
        .string()
        .email('البريد الإلكتروني غير صحيح / Invalid email')
        .optional()
        .or(z.literal('')),

    // Property Information
    propertyInterest: z
        .string()
        .min(1, 'الرجاء تحديد العقار / Please specify property interest'),

    propertyRef: z.string().optional(),

    budgetRange: z.string().optional(),

    // Tracking Information
    source: z
        .enum(['website_demo', 'landing_page', 'referral', 'social_media', 'direct'])
        .default('website_demo'),

    // Analytics (captured automatically)
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    referrerUrl: z.string().optional(),
});

export type LeadSubmissionData = z.infer<typeof leadSubmissionSchema>;

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface LeadSubmissionResult {
    success: boolean;
    leadId?: string;
    whatsappLink?: string;
    isDuplicate?: boolean;
    duplicateMessage?: string;
    error?: string;
    validationErrors?: Record<string, string>;
}

// ============================================================================
// BUSINESS LOGIC - Duplicate Detection
// ============================================================================

async function checkDuplicateLead(phone: string): Promise<{
    isDuplicate: boolean;
    existingLead?: any;
}> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('phone', phone)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Duplicate check error:', error);
        return { isDuplicate: false };
    }

    if (data) {
        // Check if last contact was within 7 days
        const lastContact = new Date(data.last_contacted_at || data.created_at);
        const daysSinceContact = Math.floor(
            (Date.now() - lastContact.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
            isDuplicate: daysSinceContact < 7,
            existingLead: data,
        };
    }

    return { isDuplicate: false };
}

// ============================================================================
// BUSINESS LOGIC - Auto-Assign Agent (Round Robin)
// ============================================================================

async function assignAgent(): Promise<string> {
    // In production, this would query an agents table and use round-robin
    // For demo purposes, we'll use a simple rotation
    const agents = [
        'محمد قدماني / Mohamad Kodmani',
        'أحمد السعيد / Ahmed Al Saeed',
        'فاطمة حسن / Fatima Hassan',
    ];

    // Get count of leads to determine next agent
    const { count } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

    return agents[(count || 0) % agents.length];
}

// ============================================================================
// BUSINESS LOGIC - Generate Smart WhatsApp Link
// ============================================================================

function generateWhatsAppLink(
    leadId: string,
    fullName: string,
    propertyInterest: string
): string {
    const agentNumber = '971566665560'; // Mohamad Kodmani's WhatsApp

    const message = encodeURIComponent(
        `مرحباً، أنا ${fullName}. أنا مهتم بـ ${propertyInterest}.\n\nHello, I am ${fullName}. I am interested in ${propertyInterest}.\n\nرقم المرجع / Lead Reference: ${leadId.slice(0, 8)}`
    );

    return `https://wa.me/${agentNumber}?text=${message}`;
}

// ============================================================================
// MAIN SERVER ACTION - Submit Lead
// ============================================================================

export async function submitLead(
    formData: LeadSubmissionData,
    metadata?: {
        userAgent?: string;
        ipAddress?: string;
    }
): Promise<LeadSubmissionResult> {
    try {
        // ========================================================================
        // STEP 1: Validate Input with Zod
        // ========================================================================
        const validatedData = leadSubmissionSchema.parse(formData);

        // ========================================================================
        // STEP 2: Check for Duplicate Leads
        // ========================================================================
        const duplicateCheck = await checkDuplicateLead(validatedData.phone);

        if (duplicateCheck.isDuplicate) {
            // Return existing lead with updated WhatsApp link
            return {
                success: true,
                isDuplicate: true,
                leadId: duplicateCheck.existingLead.id,
                whatsappLink: generateWhatsAppLink(
                    duplicateCheck.existingLead.id,
                    validatedData.fullName,
                    validatedData.propertyInterest
                ),
                duplicateMessage:
                    'لقد تواصلت معنا مؤخراً. سنعيد توجيهك إلى محادثتك السابقة. / You recently contacted us. Redirecting to your previous conversation.',
            };
        }

        // ========================================================================
        // STEP 3: Auto-Assign Agent
        // ========================================================================
        const assignedAgent = await assignAgent();

        // ========================================================================
        // STEP 4: Insert Lead into Supabase
        // ========================================================================
        const { data, error } = await supabase
            .from('leads')
            .insert({
                full_name: validatedData.fullName,
                phone: validatedData.phone,
                email: validatedData.email || null,
                property_interest: validatedData.propertyInterest,
                property_ref: validatedData.propertyRef || null,
                budget_range: validatedData.budgetRange || null,
                source: validatedData.source,
                assigned_agent: assignedAgent,
                user_agent: metadata?.userAgent || null,
                ip_address: metadata?.ipAddress || null,
                referrer_url: validatedData.referrerUrl || null,
                utm_source: validatedData.utmSource || null,
                utm_medium: validatedData.utmMedium || null,
                utm_campaign: validatedData.utmCampaign || null,
                status: 'new',
            })
            .select('id')
            .single();

        if (error) {
            console.error('Supabase Insert Error:', error);
            return {
                success: false,
                error: 'فشل في حفظ البيانات. يرجى المحاولة مرة أخرى. / Failed to save data. Please try again.',
            };
        }

        // ========================================================================
        // STEP 5: Generate Smart WhatsApp Link
        // ========================================================================
        const whatsappLink = generateWhatsAppLink(
            data.id,
            validatedData.fullName,
            validatedData.propertyInterest
        );

        // ========================================================================
        // STEP 6: Log Success & Return
        // ========================================================================
        console.log('✅ Lead captured successfully:', {
            leadId: data.id,
            phone: validatedData.phone,
            property: validatedData.propertyInterest,
            agent: assignedAgent,
        });

        return {
            success: true,
            leadId: data.id,
            whatsappLink,
            isDuplicate: false,
        };
    } catch (error) {
        // ========================================================================
        // ERROR HANDLING
        // ========================================================================
        if (error instanceof z.ZodError) {
            // Validation errors
            const validationErrors: Record<string, string> = {};
            error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                validationErrors[field] = issue.message;
            });

            return {
                success: false,
                error: 'خطأ في التحقق من البيانات / Validation error',
                validationErrors,
            };
        }

        // Unexpected errors
        console.error('Unexpected Error in submitLead:', error);
        return {
            success: false,
            error: 'حدث خطأ غير متوقع. يرجى الاتصال بالدعم. / An unexpected error occurred. Please contact support.',
        };
    }
}

// ============================================================================
// ANALYTICS HELPER - Track Lead Source
// ============================================================================

export async function trackLeadSource(leadId: string, source: string) {
    const { error } = await supabase
        .from('leads')
        .update({ source })
        .eq('id', leadId);

    if (error) {
        console.error('Failed to track lead source:', error);
    }
}

// ============================================================================
// ADMIN HELPER - Update Lead Status
// ============================================================================

export async function updateLeadStatus(
    leadId: string,
    status: string,
    notes?: string
) {
    const { error } = await supabase
        .from('leads')
        .update({
            status,
            notes: notes || null,
            last_contacted_at: new Date().toISOString(),
            contact_count: supabase.rpc('increment_contact_count', { lead_id: leadId }),
        })
        .eq('id', leadId);

    if (error) {
        console.error('Failed to update lead status:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
