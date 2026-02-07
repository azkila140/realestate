import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { budget, propertyType, source } = body;

        // Business Logic Rules Engine
        // ---------------------------

        // Rule 1: High Value / Luxury Routing
        const isLuxury = (budget && budget >= 2000000) || propertyType === 'Penthouse' || propertyType === 'Villa';

        if (isLuxury) {
            return NextResponse.json({
                assigned_agent: {
                    id: 'agent-001',
                    name: 'Omar Hassan',
                    role: 'Senior Agent',
                    whatsapp: '+971566665560'
                },
                priority: 'HIGH',
                routing_reason: 'High budget threshold (> 2M AED) or Luxury Property Type',
                auto_replies: true
            });
        }

        // Rule 2: Commercial Routing
        if (propertyType === 'Commercial' || propertyType === 'Office') {
            return NextResponse.json({
                assigned_agent: {
                    id: 'agent-001',
                    name: 'Omar Hassan', // Assuming senior agent handles commercial too
                    role: 'Senior Agent'
                },
                priority: 'HIGH',
                routing_reason: 'Specialized Commercial Request'
            });
        }

        // Rule 3: Investment / Off-Plan Routing
        if (source === 'meta_ads_investment') {
            return NextResponse.json({
                assigned_agent: {
                    id: 'agent-003',
                    name: 'Mohamad Kodmani',
                    role: 'CEO'
                },
                priority: 'URGENT',
                routing_reason: 'Direct CEO handling for Investment Ad Campaign'
            });
        }

        // Default: General Inquiries
        return NextResponse.json({
            assigned_agent: {
                id: 'agent-002',
                name: 'Lina Farouk',
                role: 'Junior Agent',
                whatsapp: '+971501234568'
            },
            priority: 'STANDARD',
            routing_reason: 'Standard Round-Robin Assignment'
        });

    } catch (error) {
        return NextResponse.json({ error: 'Routing Failed' }, { status: 500 });
    }
}
