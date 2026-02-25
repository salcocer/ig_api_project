import { ConversationMessage } from '@/app/dashboard/page';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ConversationDetails = {
    messages: {
        data: ConversationMessage[];
        paging: {
            cursors: {
                after: string;
            };
            next: string;
        };
    };
    id: string;
    participants: {
        data: {
            username: string;
            id: string;
        }[];
    };
    updated_time: string;
};

export type ConversationsDetailsStore = {
    conversations: ConversationDetails[] | [];
    selectedConversation: ConversationDetails | null;
    selectedConversationId: string | null;
    addConversationDetails: (newConversationDetails: ConversationDetails) => void;
    setSelectedConversation: (selectedConversation: string) => void;
    setSelectedConversationId: (selectedConversation: string | null) => void;
};

export const useConversationDetails = create<ConversationsDetailsStore>()(
    devtools(set => ({
        conversations: [],
        selectedConversation: null,
        selectedConversationId: null,
        setSelectedConversationId: (selectedConversation: string | null) => {
            set(state => ({
                selectedConversationId: selectedConversation,
                selectedConversation:
                    selectedConversation != null
                        ? state.conversations.find(c => c.id === selectedConversation) || null
                        : null,
            }));
        },
        setSelectedConversation: (selectedConversation: string) => {
            set(state => ({
                selectedConversation:
                    state.conversations.find(c => c.id === selectedConversation) || null,
            }));
        },
        addConversationDetails: (newConversationDetails: ConversationDetails) =>
            set(state => ({
                conversations: [...state.conversations, newConversationDetails],
            })),
    }))
);
