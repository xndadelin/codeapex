import { Flame, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter()
 return (
     <section className="relative py-24 lg:py-32">
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary-5 blur-[120px]" />
    </div>
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="relative rounded-xl bg-card/30 p-8 sm:p-12 lg:p-16 overflow-hidden doom-border-glow">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10">
            <Terminal className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to enter the{" "}
            <span className="text-primary">arena</span>?
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-muted-foreground leading-relaxed">
            Join CodeApex and start solving coding challenges to sharpen your
            skills! Free to start, by the way!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8"
              asChild
            >
              <Link href="/signup">
                <Flame className="w-5 h-5" />
                Create free account
              </Link>
            </Button>
            <Button
              variant={"ghost"}
              size="lg"
              className="text-muted-foreground hover:text-foreground h-12 text-base"
              asChild
            >
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
 )
}
