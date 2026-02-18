'use client';
import Image from 'next/image';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';

type UserData = {
    name: string;
    username: string;
    profile_picture_url: string;
    followers_count: number;
    follows_count: number;
    media_count: number;
};

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

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
    }, []);

    return (
        <div className="border-b border-gray-300 ">
            {loading && (
                <div className="flex items-center justify-center h-32">
                    <Spinner />
                </div>
            )}
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
                        />
                    )}

                    <div className="ml-3">
                        <a className=" ml-2 font-bold hover:cursor-pointer">{userData?.username}</a>
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
