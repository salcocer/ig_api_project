'use client';
import { useEffect } from 'react';
import { fetchShortLivedToken } from '@/lib/api';
import { redirect, useSearchParams } from 'next/navigation';

async function getShortLivedToken(code: string) {
    try {
        const data = await fetchShortLivedToken(
            process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || '',
            process.env.NEXT_PUBLIC_INSTAGRAM_APP_SECRET || '',
            process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || '',
            code
        );
        return data;
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch short-lived token');
    }
}

export default function LogIn() {
    const params = useSearchParams();
    const code = params?.get('code'); // string | null

    const SCOPE = process.env.NEXT_PUBLIC_INSTAGRAM_SCOPE || '';
    const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || '';
    const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || '';

    const auth_code = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        redirect(auth_code);
    };

    useEffect(() => {
        if (code) {
            getShortLivedToken(code)
                .then(data => {
                    if (typeof window !== 'undefined') {
                        // Save access token in session storage
                        try {
                            sessionStorage.setItem('session', data.access_token); // Redirect to dashboard after successful login
                            redirect('/dashboard');
                        } catch (e) {
                            console.log('Failed to save access token to sessionStorage', e);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching short-lived token:', error);
                });
        }
    }, [code]);

    return (
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
    );
}
