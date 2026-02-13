'use client';
import Hero from '@components/Hero';
import LogIn from '@components/LogIn';
import Footer from '@components/Footer';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { fetchShortLivedToken } from '@/lib/api';

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

export default function Home() {
    const params = useSearchParams();
    const code = params?.get('code'); // string | null

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
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                {/* Hero Section*/}
                <div className="w-[60%] min-w-75">
                    <Hero />
                </div>

                {/* Login Form*/}
                <div className="w-[30%] min-w-75">
                    <LogIn />
                </div>
            </div>

            <Footer />
        </div>
    );
}
