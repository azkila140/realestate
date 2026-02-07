import { NextResponse } from 'next/server';

// Simulated Meta (Facebook/Instagram) Webhook Listener
// This endpoint would receive real-time updates from Meta Lead Ads

export async function GET(request: Request) {
    // Webhook Verification Challenge (Required by Meta)
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === 'my_secure_token') {
        return new NextResponse(challenge); // Return challenge directly
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Parse Meta Payload Structure
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const leadGenId = changes?.value?.leadgen_id;
        const formId = changes?.value?.form_id;

        if (!leadGenId) {
            return NextResponse.json({ status: 'ignored', reason: 'no_lead_id' });
        }

        // In a real app, we would now fetch the lead details using the leadGenId
        // await fetch(`https://graph.facebook.com/v18.0/${leadGenId}?access_token=...`)

        // Simulate Processing
        return NextResponse.json({
            status: 'success',
            action: 'processed',
            source: 'meta_ads',
            internal_id: `meta_${leadGenId}`,
            campaign_data: {
                form_id: formId,
                platform: 'instagram' // or facebook
            }
        });

    } catch (error) {
        return NextResponse.json({ error: 'Webhook Processing Logic Failed' }, { status: 500 });
    }
}
