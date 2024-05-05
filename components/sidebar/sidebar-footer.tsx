"use client"

import { useModal } from "@/hooks/use-modal-store"
import { Sparkles } from "lucide-react"

export const SidebarFooter = () => {

    const { onOpen } = useModal();

    return (
        <div 
            onClick={() => onOpen('pricingModal')}
            className="w-full h-full px-2 py-2 flex items-center gap-2 rounded-md dark:hover:bg-[#212121] hover:bg-[#ececec] cursor-pointer"
        >
            <Sparkles className="p-1 rounded-full border-[1px] border-neutral-300 dark:border-neutral-700" size={28}/>
            <div className="flex flex-col items-start">
                <p className="text-sm">Upgrade plan</p>
                <p className="text-[11px] text-neutral-400">Get GPT-4, DALL·E, and more</p>
            </div>
        </div>
    )
}