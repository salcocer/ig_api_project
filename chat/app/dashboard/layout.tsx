import SideMenu from "@/components/SideMenu";
import Profile from "@/components/Profile";
import Messages from "@/components/Messages";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - SideMenu */}
      <div className="w-[60px] border-r border-gray-300">
        <SideMenu />
      </div>

      {/* Middle Section - Profile, Stories, Messages */}
      <div className="w-[360px] border-r border-gray-300 flex flex-col">
        <Profile />
        <Messages />
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
