import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react";

export function HeroSection() {

    const stats = [
        { label: 'Challenges', value: "15+" },
        { label: 'Coders', value: "1" },
        { label: 'Languages', value: "8" }
    ]

    return (
        <section
            className="relative overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 
                        "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
                        backgroundSize: "64px 64px"
                    }}    
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
                <div className="flex flex-col items-center text-center">
                    <Badge
                        variant="outline"
                        className="mb-8 border-primary/30 bg-primary/5 text-primary px-4 py-1.5 text-xs font-mono tracking-wider uppercase"
                    >
                        Beta version
                    </Badge>

                    <h1
                        className="text-balance max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                    >  
                        Conquer code.{" "}
                        <span className="text-primary doom-glow-text">
                            Dominate
                        </span>{" "}
                        Algorithms.
                    </h1>

                    <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Build your coding skills by solving hundreds of challenges. Track your progress, compete on leaderboards, and keep getting better.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                        <Button
                            size={"lg"}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 h-12 text-base doom-glow"
                            asChild
                        >
                            <Link href="/signup">
                                <Flame className="w-5 h-5" />
                                Start coding
                            </Link>
                        </Button>
                        <Button
                            variant={"outline"}
                            size={"lg"}
                            className="border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 gap-2 px-8 h-12 text-base bg-transparent"
                            asChild
                        >
                            <Link href={"/challenges"}>
                                Browse challenges
                                <ArrowRight className="w-4 h-4" />                            
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center gap-1">
                                <span className="text-2xl font-bold text-foreground font-mono sm:text-3xl">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 w-full max-w-3xl">
                        <div className="rounded-lg border border-border/60 bg-card overflow-hidden doom-border-glow">
                            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/50">
                                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                            </div>                        
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}