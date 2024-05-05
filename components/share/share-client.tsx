import { Message } from "@prisma/client"
import { ShareMessage } from "./share-message";

interface ShareClientProps{
    messages: Message[];
}

export const ShareClient = ({
    messages,
} : ShareClientProps) => {

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index} className="mb-10">
                    <ShareMessage key={index} message={message} />
                </div>
            ))}
        </div>
    )
}