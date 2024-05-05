interface DemoCardProps{
    title: string;
    subtitle: string;
    className?: string;
}

export const DemoCard = ({
    title,
    subtitle,
    className
} : DemoCardProps) => {
    return (
        <div className={className}>
            <div className="h-16 w-full border-[1px] border-neutral-200 dark:border-neutral-700 rounded-xl flex flex-col items-start justify-center px-4">
                <p className="text-[14px] font-semibold text-black dark:text-neutral-200">{title}</p>
                <p className="text-[14px] font-normal text-neutral-400 dark:text-neutral-500">{subtitle}</p>
            </div>
        </div>
    )
}