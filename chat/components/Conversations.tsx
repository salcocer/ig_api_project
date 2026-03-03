'use client';

import ConversationDetail from './ConversationDetail';
import useKeysConversation from '@/hooks/useKeysConversation';
// import { useWebhookEvents } from '@/store/useWebhookEvents';
import { useEffect, useState } from 'react';

export type Conversation = {
    id: string;
    updated_time: string;
    participants: {
        data: {
            username: string;
            id: string;
        }[];
    };
};

export default function Conversations() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    // const { events, setEvents } = useWebhookEvents();

    useKeysConversation(conversations);

    // useEffect(() => {
    //     // This effect runs whenever the events array changes, allowing you to react to new webhook events
    //     console.log('Webhook events updated:', events);
    //     // You can add logic here to update conversations based on new events if needed
    // }, [events]);

    // useEffect(() => {
    //     // Load persisted webhook events from the server and populate the zustand store
    //     fetch('/api/instagram/webhook/events')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('Loaded persisted webhook events:', data);
    //             if (data && Array.isArray(data.data)) {
    //                 console.log('Loaded persisted webhook events:', data);
    //                 setEvents(data.data);
    //             }
    //         })
    //         .catch(err => console.warn('Failed to load persisted webhook events', err));
    // }, []);

    useEffect(() => {
        fetch('/api/instagram/conversations')
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setConversations(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching conversations:', err);
                setError(err.message || 'Failed to load conversations.');
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-full border-r border-gray-300 overflow-y-auto">
            {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}
            {error && <div className="p-4 text-sm text-red-600">Error: {error}</div>}

            <ul>
                {conversations?.map((conversation: Conversation, i: number) => (
                    <ConversationDetail key={conversation.id} conversation={conversation} />
                ))}
            </ul>
        </div>
    );
}
