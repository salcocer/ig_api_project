import { NextResponse } from 'next/server';
import { fetchShortLivedToken } from '@/lib/api';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const code = body?.code;
        if (!code) {
            return NextResponse.json({ error: 'Missing code' }, { status: 400 });
        }

        const client_id = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || '';
        const client_secret = process.env.NEXT_PUBLIC_INSTAGRAM_APP_SECRET || '';
        const redirect_uri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || '';

        if (!client_id || !client_secret || !redirect_uri) {
            return NextResponse.json(
                { error: 'Missing Instagram env vars on server' },
                { status: 500 }
            );
        }

        const data = await fetchShortLivedToken(client_id, client_secret, redirect_uri, code);
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Exchange failed' }, { status: 500 });
    }
}
