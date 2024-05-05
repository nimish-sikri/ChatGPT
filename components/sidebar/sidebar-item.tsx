"use client"

import { useState, useEffect, useRef } from 'react';
import { Conversation } from "@prisma/client";
import axios from 'axios';
import { trimText } from '@/lib/trim-text';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Archive, Ellipsis, Pencil, Trash2, Upload } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import updateConversationTitle from '@/actions/update-conversation-title';

interface SidebarItemProps {
    isActive?: boolean;
    conversation: Conversation;
}

export const SidebarItem = ({
    isActive,
    conversation
}: SidebarItemProps) => {
    const [isTyping, setIsTyping] = useState(conversation.onceLoaded ? false : true);
    const [displayedText, setDisplayedText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(conversation.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const { onOpen } = useModal();
    const pathname = usePathname();


    const shareModalProps = {
        conversationId: conversation.id,
    }

    const handleRenameClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setIsEditing(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }


    const handleShareClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onOpen('shareModal', shareModalProps)
    }



    const deleteConversation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        axios.delete(`/api/conversation/${conversation.id}`)
        .then(() => {
            if(pathname.startsWith(`/conversation/${conversation.id}`)){
                router.push('/')
            }
            router.refresh();
        })
        .catch(() => {
            console.log('Error')
        })
    }

    const handleEditTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const handleEditTitleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log(newTitle)
        setIsEditing(false); 
        const response = await updateConversationTitle(
            conversation.id,
            newTitle
        )
        if(response == 'Ok'){
            router.refresh();
        }
    }







    useEffect(() => {
        if (!conversation.onceLoaded) {
            const text = conversation.title;
            let index = 0;
            const typingInterval = setInterval(() => {
                setDisplayedText(text.substring(0, index));
                index++;
                if (index > text.length) {
                    setIsTyping(false);
                    clearInterval(typingInterval);

                    axios.patch(`/api/conversation/${conversation.id}`)
                    .then(response => {
                        if (!response) {
                            throw new Error('Failed to update onceLoaded status');
                        }
                    })
                    .catch(error => {
                        console.error('Error updating onceLoaded status:', error);
                    });
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }
    }, [conversation]);

    useEffect(() => {
        setIsEditing(false); 
    }, [pathname]);

    return (
        <div 
            onClick={() => router.push(`/conversation/${conversation.id}`)}
            className={`
                p-2 w-full rounded-lg
                flex items-center justify-between
                ${isActive ? 'bg-[#ececec] dark:bg-[#212121]' : ''}
                group hover:bg-[#ececec] dark:hover:bg-[#212121] cursor-pointer
        `}>
            {isEditing ? (
                <form onSubmit={handleEditTitleSubmit}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={handleEditTitleChange}
                        ref={inputRef}
                        className="text-sm opacity-80 outline-blue-600 bg-transparent border-gray-400 flex items-center w-full"
                    />
                </form>
            ) : (
                <p className="text-sm opacity-80">
                    {isTyping ? displayedText : trimText(conversation.title)}
                </p>
            )}


            <div className={`flex items-center gap-2
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    
            `}>

                <div className=''>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Ellipsis size={20} className=''/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start' className="w-52">

                            <DropdownMenuItem 
                                className='flex items-center gap-2 cursor-pointer p-3'
                                onClick={handleShareClick}
                            >
                                <Upload size={18}/>
                                <p>Share</p>
                            </DropdownMenuItem>


                            <DropdownMenuItem 
                                onClick={handleRenameClick}
                                className='flex items-center gap-2 cursor-pointer p-3'
                            >
                                <Pencil size={18}/>
                                <p>Rename</p>
                            </DropdownMenuItem>


                            <DropdownMenuItem 
                                onClick={deleteConversation}
                                className='flex items-center gap-2 text-red-500 cursor-pointer p-3'
                            >
                                <Trash2 size={18}/>
                                <p>Delete</p>
                            </DropdownMenuItem>


                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div>
                    <Archive size={18}/>
                </div>

            </div>
        </div>
    )
}
