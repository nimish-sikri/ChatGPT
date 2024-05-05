"use client"

import { Bolt, ChevronDown, MessageCircleDashed, Sparkles, Upload, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { usePathname, useParams } from 'next/navigation';
import { useModal } from "@/hooks/use-modal-store";

export const ChatSectionHeader = () => {

    const pathname = usePathname();
    const params = useParams();
    const { onOpen } = useModal();

    const { conversationId } = params;

    const shareModalProps = {
        conversationId: conversationId,
    };

   return (
        <div className="rounded-lg p-2 dark:hover:bg-[#212121] hover:bg-[#ececec] cursor-pointer">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-lg text-black dark:text-white">
                            ChatGPT <span className="opacity-45">3.5</span>
                        </p>
                        <ChevronDown size={20} className="opacity-45 text-black dark:text-white"/>
                    </div>
                    
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[25vw] mt-3 pt-4" align="start">
                    <DropdownMenuLabel className="text-[12px] font-normal text-neutral-400 px-4">Model</DropdownMenuLabel>
                    
                    <DropdownMenuItem 
                        className="cursor-pointer px-4"
                    >
                        <div className="flex items-center gap-3 py-2">
                            <Zap size={20} className="text-black dark:text-neutral-200"/>
                            <div className="flex flex-col items-start">
                                <p className="text-black dark:text-neutral-200">GPT-3.5</p>
                                <p className="text-[14px] font-normal text-neutral-400">Great for evenryday tasks</p>
                            </div>
                        </div>
                    </DropdownMenuItem>


                    <DropdownMenuItem className="cursor-pointer px-4">
                        <div className="flex items-center gap-3 py-2">
                            <Sparkles size={34} className="text-black dark:text-neutral-200"/>
                            <div className="flex flex-col items-start">
                                <p className="text-black dark:text-neutral-200">GPT-4</p>
                                <p className="text-[14px] font-normal text-neutral-400">Our smartest and most capable model. Includes DALL·E, browsing and more.</p>
                                <Button 
                                    className="w-full text-[12px] mt-2 bg-[#AC68FD] shadow-none"
                                    onClick={() => onOpen('pricingModal')}
                                >
                                    Upgrade to plus
                                </Button>
                            </div>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator/>


                    <DropdownMenuItem className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            <MessageCircleDashed size={20} className="text-black dark:text-neutral-200"/>
                            <p className="text-black dark:text-neutral-200">Temporary chat</p>
                        </div>
                    </DropdownMenuItem>

                    {pathname.startsWith('/conversation/') && (
                        <>
                            <DropdownMenuSeparator/>

                            <DropdownMenuItem 
                                className="px-4 py-3 cursor-pointer"
                                //@ts-ignore
                                onClick={() => onOpen('shareModal', shareModalProps)}
                            >
                                <div className="flex items-center gap-2">
                                    <Upload size={20} className="text-black dark:text-neutral-200"/>
                                    <p className="text-black dark:text-neutral-200">Share chat</p>
                                </div>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
   ) 
}