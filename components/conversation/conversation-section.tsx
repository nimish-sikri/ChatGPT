"use client"

import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useEffect, useState, useRef } from "react"
import { Upload } from "lucide-react"
import { Input } from "../ui/input"
import { useParams, usePathname } from "next/navigation"
import { ConversationInput } from "../conversation/conversation-input"
import { useMessage } from "@/contexts/message-provider"
import { useModal } from "@/hooks/use-modal-store"
import { ChatSectionHeader } from "../chat/chat-section-header"
import { ChatContainer } from "../chat/chat-container"
import { ChatInput } from "../chat/chat-input"
import { ConversaionClient } from "./conversation-page"
import { Message } from "@prisma/client"


interface ConversationSectionProps{
    currentUser: any;
    messages: Message[];
}

export const ConversationSection = ({
    currentUser,
    messages,
} : ConversationSectionProps) => {

    const [toggleFullView, setToggleFullView] = useState(false);
    const [width, setWidth] = useState('18vw');
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
        setWidth(toggleFullView ? '0vw' : '18vw');
    }, [toggleFullView]);

    

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    

    const toggleView = () => {
        setToggleFullView(!toggleFullView);
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="absolute inset-0 z-10 bg-white dark:bg-[#212121] right-0 transition-all duration-300 ease-in-out" style={{ left: width }}>
            <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2">
                <Button className="absolute border-none shadow-none bg-transparent hover:bg-transparent" variant='outline' onClick={toggleView}>
                    <ChevronLeftIcon/>
                </Button>
            </div>

            <div className="w-full h-full flex flex-col items-center">
                <div className="w-full px-4 h-[8%] flex items-center justify-between">
                    <ChatSectionHeader/>
                    <Button 
                        //@ts-ignore
                        onClick={() => onOpen("shareModal", shareModalProps)}
                        variant={'outline'} 
                        className="px-2 bg-transparent border-neutral-300 dark:border-neutral-700 rounded-lg dark:text-white text-black"
                    >
                        <Upload size={20}/>
                    </Button>
                </div>

                <div className="w-full h-[92%]">
                    <ChatContainer>
                        <div className="w-full h-full flex flex-col">
                            <div className="w-full h-[87%] px-10 pt-4 overflow-hidden overflow-y-scroll no-scrollbar">
                                <ConversaionClient
                                    //@ts-ignore
                                    messages={messages}
                                    currentUser={currentUser}
                                />
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="w-full h-[13%]">
                                <ConversationInput/>
                                <p className="mt-2 text-[13px] text-neutral-400 text-center">ChatGPT can make mistakes. Consider checking important information.</p>
                            </div>
                            
                        </div>
                    </ChatContainer>
                </div>

            </div>
        </div>
    )
}
