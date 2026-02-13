import { StoredUser } from './constants';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET || process.env.NEXT_PUBLIC_SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey || '');

export async function encrypt(payload: StoredUser) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log('Failed to verify session');
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
        id: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expires_at: expiresAt.toString(),
        name: '',
        access_token: '',
    });
    if (typeof window !== 'undefined') {
        try {
            sessionStorage.setItem('session', session);
        } catch (e) {
            console.log('Failed to save session to sessionStorage', e);
        }
    }
}

// export async function updateSession() {
//     if (typeof window === 'undefined') return null;
//     const session = sessionStorage.getItem('session') ?? undefined;
//     const payload = await decrypt(session);

//     if (!session || !payload) return null;

//     const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//     const newSession = await encrypt({
//         id: (payload as StoredUser).id,
//         expires_at: expiresAt.toString(),
//     });
//     try {
//         sessionStorage.setItem('session', newSession);
//     } catch (e) {
//         console.log('Failed to update session in sessionStorage', e);
//     }
//     return newSession;
// }

export async function deleteSession() {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.removeItem('session');
    } catch (e) {
        console.log('Failed to remove session from sessionStorage', e);
    }
}

export async function getSession(): Promise<StoredUser | null> {
    if (typeof window === 'undefined') return null;
    const session = sessionStorage.getItem('session') ?? undefined;
    if (!session) return null;
    const payload = await decrypt(session);
    return (payload as StoredUser) ?? null;
}

export async function getSessionToken(): Promise<string | null> {
    const session: StoredUser | null = await getSession();
    return session?.access_token || null;
}
