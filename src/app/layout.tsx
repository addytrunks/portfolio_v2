import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TerminalLayout from "@/components/layout/TerminalLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Adhithya Srivatsan | Portfolio",
  description: "Web Developer & Aspiring Data Scientist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-mono antialiased bg-black text-white`}>
        <TerminalLayout>
          {children}
        </TerminalLayout>
      </body>
    </html>
  );
}
