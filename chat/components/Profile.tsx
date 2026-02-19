'use client';
import Image from 'next/image';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import { UserDataStore, useUserData } from '@/store/useUserData';
import { UserMediaStore, useUserMedia } from '@/store/useUserMedia';

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const { userData, setUserData } = useUserData((state: UserDataStore) => state);
    const { userMedia, setUserMedia } = useUserMedia((state: UserMediaStore) => state);

    useEffect(() => {
        fetch('/api/instagram/me')
            .then(res => res.json())
            .then(data => {
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [setUserData]);

    useEffect(() => {
        if (!userData?.id) return;
        fetch('/api/instagram/media')
            .then(res => res.json())
            .then(data => {
                setUserMedia(data?.media);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [userData, setUserMedia]);

    return (
        <div className="border-b border-gray-300 ">
            {loading && (
                <div className="flex items-center justify-center h-32">
                    <Spinner />
                </div>
            )}
            {/* Profile Header */}
            <div className="h-[80px] sm:h-[120px] w-full sm:w-auto border border-gray-400 justify-center items-center flex">
                <div className="flex items-center w-full p-4">
                    {userData?.profile_picture_url && (
                        <Image
                            src={userData.profile_picture_url}
                            alt={userData.name || 'Profile Picture'}
                            width={70}
                            height={70}
                            className="w-16 h-16 rounded-full hover:cursor-pointer "
                        />
                    )}
                    <div className="ml-3 min-w-0">
                        <a className="hidden sm:inline ml-2 font-bold hover:cursor-pointer truncate">
                            {userData?.username}
                        </a>
                        <div className="hidden md:flex">
                            <span className="ml-2 flex items-center text-xs sm:text-sm">{`${userData?.followers_count}`}</span>
                            <span className="ml-2 flex items-center text-xs sm:text-sm">{`${userData?.follows_count}`}</span>
                            <span className="ml-2 flex items-center text-xs sm:text-sm">{`${userData?.media_count}`}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Stories /> */}
        </div>
    );
}
