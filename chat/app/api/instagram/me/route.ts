import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchInstagramData } from '@/lib/api';

export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        let access_token = (await cookieStore)?.get('access_token')?.value || '';

        if (process.env.NODE_ENV === 'production' && !access_token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        console.log('Access token from cookie:', access_token);
        if (process.env.NODE_ENV === 'development') {
            access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
        }

        const data = await fetchInstagramData(
            '/me',
            {
                fields: 'name, username, profile_picture_url, followers_count, follows_count, media_count',
            },
            access_token
        ).catch(error => {
            throw new Error(error?.message);
        });

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Fetch failed' }, { status: 500 });
    }
}
