import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProblemsSection } from "@/components/problems-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
        <ProblemsSection />
      </main>
    </div>
  );
}
