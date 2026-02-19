'use client';

import { useEffect, useState } from 'react';

// {
//   "data": [
//     {
//       "id": "aWdfZAG06MzQwMjgyMzY2ODQxNzEwMzAxMjQ0Mjc2MDMzNzY0NTMzNjk3MDE5",
//       "updated_time": "2026-02-18T18:38:19+0000"
//     }
//   ]
// }

type Conversation = {
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
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div className="flex-1 border border-gray-400 overflow-y-auto">
            <div className="p-4 text-xs text-gray-500">Conversations</div>
            {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}
            {error && <div className="p-4 text-sm text-red-600">Error: {error}</div>}
            {!loading && !error && conversations.length === 0 && (
                <div className="p-4 text-sm text-gray-600">No conversations found.</div>
            )}

            <ul className="divide-y">
                {conversations.map((c: Conversation, i: number) => (
                    <li key={i} className="p-3 hover:bg-gray-50">
                        <div className="text-sm font-medium">Conversation ID: {c.id}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(c.updated_time).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
