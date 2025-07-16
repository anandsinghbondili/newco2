import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SonnerToaster } from "@/components/ext/window/Toaster";
import { Providers } from './providers';

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  );
}