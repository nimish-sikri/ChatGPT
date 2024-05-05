interface ChatContainerProps{
    children?: React.ReactNode;
}

export const ChatContainer: React.FC<ChatContainerProps> =({
    children
}) => {
    return (
        <div className="w-full h-full px-4 md:px-[15%]">
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    )
}