export enum KEY_CONSTANTS {
    USER = '@USER',
    STATE = '@STATE',
    POINTS = '@POINTS',
}

export type StoredUser = {
    id: string;
    name: string;
    access_token: string;
    expires_at?: string;
    createdAt: string;
    updatedAt: string;
};

export type SessionUser = {
    user_id: string;
    access_token: string;
    permissions: string[];
    created_at: string;
    expires_at: string;
};
