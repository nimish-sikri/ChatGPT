"use client"

import React from "react";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarUser } from "./sidebar-user";
import { SidebarConversations } from "./sidebar-conversations";
import { Conversation } from "@prisma/client";


interface SidebarProps{
    currentUser: any;
    conversations: Conversation[];
}
export const SideBar = ({
    currentUser,
    conversations,
} : SidebarProps) => {
  return (
    <div
      className="hidden md:block h-full w-[18vw] bg-[#f9f9f9] dark:bg-[#171717] p-4"
    >
        <div className="w-full h-full text-black dark:text-white flex flex-col items-center justify-between">
            <div className="w-full h-[6%]">
                <SidebarHeader/>
            </div>
            <div className="w-full h-[77%] overflow-hidden overflow-y-scroll no-scrollbar">
                <SidebarConversations conversations={conversations}/>
            </div>
            <div className="w-full h-[15%] flex flex-col items-center justify-between">
                <div className="w-full">
                    <SidebarFooter/>
                </div>
                <div className="w-full">
                    <SidebarUser currentUser={currentUser}/>
                </div>
            </div>
        </div>
    </div>
  );
};