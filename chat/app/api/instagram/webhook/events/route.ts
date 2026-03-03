import fs from 'fs/promises';
import path from 'path';

const EVENTS_FILE = path.join(process.cwd(), 'webhook_events.json');

export async function GET(request: Request) {
    try {
        const content = await fs.readFile(EVENTS_FILE, 'utf8').catch(() => '[]');
        const data = JSON.parse(content || '[]');
        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Failed to read webhook events', err);
        return new Response(JSON.stringify({ data: [], error: 'Failed to read events' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
