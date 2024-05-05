import { Conversation } from "@prisma/client";
import { format } from 'date-fns';


interface conversation{
    conversation: Conversation;
}

const ShareHeader = ({
    conversation
} : conversation) => {

    return ( 
        <div className="w-full  h-[10rem] flex flex-col gap-4 items-center justify-center">
            <div className="py-7 flex flex-col gap-4 border-b-[1px] border-neutral-400 dark:border-neutral-400">
                <h1 className="text-4xl font-semibold text-black dark:text-white">{conversation.title}</h1>
                <p className="text-neutral-400 dark:text-neutral-400">{format(new Date(conversation.createdAt), "MMM do yyyy")}</p>
            </div>
            
        </div>
     );
}
 
export default ShareHeader;