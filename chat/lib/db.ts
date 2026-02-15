import { join } from 'path';
import { promises as fs } from 'fs';

const DATA_DIR = join(process.cwd(), 'chat', 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');

type SessionUser = {
    id: string;
    name: string;
    access_token: string;
    expires_at?: string; // ISO string
    createdAt: string;
    updatedAt: string;
};

async function ensureDataDir() {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
        await fs.access(USERS_FILE);
    } catch (e) {
        await fs.writeFile(USERS_FILE, JSON.stringify({}), 'utf8');
    }
}

async function readAll(): Promise<Record<string, SessionUser>> {
    await ensureDataDir();
    const raw = await fs.readFile(USERS_FILE, 'utf8');
    try {
        return JSON.parse(raw) as Record<string, SessionUser>;
    } catch (e) {
        return {};
    }
}

async function writeAll(data: Record<string, SessionUser>) {
    await ensureDataDir();
    await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function saveUser(user: SessionUser) {
    const all = await readAll();
    user.updatedAt = new Date().toISOString();
    if (!user.createdAt) user.createdAt = new Date().toISOString();
    all[user.id] = user;
    await writeAll(all);
}

export async function getUser(id: string): Promise<SessionUser | null> {
    const all = await readAll();
    return all[id] || null;
}

export async function deleteUser(id: string) {
    const all = await readAll();
    if (all[id]) {
        delete all[id];
        await writeAll(all);
    }
}

export async function listUsers(): Promise<SessionUser[]> {
    const all = await readAll();
    return Object.values(all);
}

export async function upsertUserToken(
    id: string,
    token: string,
    expiresInSeconds?: number,
    name?: string
) {
    const now = new Date();
    const existing = await getUser(id);
    const expires_at = expiresInSeconds
        ? new Date(now.getTime() + expiresInSeconds * 1000).toISOString()
        : undefined;

    const user: SessionUser = {
        id,
        name: name ?? existing?.name ?? '',
        access_token: token,
        expires_at,
        createdAt: existing?.createdAt ?? now.toISOString(),
        updatedAt: now.toISOString(),
    };

    await saveUser(user);
    return user;
}
