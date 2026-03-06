'use client';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import ConversationDetail from './ConversationDetail';
import useKeysConversation from '@/hooks/useKeysConversation';
import { useWebhookEvents } from '@/store/useWebhookEvents';

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

    const { addEvent } = useWebhookEvents();

    useKeysConversation(conversations);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000');
        socket.on('ig_event', (event: any) => {
            // update state/UI, show toast, increment unread count, etc.
            console.log('New IG event', event);

            addEvent({
                event,
                checked: false,
                received_at: new Date().toISOString(),
            });

            toast('Event has been created', { position: 'top-center' });
        });
        return () => {
            socket.off('ig_event');
            socket.disconnect();
        };
    }, []);

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
