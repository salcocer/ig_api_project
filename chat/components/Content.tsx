'use client';
import { useUserMedia } from '@/store/useUserMedia';
import { useEffect, useState } from 'react';

export default function Content() {
    const { userMedia } = useUserMedia((state: any) => state);
    const [picture, setPicture] = useState();

    useEffect(() => {
        console.log({ userMedia });
        if (userMedia?.id) {
            fetch(`/api/instagram/${userMedia?.media?.data[0].id}`).then(async res => {
                if (res.status !== 200) return;
                const data = await res.json();
                console.log({ data });
                setPicture(data.media_url);
            });
        }
    }, [userMedia]);

    console.log({ picture });

    return (
        <div className="h-full w-full border border-gray-400 p-4">
            <div className="text-xs text-gray-500">Content Area</div>
        </div>
    );
}
