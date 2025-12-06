import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TerminalLayout from "@/components/layout/TerminalLayout";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
	title: {
		default: "Adhithya Srivatsan | Portfolio",
		template: "%s | Adhithya Srivatsan",
	},
	description:
		"Portfolio of Adhithya Srivatsan, a Web Developer & Aspiring Data Scientist specializing in AI, Next.js, and Modern Web Tech.",
	keywords: [
		"Adhithya Srivatsan",
		"Portfolio",
		"Web Developer",
		"Data Scientist",
		"AI Engineer",
		"Next.js",
		"React",
		"TypeScript",
		"Shiv Nadar University",
	],
	authors: [{ name: "Adhithya Srivatsan" }],
	creator: "Adhithya Srivatsan",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://adhithyasrivatsan.vercel.app", // Update with your actual domain
		title: "Adhithya Srivatsan | Portfolio",
		description: "Explore the projects and skills of Adhithya Srivatsan, a developer passionate about AI and Design.",
		siteName: "Adhithya Srivatsan Portfolio",
		images: [
			{
				url: "/pixel-me.png",
				width: 1200,
				height: 630,
				alt: "Adhithya Srivatsan",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Adhithya Srivatsan | Portfolio",
		description: "Web Developer & Aspiring Data Scientist. Check out my interactive portfolio.",
		images: ["/pixel-me.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
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
        <Toaster />
      </body>
    </html>
  );
}
