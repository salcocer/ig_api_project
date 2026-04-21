'use client';
import Image from 'next/image';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useConversationDetails } from '@/store/useConversationDetails';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: string | LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    };
}) {
    const { selectedConversationId, setSelectedConversationId } = useConversationDetails();

    console.log('selectedConversationId', selectedConversationId);
    console.log({ items });

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible
                    key={items.title}
                    asChild
                    defaultOpen={items.isActive}
                    className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={items?.title}>
                                {/* {items?.icon && <items.icon />} */}
                                <Image
                                    src={(items?.icon as string) || ''}
                                    alt="app_icon"
                                    width={20}
                                    height={20}
                                    className="dark:invert"
                                />
                                <span>{items?.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {items?.items?.map(subItem => (
                                    <SidebarMenuSubItem
                                        key={subItem.title}
                                        onClick={() => setSelectedConversationId(subItem?.url)}
                                        className="cursor-pointer">
                                        <SidebarMenuSubButton
                                            asChild
                                            className={
                                                selectedConversationId === subItem.url
                                                    ? 'bg-gray-100 dark:bg-gray-700 font-bold'
                                                    : ''
                                            }>
                                            <span>{subItem.title}</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}
