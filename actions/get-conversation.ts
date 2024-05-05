"use server"

import getCurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function getConversation(
    conversationId: string
) {
    try {
        const currentUser = await getCurrentProfile();

        if (!currentUser) {
            return null;
        }

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId,
            },
        });

        if (!conversation) {
            return null;
        }

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
