"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const RegisterFooter = () => {

    const router = useRouter();

    return (
        <div className="w-full h-auto flex flex-col items-center gap-2">
            <Button className="py-6 w-full cursor-pointer">
                Sign up
            </Button>
            <p 
              className="hover:underline underline-offset-8 cursor-pointer text-black dark:text-white"
              onClick={() => router.push('/login')}
            >
                Already have an account?
            </p>
        </div>
    )
}