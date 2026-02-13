'use client';
import Content from '@/components/Content';
import { redirect } from 'next/navigation';
import { getSessionToken } from '@store/session';
import { fetchInstagramData } from '@/lib/api';
import { useEffect, useState } from 'react';

async function getUserData() {
    try {
        const data = await fetchInstagramData(
            '/me',
            {
                fields: 'id,name',
            },
            String(getSessionToken())
        );
        return data;
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch user data');
    }
}

export default function DashboardContent() {
    const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const session = getSessionToken();

    if (!session) redirect('/login');

    useEffect(() => {
        getUserData()
            .then(data => setUserData(data))
            .catch(err => setError(err.message));
    }, []);

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
