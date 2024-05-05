"use client"

import { Message } from "@prisma/client"
import { ConversationMessage } from "./conversation-message";
import { useMessage } from "@/contexts/message-provider";
import { ChatItem } from "../chat/chat-item";
import { Loader } from "../loader";

interface ConversaionClientProps{
    messages: Message[];
    currentUser: any;
}

export const ConversaionClient = ({
    messages,
    currentUser,
} : ConversaionClientProps) => {

    const currLength = messages.length;

    const { message, reply, loading } = useMessage();

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index} className="mb-10">
                    <ConversationMessage key={index} message={message} />
                </div>
            ))}
            {loading && (
                <div className="h-20 w-20 mt-10 -ml-5">
                    <Loader/>
                </div> 
            )}
        </div>
    )
}