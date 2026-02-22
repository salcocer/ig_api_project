import Profile from '@/components/Profile';
import Conversations from '@/components/Conversations';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-[18%] border-r border-gray-300 flex flex-col">
                <Profile />
                <Conversations />
            </div>

            <div className="flex-1">{children}</div>
        </div>
    );
}
