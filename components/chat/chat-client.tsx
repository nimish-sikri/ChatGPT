"use client";

import { useMessage } from "@/contexts/message-provider";
import Image from "next/image";
import { ChatItem } from "./chat-item";
import { Loader } from "../loader";
import { DemoCard } from "../demo-card";
import { motion } from "framer-motion";

interface ChatClientProps {
    currentUser: any;
}

export const ChatClient = ({
    currentUser
}: ChatClientProps) => {
    const { message, loading, reply } = useMessage();
    console.log(message);

    return (
        <>
            {message ? (
                <>
                    <ChatItem name="You" currentUser={currentUser} body={message}/>
                    {loading ? (
                        <div className="h-20 w-20 mt-10 -ml-5">
                            <Loader/>
                        </div>
                    ) : (
                        <div className="mt-10">
                            <ChatItem name="ChatGPT" currentUser={currentUser} body={reply!}/>
                        </div>
                    )}
                </>
            ) : (
                <div className="relative w-full h-[97%] flex flex-col items-center justify-between ">
                    <div className="w-full h-[70%] flex flex-col gap-4 items-center justify-center">
                        <div className='mt-20 p-2 block dark:hidden rounded-full bg-white border-[1px] border-neutral-300'>
                            <Image
                                src={'/assets/images/icon_black.png'}
                                alt='icon'
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className='mt-20 p-2 hidden dark:block rounded-full bg-transparent border-[1px] border-neutral-700'>
                            <Image
                                src={'/assets/images/icon_white.png'}
                                alt='icon'
                                width={30}
                                height={30}
                            />
                        </div>
                        <h1 className="text-2xl font-semibold text-black dark:text-white">How can I help you today?</h1>
                    </div>

                    <div className="
                        w-full 
                        absolute
                        bottom-1
                        
                    ">
                        
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } },
                                hidden: { transition: { staggerChildren: 0.1, staggerDirection: -1 } }
                            }}
                        >
                            {Array.from(Array(4).keys()).map((index) => (
                                <motion.div key={index} variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}>
                                    <DemoCard
                                        title="Write a short story"
                                        subtitle="tailored to my favorite genre"
                                        className="hidden md:block"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    );
};
