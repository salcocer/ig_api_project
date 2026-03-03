import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Entry = {
    time: number;
    id: string;
    messaging: [
        {
            sender: {
                id: string;
            };
            recipient: {
                id: string;
            };
            timestamp: number;
            message: {
                mid: string;
                text: string;
                is_echo: boolean;
            };
        },
    ];
};

export type WebhookEvent = {
    received_at: string;
    checked: boolean;
    event: {
        object: string;
        entry: Entry[];
    };
};

export type WebhookEventsStore = {
    events: WebhookEvent[];
    setEvents: (newEvents: WebhookEvent[]) => void;
    addEvent: (newEvent: WebhookEvent) => void;
};

export const useWebhookEvents = create<WebhookEventsStore>()(
    devtools(set => ({
        events: [] as WebhookEvent[],
        setEvents: (newEvents: WebhookEvent[]) => set({ events: newEvents }),
        addEvent: (newEvent: WebhookEvent) =>
            set(state => ({ events: [...state.events, { ...newEvent, checked: false }] })),
    }))
);
