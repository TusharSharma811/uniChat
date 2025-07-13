import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Archivo , Archivo_Black } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "UniChat",
  description: "UniChat is a powerful real-time chat application designed for seamless global communication. With built-in instant message translation, UniChat lets you chat effortlessly with anyone, anywhere — no language barrier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
