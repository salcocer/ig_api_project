'use client';
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
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    };
}) {
    const { selectedConversationId, setSelectedConversationId } = useConversationDetails();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {/* {items.map((item) => ( */}
                <Collapsible
                    key={items.title}
                    asChild
                    defaultOpen={items.isActive}
                    className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={items?.title}>
                                {items?.icon && <items.icon />}
                                <span>{items?.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {items?.items?.map(subItem => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    setSelectedConversationId(subItem?.url)
                                                }>
                                                <span>{subItem.title}</span>
                                            </div>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
                {/* ))} */}
            </SidebarMenu>
        </SidebarGroup>
    );
}
