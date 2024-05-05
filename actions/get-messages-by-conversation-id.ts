import { db } from "@/lib/db";

interface IParams {
    conversationId?: string;
}

export default async function getMessagesByCOnversationId (params: IParams) {
    try {
        const { conversationId } = params;

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            }
        })

        if(!conversation){
            return null;
        }

        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId,
            }
        })

        return messages;
        
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