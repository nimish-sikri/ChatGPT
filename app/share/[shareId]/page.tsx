import getConversationByShareId from "@/actions/get-conversation-by-share-id";
import getMessagesByCOnversationId from "@/actions/get-messages-by-conversation-id";
import getMessagesThroughShareId from "@/actions/get-messages-through-share-id";
import { ShareClient } from "@/components/share/share-client";
import { ShareContainer } from "@/components/share/share-container";
import { ShareFooterButton } from "@/components/share/share-footer-button";
import ShareHeader from "@/components/share/share-header";
import { Button } from "@/components/ui/button";

interface IParams{
    shareId?: string;
}

const SharedPage = async ({ 
    params 
}: {
    params: IParams 
}) => {

    const conversation = await getConversationByShareId(params)
    //@ts-ignore
    const messages = await getMessagesThroughShareId(params);
    console.log(messages)

    return ( 
        <div className="w-full h-full">
            <ShareContainer>
                <div className="w-full h-full flex flex-col ">
                    <div className="w-full h-[87%] overflow-hidden overflow-y-scroll no-scrollbar">
                       <ShareHeader 
                            //@ts-ignore
                            conversation={conversation}
                        /> 
                        <ShareClient 
                            //@ts-ignore
                            messages={messages}
                        />
                    </div>
                    <div className="w-full h-[13%] flex flex-col items-center justify-center gap-1">
                        <ShareFooterButton/>
                        <p className="text-[12px] text-neutral-400">Report content  |  Terms of use  |  Privacy policy</p>
                    </div>
                    
                </div>
                
            </ShareContainer>
        </div>
     );
}
 
export default SharedPage;