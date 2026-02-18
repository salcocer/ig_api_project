'use client';

import { UserMediaStore, useUserMedia } from '@/store/useUserMedia';
import { useEffect, useState } from 'react';
import { Video } from './Video';

export type MediaDetails = {
    id: string;
    media_type: string;
    media_url: string;
    owner: { id: string };
    timestamp: string;
};

export default function Content() {
    const [loading, setLoading] = useState(true);
    const [mediaList, setMediaList] = useState<MediaDetails[]>([]);

    const { userMedia } = useUserMedia((state: UserMediaStore) => state);

    useEffect(() => {
        const ids = userMedia?.data?.map((d: any) => d.id) ?? [];
        if (!ids.length) {
            setMediaList([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        Promise.all(
            ids.map(id =>
                fetch(`/api/instagram/${id}`)
                    .then(res => {
                        if (!res.ok) throw new Error(`Fetch failed for ${id}`);
                        return res.json();
                    })
                    .catch(err => {
                        console.error(err);
                        return null;
                    })
            )
        )
            .then(results => {
                const filtered = (results as MediaDetails[]).filter(Boolean);
                setMediaList(filtered);
            })
            .finally(() => setLoading(false));
    }, [userMedia]);

    return (
        <div className="h-full w-full min-h-0 border border-gray-400 p-4 overflow-auto">
            {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
            ) : mediaList.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
                    {mediaList.map(item => (
                        <div key={item.id} className="h-auto w-full p-2">
                            {item.media_type === 'VIDEO' ? (
                                <Video src={item.media_url} />
                            ) : (
                                <div className="w-[320px] h-auto">
                                    <img
                                        src={item.media_url}
                                        alt={item.id}
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <div className="mt-2 text-xs text-gray-700">
                                        <div>Type: {item.media_type}</div>
                                        <div>
                                            Posted: {new Date(item.timestamp).toLocaleString()}
                                        </div>
                                        <div className="text-gray-500 truncate">ID: {item.id}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-4 text-sm text-gray-500">No media available</div>
            )}
        </div>
    );
}
