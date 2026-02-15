"use client"

import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, FileCode, FileCode2, Save, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const defaultTestCasesJson = JSON.stringify([
  { input: "2 7 11 15\n9", output: "0 1", is_sample: true },
  { input: "3 2 4\n6", output: "1 2", is_sample: true },
  { input: "3 3\n6", output: "0 1", is_sample: false },
]);

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
    const [starterCode, setStarterCode] = useState<string>("def solution():\n    pass")
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [timeLimit, setTimeLimit] = useState<number>(1000)
    const [memoryLimit, setMemoryLimit] = useState<number>(256)
    const [testCasesJson, setTestCasesJson] = useState(defaultTestCasesJson)

    const validation = (() => {
        try {
            const parsed = JSON.parse(testCasesJson)
            if(!Array.isArray(parsed)) return {
                valid: false,
                count: 0,
                samples: 0,
                error: "Must be a JSON array"
            }
            const allValid = parsed.every((tc: Record<string, any>) => typeof tc === "object" && tc !== null && "input" in tc && "output" in tc && "is_sample" in tc)
            if(!allValid) return {
                valid: false,
                count: parsed.length,
                samples: 0,
                error: 'Each object needs "input", "output" and "is_sample" keys.'
            }
            const samples = parsed.filter((tc: Record<string, any>) => tc.is_sample === true).length
            return {
                valid: true,
                count: parsed.length,
                samples, 
                error: null
            }
        } catch {
            return {
                valid: false,
                count: 0,
                samples: 0,
                error: "Invalid JSON syntax"
            }
        }
    })

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

                                                                                <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label className="text-sm text-foreground">
                                                Problem visibility
                                            </Label>
                                            <p className="text-[10px] text-muted-foreground">
                                                Public problems are visible to all users on the platform.
                                            </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge
                                                    variant={"outline"}
                                                    className={`text-[10px] px-1.5 py-0 font-mono ${
                                                        isPublic ? "border-emerald-500/40 text-emerald-400" : "border-amber-500/40 text-amber-400"
                                                    }`}
                                                >
                                                    {isPublic ? "Public" : "Draft/Private"}
                                                </Badge>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsPublic(!isPublic)}
                                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                                                        isPublic ? "bg-primary" : "bg-secondary"
                                                    }`}
                                                    role="switch"
                                                    aria-checked={isPublic}
                                                    aria-label="Make problem public"
                                                >
                                                    <span
                                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-foreground shadow-lg transition-transform ${
                                                            isPublic ? "translate-x-5" : "translate-x-0"
                                                        }`}
                                                    >
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        <Separator className="bg-border/30" />

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="timeLimit" className="text-sm text-foreground">
                                                    Time limit (ms)
                                                </Label>
                                                <Input
                                                    id="timeLimit"
                                                    type="number"
                                                    value={timeLimit}
                                                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                                                    placeholder="2000"
                                                    className="bg-secondary/30 border-border/50 text-foreground font-mono text-sm focus-visible:ring-primary/50"
                                                />
                                                <p className="text-[10px] text-muted-foreground">
                                                    Default: 2000ms (2 seconds)
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm text-foreground" htmlFor="memoryLimit">
                                                    Memory limit (MB)
                                                </Label>
                                                <Input
                                                    id="memoryLimit"
                                                    type="number"
                                                    value={memoryLimit}
                                                    onChange={(e) => setMemoryLimit(Number(e.target.value))}
                                                    placeholder="256"
                                                    className="bg-secondary/30 border-border/50 text-foreground font-mono text-sm focus-visible:ring-primary/50"
                                                />
                                                <p className="text-[10px] text-muted-foreground">
                                                    Default: 256MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>                            
                            </Card>
                             <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-semibold text-foreground mb-6">
                                        Problem description
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-sm text-foreground">
                                                Description
                                            </Label>
                                            <textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Describe the problem statement in details. Use Markdown formatting."
                                                rows={8}
                                                className="w-full rounded-md bg-secondary/30 border border-border/50 text-foreground font-mono text-sm p-4 resize-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 leading-relaxed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="constraints" className="text-sm text-foreground">
                                                Constraints
                                            </Label>
                                            <textarea
                                                id="constraints"
                                                value={constraints}
                                                onChange={(e) => setConstraints(e.target.value)}
                                                placeholder={`One constraint per line, eg: \n2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9
                                                `}
                                                rows={4}
                                                className="w-full rounded-md bg-secondary/30 border border-border/50 text-foreground font-mono text-sm p-4 resize-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 leading-relaxed"
                                            />
                                        </div>
                                    </div>
                                </CardContent>                     
                            </Card>

                           <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <FileCode2 className="w-5 h-5 text-primary" />
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Starter code
                                        </h2>
                                    </div>
                                    <textarea
                                        value={starterCode}
                                        onChange={(e) => setStarterCode(e.target.value)}
                                        rows={10}
                                        className="w-full rounded-md bg-secondary/30 border border-border/50 text-foreground font-mono text-sm p-4 resize-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 leading-relaxed"
                                        spellCheck={false}
                                    />
                                </CardContent>
                           </Card>
                          <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Test cases (JSON format)
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            {testCasesJson.trim() && (
                                                <Badge
                                                    variant={"outline"}
                                                    className={`text-[10px] px-1.5 py-0 font-mono ${validation().valid ? "border-emerald-500/40 text-emerald-400" : "border-red-500/40 text-red-400"}`}

                                                >
                                                    {validation().valid ? `${validation().count} tests (${validation().samples} samples)`: "Invalid"}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-4 font-mono leading-relaxed">
                                        {'A JSON array of objects. Each object needs "input", "output", and "is_sample" (boolean) keys.'}
                                            <br />
                                        {'Test cases with "is_sample": true are shown as examples to users.'}
                                    </p>
                                    {validation().error && (
                                        <p className="text-xs text-red-400 mb-4 font-mono">
                                            {validation().error}
                                        </p>
                                    )}
                                    <textarea
                                        value={testCasesJson}
                                        onChange={(e) => setTestCasesJson(e.target.value)}
                                        rows={20}
                                        spellCheck={false}
                                        className={`w-full rounded-md bg-secondary/30 border text-foreground font-mono text-xs p-4 resize-y outline-none focus-visible:ring-2 focus-visible:ring-offset-0 leading-relaxed ${
                                            validation().valid || !testCasesJson.trim() ? "border-border/50 focus-visible:ring-primary/50" : "border-red-500/30 focus-visible:ring-red-500/50"
                                        }`}
                                    />
                                </CardContent>
                          </Card>
                          <div className="flex items-center justify-between pt-4">
                            <Button variant={"outline"} className="cursor-pointer bg-transparent border-border/50 text-muted-foreground hover:text-foreground gap-2" asChild>
                                <Link href="/admin">
                                    <ArrowLeft className="w-4 h-4" />
                                    Cancel
                                </Link>
                            </Button>
                            <div className="flex items-center gap-3">
                                <Button variant={"outline"} className="cursor-pointer bg-transparent border-border/50 text-muted-foreground hover:text-foreground gap-2">
                                    <Eye className="w-4 h-4" />
                                    Save as draft
                                </Button>
                                <Button className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 gap-2">
                                    <Save className="w-4 h-4" />
                                    Publish challenge
                                </Button>
                            </div>
                          </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}