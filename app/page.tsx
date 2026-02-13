"use client"

import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProblemsSection } from "@/components/problems-section";
import { useUser } from "@/hooks/use-auth";
import { useAuthStore } from "@/hooks/useAuthStore";
import Image from "next/image";

export default function Home() {
  const { isAuthenticated } = useAuthStore()

  return !isAuthenticated ? (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
        <ProblemsSection />
        <CTASection />
      </main>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      Hi there, you are logged in!
    </div>
  );
}
