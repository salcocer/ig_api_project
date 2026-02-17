'use client';
import Stories from './Stories';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Spinner from './Spinner';
import { useUserData } from '@/store/userData';

export default function Profile() {
    const router = useRouter();
    const { userData, setUserData } = useUserData((state: any) => state);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/instagram/me').then(async res => {
            if (res.status !== 200) {
                router.push('/');
                return;
            }
            if (!res.ok) {
                setError(res?.statusText || 'Failed to fetch user data');
                setLoading(false);
                return;
            }
            const data = await res.json();
            setUserData(data);
            setLoading(false);
        });
    }, [router, setUserData]);

    if (loading) return <Spinner />;

    return (
        <div className="border-b border-gray-300 ">
            {/* Profile Header */}
            <div className="h-[120px] w-auto border border-gray-400 justify-center items-center flex ">
                <div className="flex items-center w-full p-4">
                    {userData?.profile_picture_url && (
                        <Image
                            src={userData.profile_picture_url}
                            alt={userData.name || 'Profile Picture'}
                            width={70}
                            height={70}
                            className="w-16 h-16 rounded-full hover:cursor-pointer"
                            onClick={() => console.log('onClickImage')}
                        />
                    )}

                    <div className="ml-3">
                        <a
                            onClick={() => console.log('onClickName')}
                            className=" ml-2 font-bold hover:cursor-pointer">
                            {userData?.username}
                        </a>
                        <div>
                            <span className="ml-2 ">{userData?.followers_count}</span>
                            <span className="ml-2 ">{userData?.follows_count}</span>
                            <span className="ml-2 ">{userData?.media_count}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Stories /> */}
        </div>
    );
}
