'use client';
import AvatarIcon from './AvatarIcon';
import { Conversation } from './Conversations';
import { useConversationDetails } from '@/store/useConversationDetails';

export default function ConversationDetail({ conversation }: { conversation: Conversation }) {
    const { setSelectedConversationId } = useConversationDetails();

    const otherParticipant = conversation.participants.data?.[1]?.username
        ? conversation.participants.data[1].username
        : conversation.participants.data[0].username;

    return (
        <li
            key={conversation.id}
            className="p-2 hover:cursor-pointer hover:font-extrabold"
            onClick={() => setSelectedConversationId(conversation.id)}>
            <div className="flex items-center p-2 ml-2">
                <AvatarIcon size={20} className="rounded-full mr-3" />
                <div>{otherParticipant}</div>
            </div>
        </li>
    );
}
