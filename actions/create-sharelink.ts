'use server'

import getCurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function createShareLink(
    conversationId: string
) {
    try {

        const currentUser = await getCurrentProfile();
        console.log(conversationId)

        if(!currentUser){
            return null;
        }

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            }
        })

        if(!conversation){
            return null;
        }

        const existingShareLink = await db.sharelink.findFirst({
            where: {
                conversationId: conversation.id,
            }
        });

        if(existingShareLink){
            return existingShareLink;
        }

        const shareLink = await db.sharelink.create({
            data: {
                conversationId: conversation.id,
            }
        });

        console.log(shareLink)

        return shareLink;

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