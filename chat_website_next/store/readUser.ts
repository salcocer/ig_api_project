import type { SessionUser } from './constants';

export const readUser = async (key: string): Promise<string | SessionUser | undefined> => {
    try {
        const data = sessionStorage.getItem(key);
        if (data) return JSON.parse(data);
    } catch (e) {
        console.error(e);
    }
    return;
};
