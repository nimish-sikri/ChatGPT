"use client"

import { Button } from "../ui/button"
import { useRouter } from "next/navigation";

export const ShareFooterButton = () => {

    const router = useRouter();

    return (
        <Button
            onClick={() => router.push('/')}
            className="h-14 rounded-xl"
        >
            Get started with ChatGPT
        </Button>
    )
}