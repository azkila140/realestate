import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fakeData } from '@/lib/fake-data';

// Zod Schema for strict validation
const leadSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Valid phone number required'),
    email: z.string().email().optional(),
    property_id: z.string().optional(),
    message: z.string().optional(),
    source: z.string().default('website') // direct, google, meta, tiktok
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validation Step
        const validatedData = leadSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                {
                    error: 'Validation Failed',
                    details: validatedData.error.flatten()
                },
                { status: 400 }
            );
        }

        const lead = validatedData.data;

        // 2. Normalization (e.g., format phone numbers to E.164)
        const normalizedPhone = lead.phone.startsWith('+971')
            ? lead.phone
            : `+971${lead.phone.replace(/^0+/, '')}`;

        // 3. Lead Scoring (Simulated AI Logic)
        // High Score: Villa/Penthouse interest, specific budget
        // Low Score: Generic inquiry, incomplete data
        const isHighValue = lead.message?.toLowerCase().includes('villa') ||
            lead.message?.toLowerCase().includes('invest');

        const leadScore = isHighValue ? 90 : 50;

        // 4. Send to Routing Engine (Internal API Call Simulation)
        // In a real microservices architecture, this might be a message queue event (RabbitMQ/Kafka)
        // For this demo, we'll simulate the routing logic here or call another service function.

        const routingResult = fakeData.routeLead(isHighValue ? 5000000 : 1000000, isHighValue ? 'Villa' : 'Apartment');

        // 5. Success Response
        return NextResponse.json({
            success: true,
            lead_id: `lead_${Math.random().toString(36).substr(2, 9)}`,
            status: 'routed',
            routing_details: {
                assigned_agent: routingResult.agent,
                priority: routingResult.priority,
                sla: routingResult.responseTime
            },
            meta: {
                lead_score: leadScore,
                normalized_phone: normalizedPhone,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', message: 'Failed to process lead' },
            { status: 500 }
        );
    }
}
