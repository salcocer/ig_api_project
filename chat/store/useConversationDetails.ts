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

export type ConversationsDetailsStore = {
    conversations: ConversationDetails[] | [];
    selectedConversation: ConversationDetails | null;
    selectedConversationId: string | null;
    addMessageToConversation: (conversationId: string, message: ConversationMessage) => void;
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
        addMessageToConversation: (conversationId: string, message: ConversationMessage) =>
            set(state => {
                const conversations = state.conversations.map(c => {
                    if (c.id !== conversationId) return c;
                    const messages = c.messages
                        ? { ...c.messages }
                        : { data: [], paging: { cursors: { after: '' }, next: '' } };
                    const data = messages.data ? [message, ...messages.data] : [message];
                    return { ...c, messages: { ...messages, data } };
                });

                return {
                    conversations,
                    selectedConversation:
                        state.selectedConversation &&
                        state.selectedConversation.id === conversationId
                            ? conversations.find(x => x.id === conversationId) ||
                              state.selectedConversation
                            : state.selectedConversation,
                };
            }),
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
