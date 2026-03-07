'use client';
import { useWebhookEvents } from '@/store/useWebhookEvents';
import AvatarIcon from './AvatarIcon';
import { Conversation } from './Conversations';
import { useConversationDetails } from '@/store/useConversationDetails';
import { useEffect } from 'react';

export default function ConversationDetail({ conversation }: { conversation: Conversation }) {
    const { selectedConversationId, setSelectedConversationId } = useConversationDetails();
    // const { events } = useWebhookEvents();
    // const { addMessageToConversation } = useConversationDetails();

    const otherParticipant = conversation.participants?.data?.[1]
        ? conversation.participants?.data?.[1]
        : conversation.participants?.data?.[0];

    // const newMessage = events.find(event => {
    //     const isEcho = event.event.entry[0].messaging[0].message.is_echo;
    //     const isFromOtherParticipant =
    //         event.event.entry[0].messaging[0].sender.id === otherParticipant?.id;
    //     return isFromOtherParticipant && !isEcho;
    // })?.event.entry[0].messaging[0].message.text;

    // useEffect(() => {
    //     if (newMessage && selectedConversationId === conversation.id) {
    //         addMessageToConversation(conversation.id, {
    //             id: `temp-id-${Date.now()}`,
    //             created_time: new Date().toISOString(),
    //             from: {
    //                 username: otherParticipant?.username || 'Unknown',
    //                 id: otherParticipant?.id || 'Unknown',
    //             },
    //             to: {
    //                 data: [
    //                     {
    //                         username: 'You',
    //                         id: 'me',
    //                     },
    //                 ],
    //             },
    //             message: newMessage,
    //         });
    //     }
    // }, [events]);

    return (
        <li
            key={conversation.id}
            className={`hover:bg-(--bg-selected-gray-color) hover:cursor-pointer hover:font-extrabold ${selectedConversationId === conversation.id ? 'bg-(--bg-selected-gray-color) w-full font-extrabold' : ''}`}
            onClick={() => setSelectedConversationId(conversation.id)}>
            <div className="p-2 flex h-16 items-center justify-center sm:justify-start">
                <AvatarIcon size={20} className="hidden sm:flex m-3" />
                <a className="text-sm md:text-lg">{otherParticipant?.username?.slice(0, 12)}</a>
                {/* {newMessage && <span className="ml-2 text-xs text-blue-500">New</span>} */}
            </div>
        </li>
    );
}
