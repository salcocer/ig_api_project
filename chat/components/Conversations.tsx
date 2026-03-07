'use client';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import ConversationDetail from './ConversationDetail';
import useKeysConversation from '@/hooks/useKeysConversation';
import { useEffect, useState } from 'react';
import { Event, useWebhookEvents } from '@/store/useWebhookEvents';
import { useConversationDetails } from '@/store/useConversationDetails';

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

    const { addMessageToConversation } = useConversationDetails();

    useKeysConversation(conversations);
    const participants = conversations.flatMap(conv => conv.participants.data);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000');
        socket.on('ig_event', (event: Event) => {
            const senderId = event.entry[0].messaging[0].sender.id;
            const findSenderUsername = participants.find(p => p.id === senderId)?.username;

            if (event.entry[0].messaging[0].message.is_echo) return;

            if (findSenderUsername) {
                addEvent({
                    event: event,
                    checked: false,
                    received_at: new Date().toISOString(),
                });

                const senderId = event.entry[0].messaging[0].sender.id;
                const findConversationForSender = conversations.find(conv =>
                    conv.participants.data.some(p => p.id === senderId)
                );
                const newMessage = event.entry[0].messaging[0].message.text;

                addMessageToConversation(findConversationForSender?.id || '', {
                    id: `temp-${Date.now()}`,
                    created_time: new Date().toISOString(),
                    from: {
                        username: findSenderUsername,
                        id: senderId,
                    },
                    to: {
                        data: [],
                    },
                    message: newMessage,
                });

                toast.success(
                    `${findSenderUsername}: ${event.entry[0].messaging[0].message.text}`,
                    {
                        position: 'top-center',
                    }
                );
            }
        });
        return () => {
            socket.off('ig_event');
            socket.disconnect();
        };
    }, [participants]);

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
