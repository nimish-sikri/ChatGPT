import { db } from "@/lib/db";

interface IParams {
    shareId?: string;
}

export default async function getConversationByShareId (params: IParams) {
    try {
        const { shareId } = params;
        console.log(shareId)

        const chatShare = await db.sharelink.findUnique({
            where: {
                id: shareId
            }
        })

        if(!chatShare){
            return null;
        }

        const conversation = await db.conversation.findUnique({
            where: {
                id: chatShare.conversationId!,
            }
        })

        return conversation;
        
    } catch (error : any) {
        if (error instanceof Error) {
            console.error(error.message);
            return new Response(error.message, { status: 500 });
        } else {
            console.error(error.message);
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}