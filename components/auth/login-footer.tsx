"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const LoginFooter = () => {

    const router = useRouter();

    return (
        <div className="w-full h-auto flex flex-col items-center gap-2">
            <Button className="py-6 w-full cursor-pointer">
                Login
            </Button>
            <p 
              className="hover:underline underline-offset-8 cursor-pointer text-black dark:text-white"
              onClick={() => router.push('/register')}
            >
                New to ChatGpt?
            </p>
        </div>
    )
}