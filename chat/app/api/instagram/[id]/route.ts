import { cookies } from 'next/headers';
import { fetchInstagramData } from '@/lib/api';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } | Promise<{ id: string }> }
) {
    try {
        const cookieStore = cookies();
        let access_token = (await cookieStore)?.get('access_token')?.value || '';

        if (process.env.NODE_ENV === 'production' && !access_token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        if (process.env.NODE_ENV === 'development') {
            access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
        }

        const params = await context.params;
        const mediaId = params.id;

        const data = await fetchInstagramData(
            `${mediaId}`,
            {
                fields: 'id,media_type,media_url,owner,timestamp',
            },
            access_token
        );

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Fetch failed' }, { status: 500 });
    }
}
