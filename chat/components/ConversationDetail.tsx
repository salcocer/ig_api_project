'use client';
import AvatarIcon from './AvatarIcon';
import { useUserData } from '@/store/useUserData';
import { Conversation } from './Conversations';
import { useEffect, useState } from 'react';

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
                const last10Messages = data.messages.data.slice(0, 10);
                const userNameConversation = last10Messages.flatMap((msg: any) => {
                    const toNames = msg?.to?.data?.map((t: any) => t.username) ?? [];
                    const fromName = msg?.from?.username ? [msg.from.username] : [];
                    return [...fromName, ...toNames];
                });

                const otherUserNames = userNameConversation.filter(
                    (name: string) => name !== UserData?.username
                );

                if (otherUserNames.length === 0) {
                    setDisplayName(UserData?.username || 'Unknown User');
                    return;
                }

                const uniqueOtherUserNames = Array.from(new Set(otherUserNames));

                if (uniqueOtherUserNames.length === 1) {
                    setDisplayName(uniqueOtherUserNames[0] as string);
                }
            })

            .catch(err => {
                console.error('Error fetching conversation details:', err);
            });
    }, [conversation]);

    console.log('conversationDetails', conversationDetails);

    return (
        <>
            {displayName ? (
                <li key={conversation.id} className="p-3 hover:cursor-pointer hover:font-extrabold">
                    <div className="flex flex-col">
                        <div className="flex items-center py-1">
                            <AvatarIcon
                                size={20}
                                className="rounded-full mr-3"
                                title={displayName}
                            />
                            <div>
                                {displayName?.length > 14
                                    ? `${displayName!.slice(0, 14)}..`
                                    : displayName}
                            </div>
                        </div>
                    </div>
                </li>
            ) : null}
        </>
    );
}
