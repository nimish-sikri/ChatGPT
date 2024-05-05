"use client"


import { Copy, Link } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react";
import createShareLink from "@/actions/create-sharelink";
import { trimTextWithDots } from "@/lib/trim-text-with-dots";
import toast from "react-hot-toast";
import axios from "axios";

interface ShareFieldProps{
    conversationId: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    loaded: boolean; 
    setLoaded: (loaded: boolean) => void; 
}

export const ShareField = ({
    conversationId,
    setLoading,
    loading,
    loaded,
    setLoaded,
} : ShareFieldProps) => {

    const [link, setLink] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        return () => {
            setLoaded(false);
        };
    }, [setLoaded]);
    
    const fetchShareLink = async () => {
        setLoading(true);
        try {
            const share = await axios.post(`/api/sharelink/${conversationId}`);
            if (share && share.data) {
                setLink(share.data.id);
                await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/share/${share.data.id}`);
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
                setLoaded(true);
            }
        } catch (error: any) {
            console.log(error);
            toast.error('Error');
        } finally {
            setLoading(false);
        }
    }


    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/share/${link}`);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
            setLoaded(true);
        } catch (error) {
            console.error('Unable to copy to clipboard:', error);
            toast.error('Failed to copy link');
        }
    };




    return (
        <div className="w-full h-full">
            <div className="h-full w-full rounded-xl border-[1px] border-neutral-200 dark:border-neutral-600 flex items-center justify-between px-2">
                <div 
                    className="w-[65%] text-md h-full rounded-lg border-none flex items-center px-2"
                >
                    <p className={`
                        ${link ? 'text-black dark:text-white' : 'text-neutral-400 opacity-50'}
                    `}>
                        {link ? trimTextWithDots(`${process.env.NEXT_PUBLIC_APP_URL}/share/${link}`, 35) : `${process.env.NEXT_PUBLIC_APP_URL}/share/...`}
                    </p>
                </div>
                
                {copied ? (
                    <Button 
                        className="p-6 px-4 rounded-xl flex items-center gap-2"
                        disabled
                    >
                        <Copy size={15}/>
                        <p>Copied</p>
                    </Button>
                ) : link ? (
                    <Button 
                        className="p-6 px-4 rounded-xl flex items-center gap-2"
                        disabled={copied}
                        onClick={copyToClipboard}
                    >
                        <Copy size={15}/>
                        <p>Copy link</p>
                    </Button>
                ) : (
                    <Button 
                        className="p-6 px-4 rounded-xl flex items-center gap-2"
                        disabled={loading}
                        onClick={fetchShareLink}
                    >
                        <Link size={15}/>
                        <p>{loading ? 'Copying' : 'Share link'}</p>
                    </Button>
                )}
            </div>
        </div>
    )
}