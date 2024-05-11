'use client'

import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI as string
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

useEffect(()=> {
  socketId.on("connection", () => {});
},[])


  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 `}>
       <Providers>
       
       <SessionProvider>
       <ThemeProvider attribute="class" defaultTheme='system' enableSystem >
       
        {children}
        <Toaster position="top-center" reverseOrder={false} />
       </ThemeProvider>
       </SessionProvider>
       
       </Providers>
        </body>
    </html>
  );
}
