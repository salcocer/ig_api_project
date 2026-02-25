'use client';

import { useEffect, useState } from 'react';
import ConversationDetail from './ConversationDetail';

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
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="flex-1 overflow-y-auto">
            {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}
            {error && <div className="p-4 text-sm text-red-600">Error: {error}</div>}

            <ul>
                {conversations?.slice(0, 12).map((conversation: Conversation, i: number) => (
                    <ConversationDetail key={conversation.id} conversation={conversation} />
                ))}
            </ul>
        </div>
    );
}
