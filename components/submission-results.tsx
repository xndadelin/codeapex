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
    isLoading?: boolean
}

function ResultRow({ result, index } : { result: TestResult, index: number }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="border-b border-border/30 last:border-0">
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full grid grid-cols-[32px_1fr_120px_90px_90px] gap-4 px-5 py-3.5 items-center text-left hover:bg-secondary/30 transition-colors group"
            >
                <span className="text-xs font-mono text-muted-foreground">
                    {index + 1}
                </span>
                <div className="flex items-center gap-2">
                    {result.accepted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className={`text-sm font-mono font-medium ${result.accepted ? "text-emerald-400" : "text-red-400"}`}>
                        {result.accepted ? "Accepted" : "WA"}
                    </span>
                    <Badge variant={"outline"} className={`text-[9px] font-mono ${
                        result.accepted ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" : "text-red-400 border-red-400/30 bg-red-400/10"
                    }`}>
                        {result.status}
                    </Badge>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {result.time ? `${result.time}s` : "-"}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <MemoryStick className="w-3 h-3" />
                    {result.memory ? `${result.memory}KB`: "-"}
                </div>

                <div className="flex justify-end">
                    {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" /> :
                        <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors " />
                    }
                    {expanded && (
                        <div className="px-5 pb-4 grid sm:grid-cols-2 gap-3 bg-secondary/10">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
                                    Input
                                </p>
                                <pre className="text-xs font-mono text-foreground/80 bg-secondary/40 border border-border/40 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-all">
                                    {result.input || "-"}
                                </pre>
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-widest tracking-widest text-muted-foreground mb-1.5">
                                Output
                            </div>
                            <pre className={`text-xs font-mono bg-secondary/40 border rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-all ${
                                result.accepted ? "border-emerald-400/40 text-emerald-400" : "border-red-400/20 text-red-400"
                            }`}>
                                {result.output || "-"}
                            </pre>
                        </div>
                    )}
                </div>

            </button>
        </div>
    )
}
