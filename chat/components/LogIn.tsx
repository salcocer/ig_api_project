'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Spinner from './Spinner';

async function postCodeToServer(code: string) {
    const res = await fetch('/api/auth/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    }).catch(error => {
        throw new Error(`${error.message}`);
    });

    return res.json();
}

export default function LogIn() {
    const router = useRouter();
    const params = useSearchParams();
    const code = params?.get('code');

    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);

    const SCOPE = process.env.NEXT_PUBLIC_INSTAGRAM_SCOPE || '';
    const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || '';
    const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || '';

    const auth_code = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof window !== 'undefined') window.location.href = auth_code; // Navigate the browser to Instagram's OAuth page (external URL)
    };

    useEffect(() => {
        if (!code) return;
        setLoading(true);
        postCodeToServer(code)
            .then(data => {
                try {
                    // createSession(data?.data);
                    router.push('/dashboard');
                } catch (e) {
                    console.error('Failed to save access token or navigate', e);
                } finally {
                    setLoading(false);
                }
            })
            .catch(error => console.error('Error exchanging code on server:', error));
    }, [code, router]);

    return (
        <div className="w-[30%] min-w-75">
            {loading && <Spinner />}
            <div className="flex items-center justify-center bg-color  h-full">
                <div className="w-full max-w-sm p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-serif mb-8 text-gray-900 dark:text-gray-100">
                            Simple Instagram
                        </h1>
                    </div>

                    <form className="space-y-3" onSubmit={handleLogin}>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600">
                            Log in with Instagram
                        </button>
                    </form>

                    <div className="flex items-center my-5">
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                            OR
                        </span>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                        You can also report content you believe is unlawful in your country without
                        logging in.
                    </p>
                </div>
            </div>
        </div>
    );
}
