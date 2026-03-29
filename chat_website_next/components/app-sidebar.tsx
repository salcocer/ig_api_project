"use client";
import { useEffect, useState } from "react";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Chats",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const ChatSection = {
  title: "Chats",
  url: "#",
  icon: SquareTerminal,
  isActive: true,
  items: [] as { title: string; url: string }[],
};

export type ConversationsType = {
  updated_time: string;
  participants: {
    data: {
      username: string;
      id: string;
    }[];
  };
  id: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [chatsData, setChatsData] = useState(ChatSection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/instagram/conversations")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const conversations: ConversationsType[] = data?.data || [];

        setChatsData((prev) => {
          return {
            ...prev,
            items: conversations.map((conv) => ({
              title:
                conv?.participants?.data[1]?.username ||
                conv?.participants?.data[0]?.username,
              url: `${conv.id}`,
            })),
          };
        });
      })
      .catch((err) => {
        console.error("Error fetching conversations:", err);
      });
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} />{" "} */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={chatsData} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
