"use client";
import SideMenu from "@/components/SideMenu";
import Profile from "@/components/Profile";
import Messages from "@/components/Messages";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - SideMenu */}
      <div className="w-[80px] border-r border-gray-300">
        <SideMenu openModal={() => setIsModalOpen(true)} />
      </div>

      {/* Middle Section - Profile, Stories, Messages */}
      <div className="w-[440px] min-w-[360px] border-r border-gray-300 flex flex-col">
        <Profile />
        <Messages />
      </div>

      {/* Main Content Area */}
      <div className="flex-1">{children}</div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-8 text-gray-900">Instagram</h1>
          {/* Your modal content here */}
        </div>
      </Modal>
    </div>
  );
}
