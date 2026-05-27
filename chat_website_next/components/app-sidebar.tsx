'use client';
import { useEffect, useState } from 'react';

import * as React from 'react';
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';

import { io } from 'socket.io-client';
import { initSocket } from '@/hooks/useSocket';
import { toast } from 'sonner';
// import ConversationDetail from './ConversationDetail';
// import useKeysConversation from '@/hooks/useKeysConversation';
// import { useEffect, useState } from 'react';
import { Event, useWebhookEvents } from '@/store/useWebhookEvents';
import { useConversationDetails } from '@/store/useConversationDetails';
// import { useConversationDetails } from '@/store/useConversationDetails';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Chats',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [],
        },
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
};

const ChatSection = {
    title: 'Instagram Chats',
    url: '#',
    icon: 'ig_icon.svg',
    isActive: true,
    items: [] as { title: string; url: string }[],
};

export type ConversationsType = {
    updated_time: string;
    participants: {
        data: {
            username: string;
            id: string;
        }[];
    };
    id: string;
};

export type Conversation = {
    id: string;
    updated_time: string;
    participants: {
        data: {
            username: string;
            id: string;
        }[];
    };
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [chatsData, setChatsData] = useState(ChatSection);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [conversations, setConversations] = useState<ConversationsType[]>([]);

    const { addMessageToConversation } = useConversationDetails();
    // const participants = conversations.flatMap(conv => conv.participants.data);

    useEffect(() => {
        const socket = initSocket() || io();
        socket.on('ig_event', (event: Event) => {
            console.log('Received IG event via socket', event);

            const senderId = event.entry[0].messaging[0].sender.id;
            // const findSenderUsername = participants.find(p => p.id === senderId)?.username;

            if (event.entry[0].messaging[0].message?.is_echo) return;

            if (findSenderUsername) {
                // addEvent({
                //     event: event,
                //     checked: false,
                //     received_at: new Date().toISOString(),
                // });

                const senderId = event.entry[0].messaging[0].sender.id;
                const findConversationForSender = conversations.find(conv =>
                    conv.participants.data.some(p => p.id === senderId)
                );
                const newMessage = event.entry[0].messaging[0].message?.text;

                addMessageToConversation(findConversationForSender?.id || '', {
                    id: `temp-${Date.now()}`,
                    created_time: new Date().toISOString(),
                    from: {
                        username: findSenderUsername,
                        id: senderId,
                    },
                    to: {
                        data: [],
                    },
                    message: newMessage,
                });

                toast.success(
                    `${findSenderUsername}: ${event.entry[0].messaging[0].message.text}`,
                    {
                        position: 'top-center',
                    }
                );
            }
        });
        return () => {
            socket.off('ig_event');
            // do not disconnect shared socket here; keep alive for other components
        };
    // }, [participants]);
    }, []);

    useEffect(() => {
        fetch('/api/instagram/conversations')
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                const conversations: ConversationsType[] = data?.data || [];

                setChatsData(prev => {
                    return {
                        ...prev,
                        items: conversations.map(conv => ({
                            title:
                                conv?.participants?.data[1]?.username ||
                                conv?.participants?.data[0]?.username,
                            url: `${conv.id}`,
                        })),
                    };
                });
            })
            .catch(err => {
                console.error('Error fetching conversations:', err);
            });
    }, []);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>{/* <TeamSwitcher teams={data.teams} />{" "} */}</SidebarHeader>
            <SidebarContent>
                <NavMain items={chatsData} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
