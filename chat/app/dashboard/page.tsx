'use client';
import Content from '@/components/Content';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardContent() {
    const router = useRouter();
    const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        fetch('/api/instagram/me')
            .then(async res => {
                if (!mounted) return;
                if (res.status === 401) {
                    router.push('/');
                    return;
                }
                if (!res.ok) {
                    // const err = await res.json().catch(() => ({ error: 'Failed to fetch' }));
                    setError(res?.statusText || 'Failed to fetch user data');
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setUserData(data);
                setLoading(false);
            })
            .catch(() => {
                if (mounted) router.push('/');
            });

        return () => {
            mounted = false;
        };
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {userData ? (
                <div>
                    <h1>Welcome, {userData.name}!</h1>
                    <p>Your ID: {userData.id}</p>
                </div>
            ) : (
                <p>Not signed in</p>
            )}
            <Content />
        </div>
    );
}
