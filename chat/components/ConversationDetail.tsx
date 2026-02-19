'use client';
import { useEffect } from 'react';
import { Conversation } from './Conversations';

export default function ConversationDetail({ conversation }: { conversation: Conversation }) {
    useEffect(() => {
        fetch(`/api/instagram/conversations/${conversation.id}`)
            .then(res => res.json())
            .then(data => {
                console.log('Conversation details:', data);
            })
            .catch(err => {
                console.error('Error fetching conversation details:', err);
            });
    }, [conversation]);

    return (
        <li key={conversation.id} className="p-3 hover:bg-gray-50">
            <div className="text-sm font-medium">Conversation ID: {conversation.id}</div>
            <div className="text-xs text-gray-500">
                {new Date(conversation.updated_time).toLocaleString()}
            </div>
        </li>
    );
}
