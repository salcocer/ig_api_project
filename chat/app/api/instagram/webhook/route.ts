import crypto from 'crypto';
import { handleInstagramWebhook } from '@store/instagramWebhookHandler';

const VERIFY_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_WEBHOOK_VERIFY_TOKEN || '';
const APP_SECRET = process.env.NEXT_PUBLIC_INSTAGRAM_APP_SECRET;

function verifySignature(rawBody: string, signatureHeader: string | null) {
    if (!APP_SECRET) return false;
    if (!signatureHeader) return false;

    // header expected like 'sha1=...' or 'sha256=...'
    const m = signatureHeader.match(/^(sha1|sha256)=([0-9a-fA-F]+)$/);
    let algo = 'sha1';
    let signature = signatureHeader;
    if (m) {
        algo = m[1] === 'sha256' ? 'sha256' : 'sha1';
        signature = m[2];
    }

    const hmac = crypto.createHmac(algo, APP_SECRET);
    hmac.update(rawBody, 'utf8');
    const digest = hmac.digest();

    let sigBuf: Buffer;
    try {
        sigBuf = Buffer.from(signature, 'hex');
    } catch (e) {
        return false;
    }

    if (sigBuf.length !== digest.length) return false;
    return crypto.timingSafeEqual(digest, sigBuf);
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token && VERIFY_TOKEN && token === VERIFY_TOKEN) {
        return new Response(challenge || '', { status: 200 });
    }

    return new Response('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
    const raw = await request.text();
    const sig256 = request.headers.get('x-hub-signature-256');
    const sig = request.headers.get('x-hub-signature');
    const signatureHeader = sig256 || sig;

    if (APP_SECRET && !verifySignature(raw, signatureHeader)) {
        return new Response('Invalid signature', { status: 403 });
    }

    // Parse and handle incoming event(s)
    let body: any = null;
    try {
        body = JSON.parse(raw);
        console.log('Instagram webhook received and dispatched', body);
    } catch (err) {
        console.warn('Webhook: failed to parse JSON body', err);
    }

    // Dispatch to handler for processing/persistence
    try {
        await handleInstagramWebhook(body);
    } catch (e) {
        console.error('Handler error', e);
    }

    return new Response('EVENT_RECEIVED', { status: 200 });
}
