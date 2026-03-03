import fs from 'fs/promises';
import path from 'path';
import { WebhookEvent } from './useWebhookEvents';

const EVENTS_FILE = path.join(process.cwd(), 'webhook_events.json');

export async function handleInstagramWebhook(event: WebhookEvent): Promise<void> {
    try {
        const content = await fs.readFile(EVENTS_FILE, 'utf8').catch(() => '[]');
        const arr = JSON.parse(content || '[]') as WebhookEvent[];
        const toStore: WebhookEvent = {
            received_at: event.received_at || new Date().toISOString(),
            checked: false,
            event: event.event,
        };
        arr.push(toStore);
        await fs.writeFile(EVENTS_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (err) {
        console.error('Failed to persist webhook event', err);
    }
}

export async function getWebhookEvents(): Promise<WebhookEvent[]> {
    try {
        const content = await fs.readFile(EVENTS_FILE, 'utf8');
        return JSON.parse(content || '[]') as WebhookEvent[];
    } catch (e) {
        return [];
    }
}
