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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);

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
        <div>
            {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}
            {error && <div className="p-4 text-sm text-red-600">Error: {error}</div>}

            <ul className="h-[calc(100vh-200px)] overflow-y-auto">
                {conversations?.slice(0, 12).map((conversation: Conversation, i: number) => (
                    <ConversationDetail key={conversation.id} conversation={conversation} />
                ))}
            </ul>
        </div>
    );
}
