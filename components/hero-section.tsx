import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link"
import { ArrowRight, Code, Flame, Zap } from "lucide-react";

function CodeLine({
    lineNum,
    children
}: {
    lineNum: number;
    children: React.ReactNode
}) {
    return (
        <div className="flex items-start gap-4 py-0.5 hover:bg-secondary/30 px-1 -mx-1 rounded-sm transition-colors">
            <span className="text-muted-foreground/40 select-none w-6 text-right shrink-0 text-xs leading-relaxed">
                {lineNum}
            </span>
            <span className="flex-1">
                {children}
            </span>
        </div>
    )
}

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
                        <Zap className="w-3 h-3 mr-1.5" />
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
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-doom-lava/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                                </div>
                                <span className="text-xs text-muted-foreground font-mono ml-2">
                                    two_sum.py
                                </span>
                            </div>
                            <div className="p-5 font-mono text-sm leading-relaxed text-left overflow-x-auto">
                                <CodeLine lineNum={1}>
                                    <span className="text-primary">def</span>{" "}
                                    <span className="text-foreground">two_sum</span>
                                    <span className="text-muted-foreground">(</span>
                                    <span className="text-doom-lava">nums</span>
                                    <span className="text-muted-foreground">,</span>{" "}
                                    <span className="text-doom-lava">target</span>
                                    <span className="text-muted-foreground">):</span>
                                </CodeLine>
                                <CodeLine lineNum={2}>
                                    <span className="text-muted-foreground pl-8">{"seen = {}"}</span>
                                </CodeLine>
                                <CodeLine lineNum={3}>
                                    <span className="text-primary pl-8">for</span>{" "}
                                    <span className="text-foreground">i, num</span>{" "}
                                    <span className="text-primary">in</span>{" "}
                                    <span className="text-foreground">enumerate(nums):</span>
                                </CodeLine>
                                <CodeLine lineNum={4}>
                                    <span className="text-muted-foreground pl-16">{"diff = target - num"}</span>
                                </CodeLine>
                                <CodeLine lineNum={5}>
                                    <span className="text-primary pl-16">if</span>{" "}
                                    <span className="text-foreground">diff</span>{" "}
                                    <span className="text-primary">in</span>{" "}
                                    <span className="text-foreground">seen:</span>
                                </CodeLine>
                                <CodeLine lineNum={6}>
                                    <span className="text-primary pl-24">return</span>{" "}
                                    <span className="text-muted-foreground">{"[seen[diff], i]"}</span>
                                </CodeLine>
                                <CodeLine lineNum={7}>
                                    <span className="text-muted-foreground pl-16">{"seen[num] = i"}</span>
                                </CodeLine>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}