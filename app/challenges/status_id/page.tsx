"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock } from "lucide-react";

const statuses = [
    {
        id: 1, name: "In Queue", description: "The submission is waiting to be processed by a worker.", color: "text-blue-400 border-blue-400/30 bg-blue-400/10", icon: Clock
    }
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
                                            <status.icon className={`w-3.5 h-3.5 ${status.color.split(' ')[0]}`} />
                                            <span className={`text-xs font-mono font-bold uppercase tracking-tight ${status.color.split(' ')[0]}`}>
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