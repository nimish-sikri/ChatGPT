import CardWraper from "@/components/auth/card-wrapper";
import { ThemeProvider } from "@/providers/theme-provider";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="h-screen w-full flex items-center">
        <div className="h-full w-[60%] bg-red-400 relative">
            <Image
                src={'/assets/images/auth.png'}
                alt="auth"
                layout="fill"
            />
        </div>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <div className="h-full w-[40%] dark:bg-black bg-white transition-colors duration-100 flex items-center justify-center">
                <CardWraper>
                  {children}
                </CardWraper>
            </div>
        </ThemeProvider>
      </div>
  );
}
