'use client';
import { useEffect, useState } from 'react';
import { useConversationDetails } from '@/store/useConversationDetails';

export default function ConversationFetcher() {
    const {
        selectedConversationId,
        selectedConversation,
        addConversationDetails,
        setSelectedConversation,
    } = useConversationDetails();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);

        if (!selectedConversationId) return;
        if (selectedConversation) return; // already have details

        setLoading(true);

        fetch(`/api/instagram/conversations/${selectedConversationId}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                addConversationDetails(data);
                setSelectedConversation(selectedConversationId);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching conversation details:', err);
                setError(err.message || 'Failed to load conversation');
                setLoading(false);
            });
    }, [selectedConversationId]);

    if (!selectedConversationId) return null;

    return (
        <div aria-live="polite">
            {loading && (
                <div className=" p-2 text-sm text-gray-500 flex w-full  justify-center items-center">
                    Loading conversation…
                </div>
            )}
            {error && <div className="p-2 text-sm text-red-600">Error: {error}</div>}
        </div>
    );
}
