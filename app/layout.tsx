import type { Metadata, Viewport} from "next";
import { Oxanium, Source_Code_Pro } from "next/font/google"
import "@/styles/globals.css";
import { Providers } from "./providers";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-sans"
})

const sourceCodePro = Source_Code_Pro({
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
    <html lang="en" className={`dark ${oxanium.variable} ${sourceCodePro.variable}`}>
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}