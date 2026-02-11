import { BarChart3, Code2, Cpu, Globe, Layers, Trophy } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
    {
        icon: Code2,
        title: 'Multi-Language support',
        description: 'Write and test code in Python, Javascript, C++, Go, Rust, Typescript, and more. More languages coming soon!'
    },
    {
        icon: Cpu,
        title: 'Instant feedback',
        description: 'Submit your solution and get immediate results, including runtime, memory usage, and test-by-test breakdowns to improve faster.'
    },
    {
        icon: Layers,
        title: '1+ challenges',
        description: "From array manipulation to dynamic programming, there's a challenge for every skill level. New challenges are continuously added :)."
    },
    {
        icon: BarChart3,
        title: 'Progress tracking',
        description: 'Track your solve rate, streak history, and per-category mastery. You can analyse all these stats in your profile.'
    },
    {
        icon: Trophy,
        title: 'Live leaderboards',
        description: 'Compete against the community with real-time leaderboards. Weekly contests and timed challenges to test your speed.'
    },
    {
        icon: Globe,
        title: 'Community solutions',
        description: 'Learn from others. Browse top-voted solutions, discuss strategies, and discover optimal approaches after solving.'
    }
]

export function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 lg:py-32">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <p className="text-xs font-mono tracking-wider uppercase tracking-widest text-primary mb-3">
                        Arsenal
                    </p>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Everything you need to {" "}
                        <span className="text-primary">
                            dominate
                        </span>
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-pretty text-muted-foreground leading-relaxed">
                        Everything you need to practice, compete, and improve your coding skills - all in one place (yes!).
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={feature.title}
                            className="group bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:doom-border-glow"
                        >
                            <CardContent
                                className="p-6"
                            >
                                <div
                                    className="mb-4 flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/15 transition-colors"
                                >
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <h3
                                    className="text-base font-semibold text-foreground mb-2"
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}