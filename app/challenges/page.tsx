import { useListChallenges } from "@/hooks/use-challenges";
import { UUID } from "crypto";
import Loading from "../loading";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Challenge_Line {
    id: UUID,
    title: string,
    difficulty: string,
    category: string,
    tags: string[],
    is_public: boolean
    acceptance: number
    submissions: number
}

type Difficulty = "all" | "Easy" | "Medium" | "Hard"

const topics = [
  "Arrays",
  "Strings",
  "Linked List",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Binary Search",
  "Stack",
  "Heap",
  "Backtracking",
  "Math",
  "Greedy"
];

const difficultyColors: Record<string, string> = {
    "Easy": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    "Medium": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "Hard": "text-red-400 border-red-400/30 bg-red-400/10"
}

export function Challenges() {
    const { data: challenges, isLoading, error } = useListChallenges()
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")

    if(isLoading) {
        return <Loading />
    }

    const difficultyLength: Record<string, number> = {
        "Easy": challenges?.filter((challenge: Challenge_Line) => challenge.difficulty === "Easy").length || 0,
        "Medium": challenges?.filter((challenge: Challenge_Line) => challenge.difficulty === "Medium").length || 0,
        "Hard": challenges?.filter((challenge: Challenge_Line) => challenge.difficulty === "Hard").length || 0
    }

    const filtered = useMemo(() => {
        let result = [...(challenges ?? [])] as Challenge_Line[]

        if(difficultyFilter !== "all") {
            result = result.filter(challenge => challenge.difficulty === difficultyFilter)
        }

        if(categoryFilter !== "all") {
            result = result.filter(challenge => challenge.category === categoryFilter)
        }

        if(searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(challenge => challenge.title.toLowerCase().includes(query) ||
            challenge.category.toLowerCase().includes(query) ||
            challenge.tags.some(tag => tag.toLowerCase().includes(query))
          )
        }

    }, [difficultyFilter, categoryFilter, searchQuery])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="relative py-12 lg:py-16">
                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="mb-10">
                            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                                Battleground
                            </p>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                All <span className="text-primary">challenges</span>
                            </h1>
                            <p className="mt-2 text-muted-foreground text-sm">
                                {challenges?.length} challenges available
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {difficultyLength && Object.entries(difficultyLength).map(([difficulty, count]) => (
                                <Card key={difficulty} className="bg-card/50 border-border/50">
                                    <CardContent className="p-4 flex flex-col items-center">
                                        <span className={`text-2xl font-bold font-mono ${difficultyColors[difficulty]}`}>
                                            {count}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                                            {difficulty}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search challenges..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-sm focus-visible:ring-primary/50"
                                />
                            </div>

                            <Tabs value={difficultyFilter} onValueChange={(v) => setDifficultyFilter(v as Difficulty)}>
                                <TabsList className="bg-secondary/50 border border-border/50">
                                    <TabsTrigger value="all" className="text-xs font-mono">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value="Easy" className="text-xs font-mono">
                                        Easy
                                    </TabsTrigger>
                                    <TabsTrigger value="Medium" className="text-xs font-mono">
                                        Medium
                                    </TabsTrigger>
                                    <TabsTrigger value="Hard" className="text-xs font-mono">
                                        Hard
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {topics.map(topic => (
                                <button
                                    key={topic}
                                    type="button"
                                    onClick={() => setCategoryFilter(topic)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors border ${
                                        categoryFilter === topic ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/30 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                                    }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )  
}