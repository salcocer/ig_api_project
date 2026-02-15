'use client';
import Stories from './Stories';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// {
//   "id": "26053413067623651",
//   "name": "Alejandro Alcocer",
//   "username": "stalynalejandro_alcocer",
//   "profile_picture_url": "https://scontent.cdninstagram.com/v/t51.82787-19/554558115_18052483499557975_2370044718553376715_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=110&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=MCeC27jZW6QQ7kNvwENUz-d&_nc_oc=AdmRoaf2ukp5XMYpfixt8kU-hv5g7cpTdPnrP-0W0VZ02N-a1ZyYwonalyXlYkvOXPs&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&edm=AP4hL3IEAAAA&_nc_gid=iVQFIqB2c1HWbt9JXJnX9w&_nc_tpa=Q5bMBQHk16BCFRA7dexsQKgAtTuzCA8q1paxDMKWgiD-b4iLhVqOv3hJqEDJHKIYxtZ5oOrAOhqTaPwq&oh=00_AfvztDmezruVFrWWfFLdf2_k4kjQvBoQEnTJpdxVbE38Xg&oe=699729A9",
//   "followers_count": 151,
//   "follows_count": 232,
//   "media_count": 67
// }

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<{
        id: string;
        name: string;
        username: string;
        profile_picture_url: string;
        followers_count: number;
        follows_count: number;
        media_count: number;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/instagram/me').then(async res => {
            if (res.status === 401) {
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
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="border-b border-gray-300">
            {/* Profile Header - 120px height */}
            <div className="h-[120px] border border-gray-400 p-4">
                <div className="flex items-center">
                    {userData?.profile_picture_url && (
                        <Image
                            src={userData.profile_picture_url}
                            alt={userData.name || 'Profile Picture'}
                            width={70}
                            height={70}
                            className="w-15 h-15 rounded-full"
                        />
                    )}

                    <div className="ml-2">
                        <span className=" ml-2 font-medium">{userData?.username}</span>
                        <div>
                            <span className="ml-2 text-gray-500">{userData?.followers_count}</span>
                            <span className="ml-2 text-gray-500">{userData?.follows_count}</span>
                            <span className="ml-2 text-gray-500">{userData?.media_count}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stories - 180px height */}
            <Stories />
        </div>
    );
}
