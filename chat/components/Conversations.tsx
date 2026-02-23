'use client';

import { useEffect, useState } from 'react';
import ConversationDetail from './ConversationDetail';

// {
//   "data": [
//     {
//       "id": "aWdfZAG06MzQwMjgyMzY2ODQxNzEwMzAxMjQ0Mjc2MDMzNzY0NTMzNjk3MDE5",
//       "updated_time": "2026-02-18T18:38:19+0000"
//     }
//   ]
// }

export type Conversation = {
    id: string;
    updated_time: string;
};

export default function Conversations() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/instagram/conversations');
                const data = await res.json();
                setConversations(data?.data || []);
            } catch (e: any) {
                console.error('Failed to fetch conversations:', e);
                setError('Failed to fetch conversations');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div className="flex-1 border border-gray-400 overflow-y-auto">
            {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}
            {error && <div className="p-4 text-sm text-red-600">Error: {error}</div>}
            {!loading && !error && conversations.length === 0 && (
                <div className="p-4 text-sm text-gray-600">No conversations found.</div>
            )}

            <ul className="divide-y">
                {conversations?.slice(0, 12).map((conversation: Conversation, i: number) => (
                    <ConversationDetail key={conversation.id} conversation={conversation} />
                ))}
            </ul>
        </div>
    );
}
