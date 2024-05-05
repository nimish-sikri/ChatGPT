
interface ShareSocialProps{
    icon: React.ReactNode;
    label: string;
    className?: string
}

export const ShareSocial = ({
    icon,
    label,
    className
} : ShareSocialProps) => {
    return (
        <div className="w-12 h-16 gap-1 flex flex-col items-center justify-center">
            <div className={`
                bg-[#ececec]
                dark:bg-[#424242]
                text-[#9B9B9B] 
                dark:text-[#E3E3E3]
                flex 
                items-center 
                justify-center 
                rounded-full 
                w-10 
                h-10
                hover:text-white
                cursor-pointer
                ${className}
            `}>
                {icon}
            </div>
            <p className="text-[12px] text-[#9B9B9B] dark:text-[#E3E3E3]">{label}</p>
        </div>
    )
}