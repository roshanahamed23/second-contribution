import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css"
export const metadata: Metadata = {
  title: "MysteryMessage",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
         <body className={inter.className}>
          <Navbar></Navbar>
          {children}<Toaster /></body>
      </AuthProvider>
      
    </html>
  );
}
