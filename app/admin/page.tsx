"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, Edit3, Eye, Plus, Search, Shield, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePaginatedChallenges } from "@/hooks/use-challenges";
import Loading from "../loading";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const difficultyColors: Record<string, string> = {
    "Easy": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    "Medium": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "Hard": "text-red-400 border-red-400/30 bg-red-400/10"
}


export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const PAGE_SIZE = 10
    const [page, setPage] = useState<number>(1)
    const { data, isLoading } = usePaginatedChallenges(page - 1, PAGE_SIZE, "admin", searchQuery)
    const challenges = data?.challenges ?? []
    const count = data?.count ?? 0
    const totalPages = Math.ceil(count / PAGE_SIZE)

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="relative py-12 lg:py-16">
                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb:10">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="w-4 h-4 text-primary" />
                                    <p className="text-xs font-mono uppercase tracking-widest text-primary">
                                        Admin panel
                                    </p>
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    <span className="text-primary">Command</span> Center
                                </h1>
                                <p className="mt-2 text-muted-foreground">
                                    Manage problems, users, and platform operations.
                                </p>
                            </div>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start" asChild>
                                <Link href="/admin/challenges/new">
                                    <Plus className="w-4 h-4" />
                                    New challenge
                                </Link>
                            </Button>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-foreground">
                                        Problem management
                                    </h2>
                                    <div className="relative w-60">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search challenges..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-xs focus-visible:ring-primary/50 h-9"
                                        />
                                    </div>
                                </div>
                                <div className="rounded-lg border border-border/60 overflow-hidden bg-card/30">
                                    <div className="hidden sm:grid grid-cols-[50px_1fr_90px_100px_90px_100px] gap-3 px-4 py-2.5 bg-secondary/30 border-b border-border/50">
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                            ID
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                            Title
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                            Difficulty
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                            Submissions
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                            Accept.
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                            Actions
                                        </span>
                                    </div>
                                    {data?.challenges?.map((problem, idx) => (
                                        <div
                                            key={problem.id}
                                            className={`grid sm:grid-cols-[50px_1fr_90px_100px_90px_100px] gap-3 px-4 py-3 items-center hover:bg-primary/10 transition-colors ${
                                                idx < challenges.length - 1 ? "border-b border-border/30" : ""
                                            }`}
                                        >
                                            <span className="text-xs text-muted-foreground font-mono">
                                                #{problem.id.slice(0, 6)}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-foreground truncate">
                                                    {problem.title}
                                                </span>
                                                {!problem.is_public && (
                                                    <BadgeUI variant={"outline"} className="text-[8px] font-mono text-amber-400 border-amber-400/30 bg-amber-400/10">
                                                        Private
                                                    </BadgeUI>
                                                )}
                                            </div>
                                            <div className="hidden sm:block w-full text-center">
                                                <BadgeUI className={`text-9px font-mono ${difficultyColors[problem.difficulty]}`} variant={"outline"}>
                                                    {problem.difficulty}
                                                </BadgeUI>
                                            </div>
                                            <span className="hidden sm:block text-xs text-muted-foreground font-mono w-full">
                                                {problem.submissions.toLocaleString() || 0}
                                            </span>
                                            <span className="hidden sm:block text-xs text-muted-foreground font-mono">
                                                {problem.acceptance || 0}%
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Button variant={"ghost"} size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground" asChild>
                                                    <Link href={`/admin/challenges/${problem.id}`}>
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span className="sr-only">View</span>
                                                    </Link>
                                                </Button>
                                                <Button variant={"ghost"} size="sm" className="h-7 cursor-pointer w-7 p-0 text-muted-foreground hover:text-primary">
                                                    <Link href={`/admin/challenges/edit/${problem.id}`}>
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </Link>
                                                </Button>
                                                <Button variant={"ghost"} size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-red-400">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span className="sr-only">
                                                        Delete
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
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
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
