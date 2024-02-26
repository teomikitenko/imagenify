import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import LeftPanel from "@/components/LeftPanel";
import { ClerkProvider } from '@clerk/nextjs'


const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={ibm.className}>
        <div className="w-full flex">
          <LeftPanel />
          <main className="grow bg-slate-50 px-12 py-9 overflow-y-scroll">{children}</main>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
