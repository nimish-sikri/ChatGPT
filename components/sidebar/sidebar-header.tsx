"use client"

import { useMessage } from '@/contexts/message-provider';
import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const SidebarHeader = () => {

    const router = useRouter();
    const { setMessage, setReply, setLoading } = useMessage();

    const handleClick = () => {
        setMessage('');
        setReply('');
        setLoading(false);
        router.push('/')
        router.refresh();
    }

    return (
        <div 
            onClick={handleClick}
            className="w-full h-full flex items-center justify-between text-sm px-2 dark:hover:bg-[#212121] hover:bg-[#ececec] cursor-pointer rounded-lg">
            <div className='font-semibold flex gap-2 items-center'>
                <div className='p-1 block dark:hidden rounded-full bg-white border-1 border-neutral-300'>
                    <Image
                        src={'/assets/images/icon_black.png'}
                        alt='icon'
                        width={20}
                        height={20}
                    />
                </div>
                <div className='p-1 hidden dark:block rounded-full bg-neutral-700 border-1 border-neutral-700'>
                    <Image
                        src={'/assets/images/icon_white.png'}
                        alt='icon'
                        width={20}
                        height={20}
                    />
                </div>
                <p>New chat</p>
            </div>
            <div>
                <SquarePen size={20} />
            </div>
        </div>
    )
}