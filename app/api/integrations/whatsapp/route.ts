import { NextResponse } from 'next/server';

// Simulated WhatsApp API Endpoint
// In a real app, this would wrap calls to the Facebook Graph API (WhatsApp Business Cloud API)

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { to, template_name, variables } = body;

        // Simulate API Latency (WhatsApp is usually fast, but has network hop)
        await new Promise(resolve => setTimeout(resolve, 300));

        // Construct the "sent" message payload for logs
        const messagePayload = {
            messaging_product: "whatsapp",
            to: to,
            type: "template",
            template: {
                name: template_name || "new_lead_alert",
                language: { code: "en_US" },
                components: [
                    {
                        type: "body",
                        parameters: variables?.map((v: string) => ({ type: "text", text: v })) || []
                    }
                ]
            }
        };

        // Return successful delivery receipt simulation
        return NextResponse.json({
            status: 'success',
            data: {
                messaging_product: 'whatsapp',
                contacts: [{ input: to, wa_id: to.replace('+', '') }],
                messages: [{ id: `wamid.${Math.random().toString(36).substr(2, 20)}` }]
            },
            simulation_log: {
                action: 'message_sent',
                timestamp: new Date().toISOString(),
                payload: messagePayload
            }
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'WhatsApp API Error', details: 'Failed to send template message' },
            { status: 502 }
        );
    }
}
