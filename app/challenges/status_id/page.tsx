"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, CheckCircle, CheckCircle2, Clock } from "lucide-react";

const statuses = [
    { id: 1, name: "In queue", description: "The submission is waiting to be processed by a worker.", color: "text-blue-500" },
    { id: 2, name: "Processing", description: "Worker has picked up the task and is executing the code.", color: "text-amber-500" },
    { id: 3, name: "Accepted", description: "The code executed successfully and the output matched the expected output.", color: "text-emerald-500" },
    { id: 4, name: "Wrong answer", description: "The code executed successfully, but the output did not match the expected output.", color: "text-red-500" },
    { id: 5, name: "TLE (Time limit exceeded)", description: "Execution time exceeded the time limit set for the challenge.", color: "text-orange-500"},
    { id: 6, name: "Compilation error", description: "The source code failed to compile/run.", color: "text-zinc-400"}


]

export default function StatusIdPage() {
    return (
        <div className="relative min-h-screen p-6 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <header className="mb-12 border-l-2 border-primary pl-6">
                    <h1 className="text-2xl font-mono font-bold tracking-tight uppercase">
                        Tests / <span className="text-muted-foreground">Status_IDs</span>
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground font-mono">
                        Standard reference for submission status codes returned by the Judge0 API. These codes indicate the result of code execution for each test case.
                    </p>
                </header>

                <div className="border border-border rounded-none bg-background">
                    <Table>
                        <TableHeader className="bg-secondary/50">
                            <TableRow className="border-b border-border hover:bg-transparent">
                                <TableHead className="w-[60px] font-mono text-[10px] uppercase text-muted-foreground py-4 px-6">
                                    ID
                                </TableHead>
                                <TableHead className="w-[200px] font-mono text-[10px] uppercase text-muted-foreground py-4 px-6">
                                    State
                                </TableHead>
                                 <TableHead className="font-mono text-[10px] uppercase text-muted-foreground py-4 px-6">
                                    Definition
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {statuses.map((status) => (
                                <TableRow key={status.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/10 transition-none">
                                    <TableCell className="font-mono text-xs text-muted-foreground px-6 py-4">
                                        {status.id.toString().padStart(2, '0')}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-mono font-bold uppercase tracking-tight ${status.color}`}>
                                                {status.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-[13px] font-mono text-muted-foreground px-6 py-4">
                                        {status.description}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}