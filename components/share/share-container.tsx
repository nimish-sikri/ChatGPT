interface ShareContainerProps{
    children: React.ReactNode
}

export const ShareContainer = ({
    children,
} : ShareContainerProps) => {
    return (  
        <div className="w-full h-full px-3 md:px-[20%]">
            <div className="h-full w-full">
                {children}
            </div>
        </div>
    );
}
 