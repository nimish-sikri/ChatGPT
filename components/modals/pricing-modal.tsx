"use client"

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { PricingCard } from "../pricing-card";
import { Sparkles, Users } from "lucide-react";

const freeFeatures = [
    "Unlimited messages, interactions, and history", 
    "Access to our GPT-3.5 model", 
    "Access on Web, iOS, and Android"
];

const plusFeatures = [
    "Access to GPT-4, our most capable model", 
    "Browse, create, and use GPTs", 
    "Access to additional tools like DALL·E, Browsing, Advanced Data Analysis and more"
];

const teamFeatures = [
    "Higher message caps on GPT-4 and tools like DALL·E, Browsing, Advanced Data Analysis, and more", 
    "Create and share GPTs with your workspace", 
    "Admin console for workspace management",
    "Team data excluded from training by default."
];

export const PricingModal = () => {

    const { onOpen, isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "pricingModal";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95%] md:max-w-[900px] max-h-[95%] md:max-h-[800px] px-0">
                <DialogHeader className="flex px-5 mt-2 mb-3 text-black dark:text-white">
                    <DialogTitle className="font-semibold">Upgrade your plan</DialogTitle>
                </DialogHeader>
                <div className="h-[65%] md:h-full">
                    <div className="h-[1px] bg-neutral-200 dark:bg-neutral-600"/>
                    <div className="flex overflow-y-scroll flex-col md:flex-row items-center h-[90%]  overflow-hidden">
                        <PricingCard
                            title="Free"
                            price='USD $20/month'
                            actionLabel="Your current plan"
                            color="bg-[#f9f9f9] dark:bg-[#4B4B4B] dark:text-neutral-400"
                            tagline="For people just getting started with ChatGPT"
                            className=""
                            disabled={true}
                            textColor="black"
                            features={freeFeatures}
                        />
                        <PricingCard
                            title="Plus"
                            price='USD $20/month'
                            actionLabel="Upgrade to Plus"
                            color="bg-[#4FA480]"
                            className="border-r-[1px] border-l-[1px]"
                            tagline="Everything in Free, and:"
                            icon= {
                                <Sparkles size={18} className="text-[#4FA480]"/>
                            }
                            features={plusFeatures}
                        />
                        <PricingCard
                            title="Team"
                            price='USD $25 per person/month'
                            actionLabel="Upgrade to Team"
                            color="bg-[#0167DF]"
                            tagline="Everything in Plus, and:"
                            icon= {
                                <Users size={18} className="text-[#0168E0]"/>
                            }
                            features={teamFeatures}
                        />
                    </div>
                    <div className="h-[1px] bg-neutral-200 dark:bg-neutral-600"/>
                    <div>
                        <p className="text-center mt-5 text-sm text-black dark:text-white">Need more capabilities? <span className="underline underline-offset-2">See ChatGPT Enterprise</span></p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}