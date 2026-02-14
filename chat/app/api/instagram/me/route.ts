import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchInstagramData } from '@/lib/api';

export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const access_token = (await cookieStore)?.get('ig_access_token')?.value;
        if (!access_token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }
        console.log(access_token);

        const data = await fetchInstagramData('/me', { fields: 'name' }, access_token);

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Fetch failed' }, { status: 500 });
    }
}
