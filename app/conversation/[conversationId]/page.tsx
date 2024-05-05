import getConversations from "@/actions/get-conversations";
import getMessagesByCOnversationId from "@/actions/get-messages-by-conversation-id";
import { ConversaionClient } from "@/components/conversation/conversation-page";
import { ConversationSection } from "@/components/conversation/conversation-section";
import { SideBar } from "@/components/sidebar/sidebar";
import getCurrentProfile from "@/lib/current-profile";

interface IParams{
    conversationId?: string;
}

const ConversationPage = async ({ 
    params 
}: {
    params: IParams 
}) => {

    const messages = await getMessagesByCOnversationId(params);
    const currentUser = await getCurrentProfile();
    const conversations = await getConversations();

    return ( 
        <div className="relative h-full w-full">
            <div className="absolute inset-y-0 left-0">
                <SideBar 
                currentUser={currentUser} 
                //@ts-ignore
                conversations={conversations!}
                />
            </div>
            {/* <div className="block md:hidden">
                <ChatSectionMobile children={children}/>
            </div> */}
            <div className="hidden md:block">
                
                <ConversationSection 
                    //@ts-ignore
                    messages={messages}
                    currentUser={currentUser}
                />
            </div>
        </div>
        
     );
}
export default ConversationPage;