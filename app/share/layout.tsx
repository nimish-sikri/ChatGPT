import getConversations from "@/actions/get-conversations";
import getCurrentProfile from "@/lib/current-profile";

export default async function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    
      <div className={`w-full h-screen overflow-hidden`}>
        {children}
      </div>
    
  );
}