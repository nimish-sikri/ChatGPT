"use server"

import { db } from "@/lib/db";


export default async function updateConversationTitle(
    conversationId : string,
    newTitle: string,
) {
    try {

        const updatedTitle = await db.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                title: newTitle
            }
        })

        return "Ok";

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