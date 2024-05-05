interface SidebarTagProps{
    label: string
}

export const SidebarTag = ({
    label,
} : SidebarTagProps) => {

    return (
        <div>
            <p className="px-2 text-[12px] text-neutral-400">{label}</p>
        </div>
    )
}