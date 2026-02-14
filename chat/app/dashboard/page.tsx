'use client';
import Content from '@/components/Content';
import { useRouter } from 'next/navigation';
import { getSessionToken } from '@store/session';
import { fetchInstagramData } from '@/lib/api';
import { useEffect, useState } from 'react';

async function getUserData(sessionToken: string) {
    try {
        const data = await fetchInstagramData(
            '/me',
            {
                fields: 'id,name',
            },
            sessionToken
        );
        return data;
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch user data');
    }
}

export default function DashboardContent() {
    const router = useRouter();
    const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getSessionToken()
            .then(token => {
                if (!token) router.push('/');
                else {
                    getUserData(token)
                        .then(data => setUserData(data))
                        .catch(err => setError(err.message));
                }
            })
            .catch(() => router.push('/'));
    }, [router]);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {userData ? (
                <div>
                    <h1>Welcome, {userData.name}!</h1>
                    <p>Your ID: {userData.id}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Content />
        </div>
    );
}
