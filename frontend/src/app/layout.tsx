import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SonnerToaster } from "@/components/ext/window/RCXToaster";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Recaptix</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Providers>
          {children}
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  );
}
