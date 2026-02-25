import Profile from '@/components/Profile';
import Conversations from '@/components/Conversations';
import ConversationFetcher from '@/components/ConversationFetcher';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const access_token = (await cookieStore)?.get('access_token')?.value || '';
    const expires_at = (await cookieStore)?.get('expires_at')?.value || '';

    if (
        process.env.NODE_ENV === 'production' &&
        (!access_token || !expires_at || new Date(expires_at) <= new Date())
    ) {
        redirect('/');
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="border-r border-gray-300 flex flex-col w-fit md:w-80">
                <Profile />
                <Conversations />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden bg-(--bg-color)">
                <ConversationFetcher />
                {children}
            </div>
        </div>
    );
}
