import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// {
//   "messages": {
//     "data": [
//       {
//         "id": "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDQ2NzM5MjI5MzY4OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI3NjAzMzc2NDUzMzY5NzAxOTozMjY3NzI5NzQ3Mzk0Mzk4OTgzNDYwMDM4MzA3MDA3NjkyOAZDZD",
//         "created_time": "2026-02-18T18:37:25+0000",
//         "from": {
//           "username": "stalynalejandro_alcocer",
//           "id": "17841446739229368"
//         },
//         "to": {
//           "data": [
//             {
//               "username": "mrobot02",
//               "id": "857554700670009"
//             }
//           ]
//         },
//         "message": "hello first conversations"
//       }
//     ],
//     "paging": {
//       "cursors": {
//         "after": "ZAXlKamRYSnpiM0lpT2lJek1qWTNOekk1TnpRM016azBNems0T1Rnek5EWXdNRE00TXpBM01EQTNOamt5T0NKOQZDZD"
//       },
//       "next": "https://graph.instagram.com/v24.0/aWdfZAG06MzQwMjgyMzY2ODQxNzEwMzAxMjQ0Mjc2MDMzNzY0NTMzNjk3MDE5/messages?access_token=IGAAMLTwGYilJBZAFk2RTREazlhbHJkT0tWdlpudC1jMjd0bW5VMHJqM0dOb1h6LUZAxVzdldnJqLV9VN3ZAVUkZApTnVXN2NpTkdMbXpQOS01R0FiV1pmSS1TbTl3S2dfNHFuSlgxU0FtcHhDS0J6Vm9WYVpjamhvYzdocFoxaDdEcwZDZD&fields=id%2Ccreated_time%2Cfrom%2Cto%2Cmessage&limit=25&after=ZAXlKamRYSnpiM0lpT2lJek1qWTNOekk1TnpRM016azBNems0T1Rnek5EWXdNRE00TXpBM01EQTNOamt5T0NKOQZDZD"
//     }
//   },
//   "id": "aWdfZAG06MzQwMjgyMzY2ODQxNzEwMzAxMjQ0Mjc2MDMzNzY0NTMzNjk3MDE5"
// }

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

export type ConversationsDetailsStore = {
    conversations: ConversationDetails[] | [];
    selectedConversation: ConversationDetails | null;
    setSelectedConversation: (selectedConversation: string) => void;
    addConversationDetails: (newConversationDetails: ConversationDetails) => void;
};

export const useConversationDetails = create<ConversationsDetailsStore>()(
    devtools(set => ({
        conversations: [],
        selectedConversation: null,
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
