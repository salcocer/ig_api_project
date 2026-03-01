'use client';
import { useState, useCallback, KeyboardEvent, use } from 'react';
import { useUserData } from '@/store/useUserData';
import { useConversationDetails } from '@/store/useConversationDetails';

export default function MessageComposer() {
    const [text, setText] = useState('');
    const { selectedConversation, addMessageToConversation } = useConversationDetails();
    const { userData } = useUserData();

    const otherParticipant = selectedConversation?.participants?.data?.find(
        p => p.id !== userData?.id
    );

    const send = useCallback(async () => {
        if (!selectedConversation || !text.trim()) return;

        const msg = {
            id: `local-${Date.now()}`,
            created_time: new Date().toISOString(),
            from: { username: userData?.username || 'me', id: userData?.id || '0' },
            to: { data: selectedConversation.participants?.data || [] },
            message: text.trim(),
        } as any;

        // optimistic local update
        addMessageToConversation(selectedConversation.id, msg);
        setText('');

        console.log({ userData });
        console.log({ otherParticipant });

        // Call backend API to actually send message
        fetch('/api/instagram/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient_id: otherParticipant?.id || '',
                text: msg.message,
            }),
        }).catch(err => {
            console.error('Failed to send message:', err);
            // Optionally, remove the optimistic message or mark it as failed
        });
    }, [text, selectedConversation, addMessageToConversation, userData]);

    function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    if (!selectedConversation) return null;

    return (
        <div className="bottom-0 h-18 right-0 w-full p-4 border-t border-gray-300 flex items-center gap-3  z-50">
            <button className="p-2 rounded-full hover:bg-gray-200" aria-label="emoji">
                😊
            </button>
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Message..."
                className="flex-1 resize-none h-10 rounded-lg p-2 bg-transparent outline-none text-sm"
            />
            <button className="p-2 rounded hover:bg-gray-200" aria-label="attach">
                📷
            </button>
            <button
                onClick={() => send()}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Send
            </button>
        </div>
    );
}
