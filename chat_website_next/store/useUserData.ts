import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type UserData = {
    id: string;
    name: string;
    username: string;
    profile_picture_url: string;
    followers_count: number;
    follows_count: number;
    media_count: number;
};

export type UserDataStore = {
    userData: UserData | null;
    setUserData: (newUserData: UserData) => void;
};

export const useUserData = create<UserDataStore>()(
    devtools(set => ({
        userData: null as UserData | null,
        setUserData: (newUserData: UserData) => set({ userData: newUserData }),
    }))
);
