"use client"

import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useEffect, useState, useRef } from "react"
import { ChatSectionHeader } from "./chat-section-header"
import { Upload } from "lucide-react"
import { ChatContainer } from "./chat-container"
import { Input } from "../ui/input"
import { ChatInput } from "./chat-input"
import { useParams, usePathname } from "next/navigation"
import { ConversationInput } from "../conversation/conversation-input"
import { useMessage } from "@/contexts/message-provider"
import { useModal } from "@/hooks/use-modal-store"
import { ChatClient } from "./chat-client"

interface ChatSectionMobileProps{
    currentUser: any;
}

export const ChatSectionMobile = ({
    currentUser
} : ChatSectionMobileProps) => {

    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { message } = useMessage();
    const { onOpen } = useModal();
    const params = useParams();
    const { conversationId } = params;

    const shareModalProps = {
        conversationId: conversationId,
    };


    useEffect(() => {
        scrollToBottom();
    }, [message]);


    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="absolute inset-0 z-10 bg-white dark:bg-[#212121] right-0 transition-all duration-300 ease-in-out" style={{ left: '0' }}>
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-full px-4 h-[8%] flex items-center justify-between border-b-[1px] border-neutral-600">
                    <ChatSectionHeader/>
                    {pathname.startsWith('/conversation') && (
                        <Button 
                            //@ts-ignore
                            onClick={() => onOpen("shareModal", shareModalProps)}
                            variant={'outline'} 
                            className="px-2 bg-transparent border-neutral-300 dark:border-neutral-700 rounded-lg dark:text-white text-black"
                        >
                            <Upload size={20}/>
                        </Button>
                    )}
                </div>

                <div className="w-full h-[92%] overflow-hidden">
                    <ChatContainer>
                        <div className="w-full h-full flex flex-col">
                            <div className="w-full h-[87%] px-10 pt-4 overflow-hidden overflow-y-scroll no-scrollbar">
                                <ChatClient currentUser={currentUser}/>
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="w-full h-[13%]">
                                {(pathname.startsWith('/conversation')) ? (
                                    <ConversationInput/>
                                ) : (
                                    <ChatInput/>
                                )}
                                <p className="mt-2 text-[13px] text-neutral-400 text-center">ChatGPT can make mistakes. Consider checking important information.</p>
                            </div>
                            
                        </div>
                    </ChatContainer>
                </div>

            </div>
        </div>
    )
}
