import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatItemProps {
    currentUser: any;
    name: string;
    body: string;
}

export const ChatItem = ({
    currentUser,
    name,
    body
}: ChatItemProps) => {
    return (
        <div className="w-full h-auto flex items-start gap-3">
            <div className="w-[4%]">
                {(name === 'You') ? (
                    <Avatar className="h-full w-full mt-1">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                ) : (
                    <>
                        <div className='p-1 block dark:hidden rounded-full bg-white border-1 border-neutral-300 mt-1'>
                            <Image
                                src={'/assets/images/icon_black.png'}
                                alt='icon'
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className='p-1 hidden dark:block rounded-full bg-neutral-700 border-1 border-neutral-700 mt-1'>
                            <Image
                                src={'/assets/images/icon_white.png'}
                                alt='icon'
                                width={25}
                                height={25}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="w-[96%] flex flex-col">
                <p className="text-black dark:text-white font-semibold">{name}</p>
                <p className="text-black dark:text-white font-light">{body}</p>
            </div>
        </div>
    );
};
