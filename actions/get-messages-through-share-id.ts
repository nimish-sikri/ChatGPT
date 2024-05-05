import { db } from "@/lib/db";

interface IParams {
    shareId?: string;
}

export default async function getMessagesThroughShareId (params: IParams) {
    try {
        const { shareId } = params;

        const share = await db.sharelink.findUnique({
            where: {
                id: shareId
            }
        })

        if(!share){
            return null;
        }

        const messages = await db.message.findMany({
            where: {
                conversationId: share.conversationId,
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