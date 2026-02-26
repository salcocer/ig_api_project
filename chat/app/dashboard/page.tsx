'use client';
import { useEffect } from 'react';
import { useUserData } from '@/store/useUserData';
import { ConversationMessage, useConversationDetails } from '@/store/useConversationDetails';
import '../globals.css';
import MessageComposer from '@/components/MessageComposer';

function formatTime(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString();
}

export default function DashboardContent() {
    const { userData } = useUserData();
    const { selectedConversation } = useConversationDetails();
    const messages = selectedConversation?.messages?.data ?? [];

    const sorted = [...messages].sort(
        (a, b) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
    );

    useEffect(() => {
        const container = document.getElementById('messages-container');
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'instant',
            });
        }
    }, [messages]);

    return (
        <>
            {!messages.length ? (
                <div className="flex-1 p-4 flex items-center justify-center text-gray-500">
                    No messages
                </div>
            ) : (
                <div
                    id="messages-container"
                    className="flex p-4 overflow-y-auto items-center justify-center mb-2 pb-10">
                    <div className="w-[90%]">
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
                                        You · {formatTime(m.created_time)}
                                    </div>
                                    {m.message ? (
                                        <div
                                            className={`inline-block ${me ? 'bg-blue-100 text-black' : 'bg-gray-300 text-black'} rounded-lg px-3 py-2 mt-1 text-sm sm:text-lg`}>
                                            {m.message}
                                        </div>
                                    ) : (
                                        <a
                                            href={media}
                                            target="_blank"
                                            className={`inline-block ${me ? 'text-blue-400' : 'text-gray-400'} italic mt-1 min-h-[400px] `}>
                                            {type_media === 'image' ? (
                                                <div className="flex gap-2 flex-wrap">
                                                    {m.attachments?.data?.map((att, i) => {
                                                        const url = att?.image_data?.url || att?.image_data?.preview_url;
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
        </>
    );
}
