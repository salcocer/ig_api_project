import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type UserMedia = {
    data: { id: string }[];
    paging: {
        cursors: {
            before: string;
            after: string;
        };
    };
};

export type UserMediaStore = {
    userMedia: UserMedia | null;
    setUserMedia: (newUserMedia: UserMedia) => void;
};

export const useUserMedia = create<UserMediaStore>()(
    devtools(set => ({
        userMedia: null as UserMedia | null,
        setUserMedia: (newUserMedia: UserMedia) => set({ userMedia: newUserMedia }),
    }))
);
