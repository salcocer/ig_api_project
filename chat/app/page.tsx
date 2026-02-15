import Hero from '@components/Hero';
import LogIn from '@components/LogIn';
import Footer from '@components/Footer';
import Spinner from '@/components/Spinner';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Home() {
    const cookieStore = cookies();
    const access_token = (await cookieStore)?.get('access_token')?.value || '';
    const expires_at = (await cookieStore)?.get('expires_at')?.value || '';

    if (access_token && expires_at && new Date(expires_at) > new Date()) {
        redirect('/dashboard');
    }

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
