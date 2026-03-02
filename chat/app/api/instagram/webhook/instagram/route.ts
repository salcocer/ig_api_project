import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('Received Instagram webhook verification request', request);
    const url = new URL(request.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    // if (mode === 'subscribe' && token && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    return NextResponse.json({ challenge }, { status: 200 });
    // }

    // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(request: NextRequest) {
    const webhook_payload = await request.json();

    console.log('Received Instagram webhook event', webhook_payload);
}
