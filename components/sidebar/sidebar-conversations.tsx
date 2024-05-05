"use client"

import { Conversation } from "@prisma/client";
import { SidebarItem } from "./sidebar-item";
import { SidebarTag } from "./sidebar-tag";
import { usePathname, useRouter } from "next/navigation";

interface SidebarConversationsProps {
    conversations: Conversation[];
}

export const SidebarConversations = ({
    conversations,
}: SidebarConversationsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const today = new Date();

    const todayConversations = conversations.filter(conversation => {
        const createdAtDate = new Date(conversation.createdAt);
        return (
            createdAtDate.toDateString() === today.toDateString() &&
            conversation.createdAt
        );
    });

    const yesterdayConversations = conversations.filter(conversation => {
        const createdAtDate = new Date(conversation.createdAt);
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        return (
            createdAtDate.toDateString() === yesterday.toDateString() &&
            conversation.createdAt
        );
    });

    const previous7DaysConversations = conversations.filter(conversation => {
        const createdAtDate = new Date(conversation.createdAt);
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
        return (
            createdAtDate >= sevenDaysAgo &&
            createdAtDate < today &&
            conversation.createdAt 
        );
    });

    const previous30DaysConversations = conversations.filter(conversation => {
        const createdAtDate = new Date(conversation.createdAt);
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
        return (
            createdAtDate >= thirtyDaysAgo &&
            createdAtDate < today &&
            conversation.createdAt
        );
    });

    return (
        <div className="flex flex-col no-scrollbar">
            {todayConversations.length > 0 && (
                <div className="mt-6">
                    <SidebarTag label="Today" />
                    <div className="mt-4 flex flex-col">
                        {todayConversations.map((conversation, index) => (
                            <div key={index} className="">
                                <SidebarItem
                                    isActive={pathname.startsWith(
                                        `/conversation/${conversation.id}`
                                    )}
                                    conversation={conversation}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {yesterdayConversations.length > 0 && (
                <div className="mt-6">
                    <SidebarTag label="Yesterday" />
                    <div className="mt-4 flex flex-col">
                        {yesterdayConversations.map((conversation, index) => (
                            <div key={index} className="">
                                <SidebarItem
                                    isActive={pathname.startsWith(
                                        `/conversation/${conversation.id}`
                                    )}
                                    conversation={conversation}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {previous7DaysConversations.length > 0 && (
                <div className="mt-6">
                    <SidebarTag label="Previous 7 days" />
                    <div className="mt-4 flex flex-col">
                        {previous7DaysConversations.map((conversation, index) => (
                            <div key={index} className="">
                                <SidebarItem
                                    isActive={pathname.startsWith(
                                        `/conversation/${conversation.id}`
                                    )}
                                    conversation={conversation}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {previous30DaysConversations.length > 0 && (
                <div className="mt-6">
                    <SidebarTag label="Previous 30 days" />
                    <div className="mt-4 flex flex-col">
                        {previous30DaysConversations.map((conversation, index) => (
                            <div key={index} className="">
                                <SidebarItem
                                    isActive={pathname.startsWith(
                                        `/conversation/${conversation.id}`
                                    )}
                                    conversation={conversation}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};