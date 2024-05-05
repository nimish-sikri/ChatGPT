import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


interface IParams {
    conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try {

        const { conversationId } = params;
        const body = await request.json();
        const { messages } = body;

        const userMessage = await db.message.create({
            data: {
                body: messages,
                conversationId: conversationId,
            }
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: messages }],
        });
        const replyMessage = response.choices[0].message.content;
        console.log(replyMessage)
        
        const gptReply = await db.message.create({
            data: {
                body: replyMessage!,
                conversationId: conversationId,
                isAiReply: true,
            }
        });

        const responseData = {
            replyMessage,
        };

        return NextResponse.json(responseData, { headers: { "Content-Type": "application/json" } });


    } catch (error : any) {
        if (error instanceof Error) {
            console.log(error.message)
            return new Response(error.message, { status: 500 });
        } else {
            console.log(error.message)
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
    try {

        const { conversationId } = params;

        const newConversation = await db.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                onceLoaded: true,
            }
        })

        return new Response('Conversation marked as loaded', { status: 200 });


    } catch (error : any) {
        if (error instanceof Error) {
            console.log(error.message)
            return new Response(error.message, { status: 500 });
        } else {
            console.log(error.message)
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try {

        const { conversationId } = params;

        await db.conversation.delete({
            where: {
                id: conversationId,
            }
        })

        return new Response('Conversation successfully deleted', { status: 200 });

    } catch (error : any) {
        if (error instanceof Error) {
            console.log(error.message)
            return new Response(error.message, { status: 500 });
        } else {
            console.log(error.message)
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}