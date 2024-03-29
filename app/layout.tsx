import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import LeftPanel from "@/components/LeftPanel";
import ThemeProvider from "@/components/Themes/ThemeProvider";
import { cookies } from "next/headers";
import clsx from "clsx";
import TopPanel from "@/components/TopPanel";
import { Toaster } from "@/components/ui/toaster";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("theme")?.value;
  const currentStyle = clsx({
    light: theme === "light",
    dark: theme === "dark",
  });
  return (
    <ThemeProvider currentTheme={theme!}>
      <html lang="en" className={currentStyle}>
        <body className={ibm.className}>
          <div className="w-full min-w-[355px] flex flex-col lg:flex-row relative">
            <TopPanel />
            <LeftPanel />
            <main className="h-full w-full dark:bg-slate-800 px-5 md:px-9 py-9">
              <div className="max-w-[1500px] m-auto">{children}</div>
            </main>
            <Toaster />
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
