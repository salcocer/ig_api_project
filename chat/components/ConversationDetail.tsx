'use client';
import AvatarIcon from './AvatarIcon';
import { Conversation } from './Conversations';
import { useConversationDetails } from '@/store/useConversationDetails';

export default function ConversationDetail({ conversation }: { conversation: Conversation }) {
    const { setSelectedConversationId } = useConversationDetails();

    const otherParticipant = conversation.participants?.data?.[1]?.username
        ? conversation.participants?.data?.[1]?.username
        : conversation.participants?.data?.[0]?.username;

    return (
        <li
            key={conversation.id}
            className="hover:cursor-pointer hover:font-extrabold m-2 md:m-4"
            onClick={() => setSelectedConversationId(conversation.id)}>
            <div className="flex h-10 sm:h-8 md:h-12 items-center justify-center sm:justify-start">
                <AvatarIcon size={20} className="hidden sm:flex m-3" />
                <div className="text-sm md:text-lg">{otherParticipant.slice(0, 12)}</div>
            </div>
        </li>
    );
}
