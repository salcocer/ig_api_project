import { NextResponse } from 'next/server';
import { fetchShortLivedToken, fetchLongLivedToken } from '@/lib/api';

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

        // Exchange code for short-lived token
        const shortData = await fetchShortLivedToken(client_id, client_secret, redirect_uri, code);
        if (!shortData || !shortData.access_token) {
            return NextResponse.json(
                { error: 'No short-lived access token returned' },
                { status: 500 }
            );
        }

        console.log({ shortData });

        // Exchange short-lived token for a long-lived token (server-side)
        const longData = await fetchLongLivedToken(client_secret, shortData.access_token);
        if (!longData || !longData.access_token) {
            return NextResponse.json(
                { error: 'Failed to get long-lived access token' },
                { status: 500 }
            );
        }

        console.log({ longData });

        // Set HTTP-only cookie with long-lived token (do not expose token in response)
        const maxAge =
            typeof longData.expires_in === 'number'
                ? Math.floor(longData.expires_in)
                : 60 * 60 * 24 * 60; // fallback 60 days
        const res = NextResponse.json({ success: true, expires_in: longData.expires_in || maxAge });
        res.cookies.set('ig_access_token', longData.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge,
        });

        return res;
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Exchange failed' }, { status: 500 });
    }
}
