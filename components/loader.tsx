"use client"

import animationData from '@/public/assets/animations/loader.json'
import Lottie from "lottie-react";

export const Loader = () => {
    return (
        <Lottie animationData={animationData}/>
    )
}