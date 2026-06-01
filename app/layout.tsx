import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { DiyaAIProvider } from "@/hooks/useDiyaAI";
import CursorGlow from "@/components/layout/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Diya.OS | AI-Native Portfolio",
  description:
    "Diya Rawat — AI Engineer, Data Scientist, and ML Researcher. Building intelligent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-[#131315] text-on-surface antialiased">
        <DiyaAIProvider>
          {children}
          <CursorGlow />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1f1f21",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e4e2e4",
              },
            }}
          />
        </DiyaAIProvider>
      </body>
    </html>
  );
}
