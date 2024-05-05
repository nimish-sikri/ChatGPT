import { ChatSection } from "@/components/chat/chat-section";
import { ChatClient } from "@/components/chat/chat-client";
import { SideBar } from "@/components/sidebar/sidebar";
import { useMessage } from "@/contexts/message-provider";
import getCurrentProfile from "@/lib/current-profile";
import Image from "next/image";
import { ChatSectionMobile } from "@/components/chat/chat-section-mobile";
import getConversations from "@/actions/get-conversations";
import { ModalProvider } from "@/providers/modal-provider";

export default async function Home() {

  const currentUser = await getCurrentProfile();
  const conversations = await getConversations();

  return (
    <div className="relative h-full w-full">
      <ModalProvider currentUser={currentUser}/>
      <div className="absolute inset-y-0 left-0">
        <SideBar 
          currentUser={currentUser} 
          //@ts-ignore
          conversations={conversations!}
        />
      </div>
      <div className="block md:hidden">
        <ChatSectionMobile currentUser={currentUser}/>
      </div>
      <div className="hidden md:block">
        <ChatSection currentUser={currentUser}/>
      </div>
    </div>
  );
}
