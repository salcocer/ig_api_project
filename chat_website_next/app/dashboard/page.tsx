'use client';

import MessageComposer from '@/components/MessageComposer';
import { useConversationDetails } from '@/store/useConversationDetails';
import { useUserData } from '@/store/useUserData';
import { isEmpty } from 'lodash';
import { useEffect, useLayoutEffect } from 'react';

function formatTime(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString();
}

export default function Page() {
    const { userData } = useUserData();
    const { selectedConversation, selectedConversationId } = useConversationDetails();
    const messages = selectedConversation?.messages?.data ?? [];

    const sorted = [...messages].sort(
        (a, b) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
    );

    useLayoutEffect(() => {
        const container = document.getElementById('messages-container');
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'instant',
            });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full h-full">
            {!messages.length ? (
                <div className="flex-1 p-4 flex items-center justify-center text-gray-500">
                    No messages
                </div>
            ) : (
                <div id="messages-container" className="w-[100%] p-4 flex-1 overflow-y-auto">
                    <div>
                        {sorted.map((m: ConversationMessage) => {
                            const me = m?.from?.username === userData?.username;
                            const media =
                                m?.shares?.data?.[0]?.link ||
                                m?.attachments?.data?.[0]?.image_data?.url;
                            const type_media = m?.attachments?.data?.[0]?.image_data
                                ? 'image'
                                : m?.shares?.data?.[0]?.link
                                  ? 'video'
                                  : 'text';

                            return (
                                <div key={m.id} className={`mb-4 ${me ? 'text-right' : ''}`}>
                                    <div className="text-xs text-gray-400">
                                        {me ? 'You' : m?.from?.username} ·{' '}
                                        {formatTime(m.created_time)}
                                    </div>
                                    {!isEmpty(m.message) && type_media === 'text' ? (
                                        <div
                                            className={`inline-block ${me ? 'bg-blue-100 text-black' : 'bg-gray-300 text-black'} rounded-lg px-3 py-2 mt-1 text-sm`}>
                                            {m.message}
                                        </div>
                                    ) : (
                                        <a
                                            href={media}
                                            target="_blank"
                                            className={`inline-block ${me ? 'text-blue-400' : 'text-gray-400'} italic mt-1 ${type_media === 'image' ? 'min-h-100' : ''}`}>
                                            {type_media === 'image' ? (
                                                <div className="flex gap-2 flex-wrap">
                                                    {m.attachments?.data?.map((att, i) => {
                                                        const url =
                                                            att?.image_data?.url ||
                                                            att?.image_data?.preview_url;
                                                        return url ? (
                                                            <img
                                                                key={i}
                                                                className="w-60 h-auto rounded"
                                                                src={url}
                                                                alt={url}
                                                            />
                                                        ) : null;
                                                    })}
                                                </div>
                                            ) : type_media === 'video' ? (
                                                <video controls className="w-60 h-fit rounded">
                                                    <source src={media} type="video/mp4" />
                                                </video>
                                            ) : null}
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <MessageComposer />
        </div>
    );
}
