import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
import ProfileService from "@/lib/current-profile";
import getCurrentProfile from "@/lib/current-profile";
import { ChatSection } from "@/components/chat/chat-section";
import { SideBar } from "@/components/sidebar/sidebar";
import { MessageProvider } from "@/contexts/message-provider";
import getConversations from "@/actions/get-conversations";
import { ChatSectionMobile } from "@/components/chat/chat-section-mobile";
import ToasterProvider from "@/providers/toaster-provider";


export default async function ConversationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentProfile();
  const conversations = await getConversations();

  return (
    
      <div className={`h-screen overflow-hidden`}>
        <ModalProvider currentUser={currentUser}/>
        {children}
      </div>
    
  );
}
