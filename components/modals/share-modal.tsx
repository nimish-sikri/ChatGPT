"use client"

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import { ChatsCard } from "../chats-card";
import createShareLink from "@/actions/create-sharelink";
import { useState } from "react";
import toast from "react-hot-toast";
import { ShareField } from "../share/share-field";
import { ShareFooter } from "./share-footer";


interface ShareModalProps{
    currentUser: any;
}

export const ShareModal = ({
    currentUser,
} : ShareModalProps) => {

    const { onOpen, isOpen, onClose, type, shareModalProps } = useModal();

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    if (!isOpen || !shareModalProps) {
        return null;
    }

    const { conversationId } = shareModalProps;
    const isModalOpen = isOpen && type === "shareModal";

    const setLoadingState = (value: boolean) => {
        setLoading(value);
    };


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95%] md:max-w-[550px] max-h-[95%] md:max-h-[900px] px-0">
                <DialogHeader className="flex px-6 mt-2 mb-3">
                    <DialogTitle className="font-semibold text-black dark:text-white">Share public link to chat</DialogTitle>
                </DialogHeader>
                <div className="h-[65%] md:h-full">
                    <div className="h-[1px] bg-neutral-200 dark:bg-neutral-600"/>
                    <div className="px-6 mt-6">
                        <p className="text-neutral-400">Your name and any messages you add after sharing stay private. <span className="underline underline-offset-2">Learn more</span></p>
                    </div>

                    <div className="w-full h-16 mt-5 flex items-center px-6">
                        <ShareField 
                            conversationId={conversationId} 
                            loading={loading} 
                            setLoading={setLoading}
                            loaded={loaded}
                            setLoaded={setLoaded}
                        />
                    </div>
                    {loaded && (
                        <div className="w-full h-20 mt-5">
                            <ShareFooter/>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}