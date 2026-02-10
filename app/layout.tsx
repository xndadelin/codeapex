import type { Metadata, Viewport} from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "CodeApex - Code!",
  description: 
    "CodeApex is a competitive coding platform. Practice algorithms, track your progress, and climb the ranks."
  ,
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.className} ${jetbrainsMono.className}`}>
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
