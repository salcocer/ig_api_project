'use client';
import { useEffect } from 'react';
import { useUserData } from '@/store/useUserData';
import { useConversationDetails } from '@/store/useConversationDetails';
import '../globals.css';

function formatTime(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString();
}

// {
//   "id": "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDQ2NzM5MjI5MzY4OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI3NjE5MzY4MjEzMzY0NDk1MTozMjY3ODI0OTMwNzI0MDQ2Mjc3Mzg4NzMyNDg5NDc4OTYzMgZDZD",
//   "created_time": "2026-02-19T08:57:24+0000",
//   "from": {
//     "username": "alcoocer_17",
//     "id": "2348200432365801"
//   },
//   "to": {
//     "data": [
//       {
//         "username": "stalynalejandro_alcocer",
//         "id": "17841446739229368"
//       }
//     ]
//   },
//   "message": "",
//   "shares": {
//     "data": [
//       {
//         "link": "https://lookaside.fbsbx.com/ig_messaging_cdn/?asset_id=17922234615230189&signature=Ab3V8-TH2gU21x_5VPJYDvV1viUa0dhkIHNmz112b3-gIIJVn7eiGhdC2s0VuQQni8YuKpAYtuNPGDq-8g8pH1TI9yyPXc5NS1tX_6tingzGTmelt4_OPLgk8BNAGAaEKQJT-yQO3SWd3UrsWzioP85m2N_XLJlGRr5xLGIhJ9AWqAAriWGwkcVEY6OjgjiwkRedqHLcq30dVbOu3fe-j71oF8sBaqQ"
//       }
//     ],
//     "paging": {
//       "cursors": {
//         "before": "MAZDZD",
//         "after": "MAZDZD"
//       },
//       "next": "https://graph.instagram.com/v24.0/aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDQ2NzM5MjI5MzY4OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI3NjE5MzY4MjEzMzY0NDk1MTozMjY3ODI0OTMwNzI0MDQ2Mjc3Mzg4NzMyNDg5NDc4OTYzMgZDZD/shares?access_token=IGAAMLTwGYilJBZAFk2RTREazlhbHJkT0tWdlpudC1jMjd0bW5VMHJqM0dOb1h6LUZAxVzdldnJqLV9VN3ZAVUkZApTnVXN2NpTkdMbXpQOS01R0FiV1pmSS1TbTl3S2dfNHFuSlgxU0FtcHhDS0J6Vm9WYVpjamhvYzdocFoxaDdEcwZDZD&limit=25&after=MAZDZD"
//     }
//   }
// }

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
                                if (!m.message) {
                                    console.log('Message with no text:', m);
                                }
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
                                                href={m?.shares?.data?.[0]?.link}
                                                target="_blank"
                                                className="inline-block text-blue-400 italic mt-1">
                                                [shared media]
                                            </a>
                                        )}
                                    </div>
                                );
                            }

                            if (!m.message) {
                                console.log('Message with no text:', m);
                            }

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
                                            href={m?.shares?.data?.[0]?.link}
                                            target="_blank"
                                            className="inline-block text-blue-400 italic mt-1">
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
