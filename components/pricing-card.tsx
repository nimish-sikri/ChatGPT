import { ArrowUp, Check, Dot, Sparkle } from "lucide-react";
import { Button } from "./ui/button";

interface PricingCardProps {
    title: string;
    price: string;
    icon?: React.ReactNode;
    actionLabel: string;
    color: string;
    tagline: string;
    features?: string[];
    className?: string;
    disabled?: boolean;
    textColor?: string;
}

export const PricingCard = ({
    title,
    price,
    icon,
    actionLabel,
    color,
    tagline,
    features,
    className,
    disabled = false,
    textColor = 'white',
}: PricingCardProps) => {
    return (
        <div className={`h-full w-full flex flex-col gap-4 p-6 border-neutral-200 dark:border-neutral-600 ${className}`}>
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    {icon}
                    <h1 className="text-xl font-bold text-black dark:text-white">{title}</h1>
                </div>
                <h1 className="text-md text-neutral-400">{price}</h1>
            </div>

            <Button className={`w-full p-6 ${color} text-sm text-${textColor} shadow-none`} disabled={disabled}>
                {actionLabel}
            </Button>

            <div className="flex flex-col gap-2 text-black dark:text-white">
                <div>
                    <p className="text-sm mt-2 font-semibold">{tagline}</p>
                </div>
                {features && features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <p>✓</p>
                        <p key={index} className="text-[14px] opacity-70">{feature}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
