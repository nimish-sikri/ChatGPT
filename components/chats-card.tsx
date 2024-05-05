import getMessages from "@/actions/get-messages";
import { Loader } from "./loader"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChatItem } from "./chat/chat-item";
import getConversation from "@/actions/get-conversation";
import { Pen } from "lucide-react";
import { format } from "date-fns";

interface Message {
    body: string;
    conversationId: string;
    createdAt: Date;
    id: string;
    isAiReply: boolean;
    updatedAt: Date;
}

interface ChatsCardProps {
    conversationId: string;
    currentUser: any,
}

export const ChatsCard = ({
    conversationId,
    currentUser,
}: ChatsCardProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true); 
            try {
                const response = await getMessages(conversationId);
                //@ts-ignore
                setMessages(response);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false); 
            }
        };

        const fetchConversation = async () => {
            setLoading(true); 
            try {
                const response = await getConversation(conversationId);
                //@ts-ignore
                setTitle(response.title);
                //@ts-ignore
                setDate(response.createdAt);
            } catch (error) {
                console.error("Error fetching conversation:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchMessages();
        fetchConversation();

        return () => {
        };
    }, [conversationId]);

    if(loading) {
        return (
            <div className="w-full border-[1px] border-neutral-300 dark:border-neutral-500 flex flex-col h-full rounded-xl shadow-xl overflow-hidden">
                <div className="h-[75%] px-4 flex items-center justify-center overflow-hidden overflow-y-scroll">
                    <div className="h-20 w-20">
                        <Loader />
                    </div>
                </div>
                <div className="bg-[#ececec] dark:bg-[#424242] h-[25%] px-4 flex items-center">
                    <div className="flex items-start flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <p className="text-black dark:text-white opacity-80">{title}</p>
                            {title && (
                        <Pen size={16} className="text-black dark:text-white opacity-80"/>
                            )}
                        </div>
                        {date && (
                            <p className="text-neutral-400 dark:text-neutral-400">{format(new Date(date), "MMM do yyyy")}</p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full border-[1px] border-neutral-300 dark:border-neutral-500 flex flex-col h-full rounded-xl shadow-xl overflow-hidden">
            <div className="h-[75%] px-4 flex overflow-hidden overflow-y-scroll">
                {loading ? (
                    <div className="h-20 w-20">
                        <Loader />
                    </div>
                ) : (
                    <div>
                        {messages.map((message, index) => (
                            <>
                                {message.isAiReply ? (
                                    <div className="mt-4 mb-6">
                                        <ChatItem name="ChatGPT" currentUser={currentUser} body={message.body}/>
                                    </div>
                                ) : (
                                    <div className="mt-4 mb-4">
                                        <ChatItem name="You" currentUser={currentUser} body={message.body}/>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-[#ececec] dark:bg-[#424242] h-[25%] px-4 flex items-center">
                <div className="flex items-start flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <p className="text-black dark:text-white opacity-80">{title}</p>
                        {title && (
                    <Pen size={16} className="text-black dark:text-white opacity-80"/>
                        )}
                    </div>
                    {date && (
                        <p className="text-neutral-400 dark:text-neutral-400">{format(new Date(date), "MMM do yyyy")}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
