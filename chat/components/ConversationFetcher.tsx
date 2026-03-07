'use client';
// import { useWebhookEvents } from '@/store/useWebhookEvents';
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

    // const { events, setEvents } = useWebhookEvents();

    // useEffect(() => {
    //     if (!selectedConversationId) return;

    //     const newEvent = events.find(e => e.checked === false);
    //     if (!newEvent) return;

    //     const senderId = newEvent.event.entry[0].messaging[0].sender.id;

    //     const isEventForSelectedConversation = selectedConversation?.participants.data.some(
    //         p => p.id === senderId
    //     );

    //     if (newEvent && isEventForSelectedConversation) {
    //         setLoading(true);

    //         fetch(`/api/instagram/conversations/${selectedConversationId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.error) throw new Error(data.error);
    //                 addConversationDetails(data);
    //                 // don't need to setSelectedConversation here if it's already selected
    //             })
    //             .catch(err => {
    //                 console.error('Error refetching conversation details:', err);
    //             })
    //             .finally(() => setLoading(false));

    //         // mark this event as checked so we don't refetch repeatedly
    //         setEvents(events.map(ev => (ev === newEvent ? { ...ev, checked: true } : ev)));
    //     }
    // }, [events, selectedConversationId, selectedConversation]);

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

    return selectedConversationId ? (
        <div aria-live="polite">
            {loading && (
                <div className=" p-2 text-sm text-gray-500 flex-1 h-screen z-1 w-full  flex justify-items-center justify-center items-center">
                    Loading…
                </div>
            )}
            {error && <div className="p-2 text-sm text-red-600">Error: {error}</div>}
        </div>
    ) : null;
}
