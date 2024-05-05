"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"


interface FooterProps{
    actionLabel: string;
    secondaryActionLabel: string;
    route: string;
    formAction: any;
}
export const Footer = ({
    actionLabel,
    secondaryActionLabel,
    route,
    formAction,
} : FooterProps) => {

    const router = useRouter();
    return (
        <div className="w-full h-auto flex flex-col items-center gap-2">
            <Button 
                className="py-6 w-full cursor-pointer"
                formAction={formAction}
            >
                {actionLabel}
            </Button>
            <p 
              className="hover:underline underline-offset-8 cursor-pointer text-black dark:text-white font-light mt-2 opacity-70"
              onClick={() => router.push(`/${route}`)}
            >
                {secondaryActionLabel}
            </p>
        </div>
    )
}