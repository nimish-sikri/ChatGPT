"use client"


import { ArrowUp, Disc } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMessage } from "@/contexts/message-provider";
import { useParams, useRouter } from "next/navigation";

export const ConversationInput = () => {
    const textareaRef = useRef(null);
    const params = useParams();
    const { conversationId } = useParams();
    const router = useRouter();

    const { setMessage, setLoading, setReply, loading } = useMessage();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            text: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        reset();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const message = data.text;
        
        setLoading(true);
        const requestData = {
            messages: message
        };
        setMessage(message);
        setLoading(true);
        const response = await axios.post(`/api/conversation/${conversationId}`, requestData, axiosConfig);
        if(response){
            router.refresh();
            setReply(response.data);
            setLoading(false);
        }
    }

    return (
        <div className="w-full dark:border-neutral-700 border-neutral-200 shadow-sm border-[1px] py-2 px-4 pr-2 flex items-center justify-between gap-2 rounded-xl">
            <div className="relative w-full">
                <Input 
                    placeholder="Message ChatGPT" 
                    className="border-none resize-none shadow-none px-1 focus-visible:ring-transparent border-0 focus:ring-0 tet-black dark:text-white"
                    {...register("text")} 
                />
            </div>
            {loading ? (
                <Disc size={30}/>
            ) : (
                <Button 
                    onClick={handleSubmit(onSubmit)}
                    className="dark:bg-white bg-black p-2 text-white dark:text-black rounded-xl"
                >
                    <ArrowUp />
                </Button>
            )}
            
        </div>
    );
};
