'use server'

import getCurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function getMessages(
    conversationId: string
) {
    try {

        const currentUser = await getCurrentProfile();

        if(!currentUser){
            return null;
        }

        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId
            },
            
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