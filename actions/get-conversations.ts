import getCurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function getConversations() {
    try {
        const currentUser = await getCurrentProfile();

        if (!currentUser) {
            return null;
        }

        const conversations = await db.conversation.findMany({
            where: {
                userId: currentUser.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
            
        });

        if (!conversations) {
            return null;
        }

        return conversations;

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
