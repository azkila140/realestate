import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

    // 1. Block known scraper tools like HTTrack, Wget, etc.
    const blockedAgents = [
        'httrack',
        'wget',
        'curl',
        'libwww-perl',
        'python-requests',
        'scrapy',
        'java',
        'httpclient'
    ];

    if (blockedAgents.some(agent => userAgent.includes(agent))) {
        return new NextResponse(
            JSON.stringify({ error: 'Access Denied', message: 'Automated access is strictly prohibited.' }),
            { status: 403, headers: { 'content-type': 'application/json' } }
        );
    }

    // 2. Standard Security Headers
    const response = NextResponse.next();

    // Prevent site from being embedded in IFrames (Clickjacking protection)
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: '/:path*',
};
