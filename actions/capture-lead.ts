'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Validation Schema - Enterprise Grade
const leadSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    phone: z
        .string()
        .regex(
            /^(\+971|00971|971|0)?[0-9]{9}$/,
            'Please enter a valid UAE phone number'
        )
        .transform((val) => {
            // Normalize to international format
            const cleaned = val.replace(/\D/g, '');
            if (cleaned.startsWith('971')) return `+${cleaned}`;
            if (cleaned.startsWith('00971')) return `+${cleaned.slice(2)}`;
            if (cleaned.startsWith('0')) return `+971${cleaned.slice(1)}`;
            return `+971${cleaned}`;
        }),
    propertyRef: z.string().min(1, 'Property reference is required'),
    budgetRange: z.string().min(1, 'Budget range is required'),
    propertyType: z.string().min(1, 'Property type is required'),
    contactPreference: z.enum(['whatsapp', 'call', 'email']),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export interface CaptureLeadResult {
    success: boolean;
    whatsappLink?: string;
    leadId?: string;
    error?: string;
}

/**
 * THE LUXURY ENGINE - Server Action
 * 
 * This is the core business logic that:
 * 1. Validates high-net-worth client data
 * 2. Secures the lead in Supabase (enterprise database)
 * 3. Generates a Smart WhatsApp Link with context
 * 
 * @param formData - Client inquiry data
 * @returns WhatsApp redirect link or error
 */
export async function captureLead(
    formData: LeadFormData
): Promise<CaptureLeadResult> {
    try {
        // Step 1: Validate with Zod (Type-Safe)
        const validatedData = leadSchema.parse(formData);

        // 🧠 BUSINESS LOGIC: LEAD ROUTING & PRIORITY
        // Rule 1: High Budget (> 5M implied) or Penthouses = VIP
        const isHighValue = validatedData.budgetRange.includes('5M') ||
            validatedData.budgetRange.includes('10M') ||
            validatedData.budgetRange.includes('+') ||
            validatedData.propertyType === 'Penthouse';

        // Rule 2: Commercial = Specialized Agent
        const isCommercial = validatedData.propertyType === 'Commercial';

        let assignedAgent = 'Lina Farouk'; // Default (Junior)
        let priority = 'medium';

        if (isHighValue) {
            assignedAgent = 'Mohamad Kodmani'; // CEO / Senior
            priority = 'high';
        } else if (isCommercial) {
            assignedAgent = 'Omar Hassan'; // Commercial Specialist
            priority = 'high';
        }

        // Step 2: Insert into Supabase (Secure the Lead)
        const { data: leadData, error } = await supabase
            .from('leads')
            .insert({
                full_name: validatedData.name,
                phone: validatedData.phone,
                property_interest: validatedData.propertyRef,
                property_ref: validatedData.propertyRef,
                budget_range: validatedData.budgetRange,
                property_type: validatedData.propertyType,
                contact_preference: validatedData.contactPreference,
                source: 'website_demo',
                status: 'new',
                assigned_agent: assignedAgent,
                priority: priority,
            })
            .select('id')
            .single();

        if (error) {
            console.error('Supabase Insert Error:', error);
            // Log Error
            await supabase.from('system_logs').insert({
                event_type: 'LEAD_CAPTURE_ERROR',
                status: 'FAILED',
                details: { error: error.message, formData },
            });
            return {
                success: false,
                error: 'Failed to capture lead. Please try again.',
            };
        }

        // Step 3: Trigger Automation Logs (Simulating Integrations)
        // 1. WhatsApp Log
        await supabase.from('system_logs').insert({
            event_type: 'WHATSAPP_OUTBOUND',
            status: 'QUEUED',
            lead_id: leadData.id,
            details: {
                recipient: validatedData.phone,
                template: 'welcome_luxury_investor',
                provider: 'Meta Cloud API'
            }
        });

        // 2. CRM Sync Log
        await supabase.from('system_logs').insert({
            event_type: 'CRM_SYNC',
            status: 'SUCCESS',
            lead_id: leadData.id,
            details: {
                crm: 'Salesforce',
                action: 'create_contact',
                latency_ms: 124
            }
        });

        // Step 4: Generate WhatsApp Link (Client Redirect)

        // Step 3: Construct Smart WhatsApp Link
        // Business Logic: Pre-fill message with property context and lead ID
        const leadId = leadData.id;
        const agentNumber = '971566665560'; // Mohamad Kodmani's WhatsApp

        const message = encodeURIComponent(
            `High-Priority Lead [${leadId}]: Interested in ${validatedData.propertyRef} (${validatedData.propertyType}). Budget: ${validatedData.budgetRange}. Contact preferred via ${validatedData.contactPreference}. My name is ${validatedData.name}. Lead Reference: ${leadId.slice(0, 8)}`
        );

        const whatsappLink = `https://wa.me/${agentNumber}?text=${message}`;

        // Step 4: Return Success with WhatsApp Link
        return {
            success: true,
            whatsappLink,
            leadId,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.issues[0].message,
            };
        }

        console.error('Unexpected Error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred. Please contact support.',
        };
    }
}
