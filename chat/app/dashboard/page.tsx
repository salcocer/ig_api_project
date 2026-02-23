'use client';

import { useUserData } from '@/store/useUserData';
import { useConversationDetails } from '@/store/useConversationDetails';

function formatTime(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString();
}

export default function DashboardContent() {
    const { selectedConversation } = useConversationDetails();
    const { userData } = useUserData();

    const messages = selectedConversation?.messages?.data ?? [];

    if (!messages.length) {
        return (
            <div className="flex-1 p-4 flex items-center justify-center text-gray-500">
                No messages
            </div>
        );
    }

    const sorted = [...messages].sort(
        (a, b) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
    );

    return (
        <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
            <div className="w-[90%]">
                {sorted.map(m => {
                    if (m.from?.username === userData?.username) {
                        return (
                            <div key={m.id} className="mb-4 text-right">
                                <div className="text-xs text-gray-400">
                                    You · {formatTime(m.created_time)}
                                </div>
                                {m.message ? (
                                    <div className="inline-block bg-blue-100 rounded-lg px-3 py-2 mt-1">
                                        {m.message}
                                    </div>
                                ) : (
                                    <div className="inline-block text-gray-400 italic mt-1">
                                        [no text]
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <div key={m.id} className="mb-4">
                            <div className="text-xs text-gray-400">
                                {m.from?.username} · {formatTime(m.created_time)}
                            </div>
                            {m.message ? (
                                <div className="inline-block bg-gray-100 rounded-lg px-3 py-2 mt-1">
                                    {m.message}
                                </div>
                            ) : (
                                <div className="inline-block text-gray-400 italic mt-1">
                                    [no text]
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
