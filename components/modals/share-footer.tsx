import { FaLinkedin, FaFacebook, FaRedditAlien } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ShareSocial } from "./share-social";

export const ShareFooter = () => {
    return (
        <div className="w-full h-full flex items-center px-20 py-2">
            <div className="h-full w-full flex items-center justify-between">
                <ShareSocial
                    icon={<FaLinkedin size={20}/>}
                    label="Linkedin"
                    className="hover:bg-[#0077b5] hover:dark:bg-[#0077b5]"
                />

                <ShareSocial
                    icon={<FaFacebook size={20}/>}
                    label="Facebook"
                    className="hover:bg-[#1877F2] hover:dark:bg-[#1877F2]"
                />

                <ShareSocial
                    icon={<FaRedditAlien size={20}/>}
                    label="Reddit"
                    className="hover:bg-[#FF5700] hover:dark:bg-[#FF5700]"
                />

                <ShareSocial
                    icon={<FaXTwitter size={18}/>}
                    label="X"
                    className="hover:bg-black hover:dark:bg-black"
                />
            </div>
        </div>
    )
}