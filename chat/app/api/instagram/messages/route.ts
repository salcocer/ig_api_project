// curl -X POST "https://graph.instagram.com/v25.0/<IG_ID>/messages"
//      -H "Authorization: Bearer <INSTAGRAM_USER_ACCESS_TOKEN>"
//      -H "Content-Type: application/json"
//      -d '{
//            "recipient":{
//                "id":"<IGSID>"
//            },
//            "message":{
//               "text":"<TEXT_OR_LINK>"
//            }
//         }'

import { sendInstagramMessage } from '@/lib/api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        let access_token = (await cookieStore)?.get('access_token')?.value || '';

        if (process.env.NODE_ENV === 'production' && !access_token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        if (process.env.NODE_ENV === 'development') {
            access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
        }

        const { recipient_id, text } = await req.json();

        const data = await sendInstagramMessage(text, recipient_id, access_token).catch(error => {
            throw new Error(error?.message);
        });

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Fetch failed' }, { status: 500 });
    }
}
