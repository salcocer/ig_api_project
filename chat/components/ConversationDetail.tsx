'use client';
import Image from 'next/image';
import { Conversation } from './Conversations';
import { useEffect, useState } from 'react';
import { useUserData } from '@/store/useUserData';

export type ConversationDetails = {
    messages: {
        data: {
            id: string;
            created_time: string;
            from: {
                username: string;
                id: string;
            };
            to: {
                data: {
                    username: string;
                    id: string;
                }[];
            };
            message: string;
        }[];
        paging: {
            cursors: {
                after: string;
            };
            next: string;
        };
    };
    id: string;
};

export default function ConversationDetail({ conversation }: { conversation: Conversation }) {
    const [conversationDetails, setConversationDetails] = useState<ConversationDetails | null>(
        null
    );
    const [displayName, setDisplayName] = useState<string | null>(null);

    const { userData: UserData } = useUserData();

    useEffect(() => {
        if (!conversation && conversationDetails) return;
        fetch(`/api/instagram/conversations/${conversation?.id}`)
            .then(res => res.json())
            .then(data => {
                setConversationDetails(data);
                console.log('conversation details', data);
                const last10Messages = data.messages.data.slice(0, 10);
                const userNameConversation = last10Messages.flatMap((msg: any) => {
                    const toNames = msg?.to?.data?.map((t: any) => t.username) ?? [];
                    const fromName = msg?.from?.username ? [msg.from.username] : [];
                    console.log('fromName', fromName, 'toNames', toNames);
                    return [...fromName, ...toNames];
                });
                console.log('userNameConversation', userNameConversation);

                // extract the name that is not the current user
                const otherUserNames = userNameConversation.filter(
                    (name: string) => name !== UserData?.username
                );

                if (otherUserNames.length === 0) {
                    setDisplayName(UserData?.username || 'Unknown User');
                    return;
                }

                const uniqueOtherUserNames = Array.from(new Set(otherUserNames));
                console.log('uniqueOtherUserNames', uniqueOtherUserNames);

                if (uniqueOtherUserNames.length === 1) {
                    setDisplayName(uniqueOtherUserNames[0] as string);
                }
            })

            .catch(err => {
                console.error('Error fetching conversation details:', err);
            });
    }, [conversation]);

    return (
        <>
            {displayName ? (
                <li key={conversation.id} className="p-3 hover:bg-gray-50">
                    <div className="flex flex-col">
                        <div className="flex items-center py-1">
                            <Image
                                src={'/user_fill.svg'}
                                alt={`avatar-${displayName}`}
                                width={30}
                                height={30}
                                className="rounded-full mr-3"
                            />
                            <div className="text-sm font-small">{displayName}</div>
                        </div>
                    </div>
                </li>
            ) : null}
        </>
    );
}
