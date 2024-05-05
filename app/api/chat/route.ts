import getCurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        const currentUser = await getCurrentProfile();

        const newConversation = await db.conversation.create({
            data: {
                title: messages,
                userId: currentUser.id,
            }
        });

        const userMessage = await db.message.create({
            data: {
                body: messages,
                conversationId: newConversation.id,
            }
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: messages }],
        });
        const replyMessage = response.choices[0].message.content;
        
        const gptReply = await db.message.create({
            data: {
                body: replyMessage!,
                conversationId: newConversation.id,
                isAiReply: true,
            }
        });

        const responseData = {
            replyMessage,
            conversationId: newConversation.id,
        };

        return NextResponse.json(responseData, { headers: { "Content-Type": "application/json" } });

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
