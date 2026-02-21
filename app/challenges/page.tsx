"use client";

import { useListChallenges } from "@/hooks/use-challenges";
import { UUID } from "crypto";
import Loading from "../loading";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Fragment, useMemo, useState } from "react";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink
} from "@/components/ui/pagination"

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

export default function Challenges() {
    const { data: challenges, isLoading, error } = useListChallenges()
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")

    const [page, setPage] = useState<number>(1)
    const pageSize = 10
    const totalPages = challenges ? Math.ceil(challenges.length / pageSize) : 1

    const currentPageChallenges = useMemo(() => {
        if(!challenges) return []
        const startindex = (page - 1) * pageSize
        return challenges.slice(startindex, startindex + pageSize)
    }, [challenges, page])

    const filtered = useMemo(() => {
    if (!currentPageChallenges) return []

    return currentPageChallenges.filter(c => 
        (difficultyFilter === "all" || c.difficulty === difficultyFilter) &&
        (categoryFilter === "all" || c.category === categoryFilter) &&
        (!searchQuery.trim() || 
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    )
    }, [challenges, difficultyFilter, categoryFilter, searchQuery, currentPageChallenges])

    if(isLoading) {
        return <Loading />
    }

    const difficultyLength: Record<string, number> = {
        "Total": challenges?.length || 0,
        "Easy": challenges?.filter((challenge: Challenge_Line) => challenge.difficulty === "Easy").length || 0,
        "Medium": challenges?.filter((challenge: Challenge_Line) => challenge.difficulty === "Medium").length || 0,
        "Hard": challenges?.filter((challenge: Challenge_Line) => challenge.difficulty === "Hard").length || 0
    }

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
                                        <span className={`text-2xl font-bold font-mono ${difficultyColors[difficulty]} bg-transparent`}>
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
                                    onClick={() => {
                                        if(categoryFilter === topic) {
                                            setCategoryFilter("all")
                                        } else {
                                            setCategoryFilter(topic)
                                        }
                                    }}
                                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors border ${
                                        categoryFilter === topic ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/30 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                                    }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>

                        <div className="rounded-lg border border-border/60 overflow-hidden bg-card/30">
                            <div className="hidden sm:grid grid-cols-[40px_1fr_100px_130px_90px] gap-4 px-5 py-3 bg-secondary/30 border-b border-border/50">
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider" />
                                 <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                    Challenge
                                 </span>
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                    Difficulty
                                 </span>
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                    Category
                                 </span>
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider text-right">
                                    Accept.
                                 </span>
                            </div>

                            {!isLoading && challenges && filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <Tag className="w-8 h-8 text-muted-foreground/40 mb-3" />
                                    <p className="text-sm text-muted-foreground">
                                        No challenges match your filters.
                                    </p>
                                    <Button
                                        variant={"ghost"}
                                        size="sm"
                                        onClick={() => {
                                            setDifficultyFilter("all"); setCategoryFilter("all")
                                        }}
                                        className="mt-3 text-primary text-xs"
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                            ): filtered.map((challenge, idx) => (
                                <Fragment key={challenge.id}>
                                    <Link
                                    href={`/challenges/${challenge.id}`}
                                    className={`group grid sm:grid-cols-[40px_1fr_100px_130px_90px] gap-4 px-5 py-3.5 items-center transition-colors hover:bg-secondary/30 ${
                                        idx < filtered.length - 1 ? "border-b border-border/30" : ""
                                    }`}
                                    >
                                        <span className="text-xs font-mono text-muted-foreground">{idx + 1}</span>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                                            {challenge.title}
                                            </span>
                                            <Badge variant="outline" className={`sm:hidden text-[9px] font-mono ${difficultyColors[challenge.difficulty]}`}>
                                            {challenge.difficulty}
                                            </Badge>
                                        </div>
                                        <Badge variant="outline" className={`hidden sm:inline text-[10px] font-mono ${difficultyColors[challenge.difficulty]}`}>
                                            {challenge.difficulty}
                                        </Badge>
                                        <span className="text-sm font-mono text-muted-foreground">{challenge.category}</span>
                                        <span className="text-sm font-mono text-right text-muted-foreground">{challenge.acceptance}%</span>
                                    </Link>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages}).map((_, idx) => (
                                        <PaginationItem key={idx}>
                                            <PaginationLink
                                                onClick={() => {
                                                    setPage(idx + 1)
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth"
                                                    })
                                                }}
                                                className={`h-8 w-8 rounded-md border border-border/50 bg-card text-sm text-foreground ${
                                                    page === idx + 1 ? "bg-primary text-primary-foreground border-primary" : "hover:bg-primary/10"
                                                }`}
                                            >
                                                {idx + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )  
}