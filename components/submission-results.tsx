"use client"

import { useState } from "react"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ChevronDown, ChevronRight, Clock, MemoryStick, XCircle } from "lucide-react"

interface TestResult {
    input: string,
    status: string,
    accepted: string,
    time: string | null,
    memory: number | null
    output: string
}

interface SubmissionResultsProps {
    results: TestResult[]
    isLoading?: boolean,
    error: string | null
}

function ResultRow({ result, index } : { result: TestResult, index: number }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="border-b border-border/30 last:border-0">
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-secondary/30 transition-colors group"
            >
                <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">{index + 1}</span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {result.accepted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className={`text-sm font-mono font-medium shrink-0 ${result.accepted ? "text-emerald-400" : "text-red-400"}`}>
                        {result.accepted ? "Accepted" : "WA"}
                    </span>
                    <Badge variant={"outline"} className={`text-[9px] font-mono shrink-0 ${
                        result.accepted ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" : "text-red-400 border-red-400/30 bg-red-400/10"
                    }`}>
                        {result.status}
                    </Badge>
                </div>
                <div className="flex items-center gap-3 ml-auto shrink-0">
                    <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {result.time ? `${result.time}s` : "-"}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                        <MemoryStick className="w-3 h-3" />
                        {result.memory ? `${result.memory}KB` : "-"}
                    </span>
                    {expanded
                        ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        : <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    }
                </div>
            </button>
            {expanded && (
                <div className="px-5 pb-4 grid sm:grid-cols-2 gap-3 bg-secondary/10">
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Input</p>
                        <pre className="text-xs font-mono text-foreground/80 bg-secondary/40 border border-border/40 rounded-md p-3 whitespace-pre-wrap break-all">
                            {result.input || "-"}
                        </pre>
                    </div>
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">Output</p>
                        <pre className={`text-xs font-mono bg-secondary/40 border rounded-md p-3 whitespace-pre-wrap break-all ${
                            result.accepted ? "border-emerald-400/40 text-emerald-400" : "border-red-400/20 text-red-400"
                        }`}>
                            {result.output || "-"}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function SubmissionResults({
    results, isLoading
}: SubmissionResultsProps) {
    if (isLoading) {
        return (
            <Card className="bg-card/30 border-border/60 mt-4">
                <CardContent className="p-0">
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <div className="flex gap-1.5">
                            {[0,1,2].map(i => (
                                <span
                                    key={i}
                                    className="w-1.5 h-1.5 bg-muted rounded-full bg-primary animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s`}}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if(!results || results.length === 0) return null
    const passed = results.filter(r => r.accepted).length
    const total = results.length

    const allPassed = passed === total
    const avgTime = results.filter(r => r.time !== null).map(r => parseFloat(r.time!)).reduce((a, b, _, arr) => a + b / arr.length, 0)

    return (
        <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    {allPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`text-sm font-mono font-semibold ${allPassed ? "text-emerald-400" : "text-red-400"}`}>
                        {allPassed ? "All tests passed" : `${passed} / ${total} tests passed`}
                    </span>
                </div>
                {avgTime > 0 && (
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        avg {avgTime.toFixed(3)}s
                    </span>
                )}
            </div>

            <div className="h-1 w-full rounded-full bg-secondary/50 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${allPassed ? "bg-emerald-400" : "bg-red-400"}`}
                    style={{ width: `${(passed / total) * 100}%` }}
                />
            </div>

            <div className="rounded-lg border border-border/60 overflow-hidden bg-card/30">
                <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-secondary/30 border-b border-border/50">
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider w-5 shrink-0" />
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex-1">Result</span>
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider ml-auto">Time</span>
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider w-20">Memory</span>
                    <span className="w-4" />
                </div>

                {results.map((result, idx) => (
                    <ResultRow key={idx} result={result} index={idx} />
                ))}
            </div>
        </div>
    )
}