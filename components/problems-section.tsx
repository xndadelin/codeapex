"use client";

import { useState } from "react";
import { TabsList, TabsTrigger, Tabs } from "./ui/tabs";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Difficulty = "all" | "easy" | "medium" | "hard";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: string;
  solved: boolean;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "49.2%",
    solved: true,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "38.1%",
    solved: true,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Strings",
    acceptance: "33.8%",
    solved: false,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    acceptance: "35.2%",
    solved: false,
  },
  {
    id: 5,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "72.5%",
    solved: true,
  },
  {
    id: 6,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Heap",
    acceptance: "47.8%",
    solved: false,
  },
  {
    id: 7,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Prog.",
    acceptance: "49.9%",
    solved: false,
  },
  {
    id: 8,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.6%",
    solved: true,
  },
];

const difficultyStyles: Record<string, string> = {
  Easy: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Hard: "text-red-400 border-red-400/30 bg-red-400/10",
};

export function ProblemsSection() {
  const [filter, setFilter] = useState<Difficulty>("all");

  const filtered =
    filter === "all"
      ? problems
      : problems.filter((p) => p.difficulty.toLowerCase() === filter);

  return (
    <section id="problems" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
              Battleground
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Sample <span className="text-primary">Challenges</span>
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Preview a selection of challenges from the library :).
            </p>
          </div>

          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as Difficulty)}
          >
            <TabsList className="bg-secondary/50 border border-border/50">
              <TabsTrigger value="all" className="text-xs font-mono">
                All
              </TabsTrigger>
              <TabsTrigger value="easy" className="text-xs font-mono">
                Easy
              </TabsTrigger>
              <TabsTrigger value="medium" className="text-xs font-mono">
                Medium
              </TabsTrigger>
              <TabsTrigger value="hard" className="text-xs font-mono">
                Hard
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="rounded-lg border border-border/60 overflow-hidden bg-card/30">
          <div className="hidden sm:grid grid-cols-[40px_1fr_100px_120px_90px] gap-4 px-5 py-3 bg-secondary/30 border-b border-border/50">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              Challenge
            </span>
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              Dificulty
            </span>
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              Category
            </span>
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              Acceptance
            </span>
          </div>
          {filtered.map((problem, idx) => (
            <div
              key={problem.id}
              className={`
                             group grid sm:grid-cols-[40px_1fr_100px_120px_90px] gap-4 px-5 py-3.5 items-center cursor-pointer transition-colors hover:bg-secondary/20 ${idx < filtered.length - 1 ? "border-b border-border/30" : ""}
                            `}
            >
              <div className="hidden sm:flex items-center justify-center">
                {problem.solved ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-400/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-border/60" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground/50 font-mono sm:hidden">
                  #{problem.id}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {problem.title}
                </span>
              </div>
              <div>
                <Badge
                  variant={"outline"}
                  className={`text-[10px] font-mono ${difficultyStyles[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </Badge>
              </div>
              <div>
                <Badge
                  variant={"secondary"}
                  className="text-[10px] font-mono bg-secondary/60 text-muted-foreground border-0"
                >
                  {problem.category}
                </Badge>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground font-mono">
                  {problem.acceptance}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            variant={"outline"}
            className="border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 gap-2 bg-transparent"
          >
            View all 5+ problems <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
