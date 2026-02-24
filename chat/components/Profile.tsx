'use client';
import Image from 'next/image';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import { UserDataStore, useUserData } from '@/store/useUserData';

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const { userData, setUserData } = useUserData((state: UserDataStore) => state);

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

    return (
        <div className="p-2 border-b border-gray-300">
            {loading && (
                <div className="flex items-center justify-center h-32">
                    <Spinner />
                </div>
            )}
            <div className="h-22 w-full flex justify-center items-center ">
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
                    <div className="ml-1 flex flex-col">
                        <a className="ml-2 font-bold hover:cursor-pointer ">{userData?.username}</a>
                        <div className="flex">
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
