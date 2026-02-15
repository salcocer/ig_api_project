'use client';
import { Suspense, useEffect } from 'react';
import Hero from '@components/Hero';
import LogIn from '@components/LogIn';
import Footer from '@components/Footer';
import Spinner from '@/components/Spinner';
import { redirect } from 'next/navigation';

export default function Home() {
    useEffect(() => {
        const user_id = sessionStorage.getItem('user_id');
        const expires_at = sessionStorage.getItem('expires_at');

        if (user_id && expires_at && new Date(expires_at) > new Date()) redirect('/dashboard');
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <Hero />

                <Suspense fallback={<Spinner />}>
                    <LogIn />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
