'use client';
import { useUserData } from '@/store/useUserData';
import { useEffect, useState } from 'react';
import { useConversationDetails } from '@/store/useConversationDetails';
import '../globals.css';

function formatTime(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString();
}

export type ConversationMessage = {
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
    shares?: {
        data: {
            link: string;
        }[];
        paging: {
            cursors: {
                before: string;
                after: string;
            };
            next: string;
        };
    };
    attachments?: {
        data: {
            image_data: {
                width: number;
                height: number;
                max_width: number;
                max_height: number;
                url: string;
                preview_url: string;
            };
        }[];
        paging: {
            cursors: {
                before: string;
                after: string;
            };
        };
    };
};

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
            container.scrollTop = container.scrollHeight;
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
                    className="flex p-4 overflow-y-auto items-center justify-center">
                    <div className="w-[90%]">
                        {sorted.map((m: ConversationMessage) => {
                            if (m.from?.username === userData?.username) {
                                const media =
                                    m?.shares?.data?.[0]?.link ||
                                    m?.attachments?.data?.[0]?.image_data?.url;

                                return (
                                    <div key={m.id} className="mb-4 text-right">
                                        <div className="text-xs text-gray-400">
                                            You · {formatTime(m.created_time)}
                                        </div>
                                        {m.message ? (
                                            <div className="inline-block bg-blue-100 rounded-lg px-3 py-2 mt-1 text-black">
                                                {m.message}
                                            </div>
                                        ) : (
                                            <a
                                                href={media}
                                                target="_blank"
                                                className="inline-block text-blue-400 italic mt-1">
                                                [shared media]
                                            </a>
                                        )}
                                    </div>
                                );
                            }

                            const media =
                                m?.shares?.data?.[0]?.link ||
                                m?.attachments?.data?.[0]?.image_data?.url;

                            return (
                                <div key={m.id} className="mb-4">
                                    <div className="text-xs text-gray-400">
                                        {m.from?.username} · {formatTime(m.created_time)}
                                    </div>
                                    {m.message ? (
                                        <div className="inline-block bg-gray-100 rounded-lg px-3 py-2 mt-1 text-black">
                                            {m.message}
                                        </div>
                                    ) : (
                                        <a
                                            href={media}
                                            target="_blank"
                                            className="inline-block text-blue-900 italic mt-1">
                                            [shared media]
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
