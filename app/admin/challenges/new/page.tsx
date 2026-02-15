"use client"

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const defaultTestCasesJson = JSON.stringify([
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      output: [0, 1],
      is_sample: true,
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      output: [1, 2],
      is_sample: true,
    },
    {
      input: { nums: [3, 3], target: 6 },
      output: [0, 1],
      is_sample: false,
    },
    null,
    2,
])

const difficultyColors: Record<string, string> = {
    "Easy": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    "Medium": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "Hard": "text-red-400 border-red-400/30 bg-red-400/10"
}

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

export default function NewProblemPage() {
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy")
    const [category, setCategory] = useState<string>("")
    const [tags, setTags] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [constraints, setConstraints] = useState<string>("")
    const [starterCode, setStarterCode] = useState<string>("`def solution():\n    pass`")
    const [solutionCode, setSolutionCode] = useState<string>("")

    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [timeLimit, setTimeLimit] = useState<number>(1000)
    const [memoryLimit, setMemoryLimit] = useState<number>(256)
    const [testCasesJson, setTestCasesJson] = useState(defaultTestCasesJson)

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="relative py-12 lg:py-16">
                    <div className="relative mx-auto max-w-4xl px-6">
                        <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" href="/admin">
                            <ArrowLeft className="w-4 h-4" />
                            Admin dashboard
                        </Link>

                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-4 h-4 text-primary" />
                            <p className="text-xs font-mono uppercase tracking-widest text-primary">
                                Challenge editor
                            </p>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                            Create new <span className="text-primary">challenge</span>
                        </h1>
                        <p className="text-muted-foreground text-sm mb-10">
                            Define a new coding challenge for the platform.
                        </p>
                        <div className="space-y-8">
                            <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-semibold text-foreground mb-6">
                                        Basic information
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-sm text-foreground">
                                                Problem title
                                            </Label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g., Two Sum"
                                                className="bg-secondary/30 border-border/50 text-foreground font-mono text-sm focus-visible:ring-primary/50"
                                            />
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label className="text-sm text-foreground">
                                                    Difficulty
                                                </Label>
                                                <div className="flex gap-2">
                                                    {(["Easy", "Medium", "Hard"] as const).map((d) => (
                                                        <button
                                                            key={d}
                                                            type="button"
                                                            onClick={() => setDifficulty(d)}
                                                            className={`flex-1 px-3 py-2 rounded-md text-xs font-mono transition-colors border ${
                                                                difficulty === d ? difficultyColors[d] : "bg-secondary/30 border-border/50 text-muted-foreground hover:text-foreground"
                                                            }`}
                                                        >
                                                            {d}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="category" className="text-sm text-foreground">
                                                    Category
                                                </Label>
                                                <select
                                                    id="category"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className="w-full rounded-md bg-secondary/30 border border-border/50 text-foreground font-mono text-sm px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                                >
                                                    {topics.map((_topic) => (
                                                        <option key={_topic} value={_topic}>
                                                            {_topic}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="tags" className="text-sm text-foreground">
                                                    Tags
                                                </Label>
                                                <Input
                                                    id="tags"
                                                    value={tags}
                                                    onChange={(e) => setTags(e.target.value)}
                                                    className="bg-secondary/30 border-border/50 text-foreground font-mono text-sm focus-visible:ring-primary/50"
                                                    placeholder="e.g., array, hash-table"
                                                />
                                                <p className="text-[10px] text-muted-foreground">
                                                    Comma separated.
                                                </p>
                                            </div>
                                        </div>

                                        <Separator className="bg-border/30" />
                                    </div>
                                </CardContent>                            
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}