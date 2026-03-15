'use client';
import AvatarIcon from './AvatarIcon';
import { Conversation } from './Conversations';
import { useConversationDetails } from '@/store/useConversationDetails';

export default function ConversationDetail({ conversation }: { conversation: Conversation }) {
    const { selectedConversationId, setSelectedConversationId } = useConversationDetails();
    const otherParticipant = conversation.participants?.data?.[1]
        ? conversation.participants?.data?.[1]
        : conversation.participants?.data?.[0];

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
