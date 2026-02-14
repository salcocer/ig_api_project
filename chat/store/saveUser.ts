import { KEY_CONSTANTS } from './constants';
import type { SessionUser } from './constants';

export const saveUser = async (user: SessionUser): Promise<void> => {
    try {
        const serializedUser = JSON.stringify(user);
        sessionStorage.setItem(KEY_CONSTANTS.USER, serializedUser);
    } catch (e) {
        console.log(e);
    }
};
