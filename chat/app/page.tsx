'use client';
import { Suspense } from 'react';
import Hero from '@components/Hero';
import LogIn from '@components/LogIn';
import Footer from '@components/Footer';
import Spinner from '@/components/Spinner';

export default function Home() {
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
