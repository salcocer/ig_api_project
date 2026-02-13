import { KEY_CONSTANTS } from './constants';
import type { StoredUser } from './constants';

export const saveUser = async (user: StoredUser): Promise<void> => {
    try {
        const serializedUser = JSON.stringify(user);
        sessionStorage.setItem(KEY_CONSTANTS.USER, serializedUser);
    } catch (e) {
        console.log(e);
    }
};
