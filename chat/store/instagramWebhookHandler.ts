import fs from 'fs/promises';
import path from 'path';

const EVENTS_FILE = path.join(process.cwd(), 'webhook_events.json');

export async function handleInstagramWebhook(event: any): Promise<void> {
    try {
        let events: any[] = [];
        try {
            const content = await fs.readFile(EVENTS_FILE, 'utf8');
            events = JSON.parse(content || '[]');
        } catch (e) {
            // file may not exist yet
            events = [];
        }

        events.push({ received_at: new Date().toISOString(), event });

        await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
    } catch (err) {
        console.error('Failed to persist webhook event', err);
    }
}

export async function getWebhookEvents(): Promise<any[]> {
    try {
        const content = await fs.readFile(EVENTS_FILE, 'utf8');
        return JSON.parse(content || '[]');
    } catch (e) {
        return [];
    }
}
