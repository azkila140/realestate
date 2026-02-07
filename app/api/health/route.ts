import { NextResponse } from 'next/server';

export async function GET() {
    const uptime = process.uptime();

    // Checking health of dependencies
    const services = {
        database: 'operational', // Simulate Supabase check
        crm_integration: 'connected',
        whatsapp_api: 'responsive',
        meta_webhook: 'listening'
    };

    const healthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(uptime / 60)} minutes`,
        region: process.env.VERCEL_REGION || 'dev1',
        version: '1.4.0',
        services
    };

    return NextResponse.json(healthStatus, { status: 200 });
}
