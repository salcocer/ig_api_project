import Profile from '@/components/Profile';
import Messages from '@/components/Messages';
import SideMenu from '@/components/SideMenu';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Sidebar - SideMenu */}
            {/* <div className="w-[80px] border-r border-gray-300">
                 <SideMenu /> 
            </div> */}

            {/* Middle Section - Profile, Stories, Messages */}
            <div className="w-[400px] min-w-[360px] border-r border-gray-300 flex flex-col">
                <Profile />
                <Messages />
            </div>

            {/* Main Content Area */}
            <div className="flex-1">{children}</div>
        </div>
    );
}
