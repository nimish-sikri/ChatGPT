import { LogOut, Settings, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface SidebarUserProps{
    currentUser: any;
}
export const SidebarUser = ({
    currentUser,
} : SidebarUserProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="w-full h-full px-2 py-2 flex items-center gap-2 rounded-md dark:hover:bg-[#212121] hover:bg-[#ececec] cursor-pointer">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{currentUser.name}</p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56 pt-3 text-opacity-45">
                <DropdownMenuLabel className="mb-3 font-normal text-[14px]">{currentUser.email}</DropdownMenuLabel>

                <DropdownMenuSeparator/>

                <DropdownMenuItem
                    className="cursor-pointer px-4 py-0"
                >
                    <div className="flex items-center gap-3 py-2">
                        <Settings/>
                        <p>Settings</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>

                <DropdownMenuItem
                    className="cursor-pointer px-4 py-0"
                >
                    <div className="flex items-center gap-3 py-2">
                        <LogOut/>
                        <p>Log out</p>
                    </div>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    )
}