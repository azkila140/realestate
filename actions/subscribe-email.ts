'use server';

import { createClient } from '@/lib/supabase';

interface SubscribeEmailParams {
    email: string;
    source?: 'exit_intent' | 'newsletter' | 'footer' | 'popup';
    pageUrl?: string;
    metadata?: Record<string, any>;
}

interface SubscribeEmailResult {
    success: boolean;
    message: string;
    error?: string;
}

export async function subscribeEmail({
    email,
    source = 'exit_intent',
    pageUrl,
    metadata = {},
}: SubscribeEmailParams): Promise<SubscribeEmailResult> {
    try {
        // Validate email format
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                message: 'Invalid email format',
                error: 'INVALID_EMAIL',
            };
        }

        const supabase = createClient();

        // Get user agent from headers if available
        const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'Server';

        // Insert subscriber
        const { data, error } = await supabase
            .from('email_subscribers')
            .insert({
                email: email.toLowerCase().trim(),
                source,
                page_url: pageUrl,
                user_agent: userAgent,
                metadata,
            })
            .select()
            .single();

        if (error) {
            // Handle duplicate email gracefully
            if (error.code === '23505') { // Unique constraint violation
                return {
                    success: true,
                    message: 'You are already subscribed! شكراً لك',
                };
            }

            console.error('Supabase error:', error);
            return {
                success: false,
                message: 'Failed to subscribe. Please try again.',
                error: error.message,
            };
        }

        return {
            success: true,
            message: 'Successfully subscribed! تم الاشتراك بنجاح',
        };
    } catch (error) {
        console.error('Subscribe email error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
