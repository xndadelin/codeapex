'use client'

import Loading from "@/app/loading";
import { useChallenge } from "@/hooks/use-challenges";
import { UUID } from "crypto";
import { ArrowLeft, BookOpen, Lightbulb, Play, Send, Terminal } from "lucide-react";
import Error from "next/error";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const difficultyColors: Record<string, string> = {
    "Easy": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    "Medium": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "Hard": "text-red-400 border-red-400/30 bg-red-400/10"
}


export default function ChallengePage() {
    const { id } = useParams()
    const { data: challenge, isLoading } = useChallenge(id as UUID)
    const [activeTab, setActiveTab] = useState("description")

    if(isLoading) {
        return <Loading />
    }

    if(!challenge) {
        return <Error statusCode={404} />
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-50 border-b border-border/50">
                <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/challenges"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                Challenges
                            </span>
                        </Link>
                        <Separator orientation="vertical"  />
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-semibold text-foreground">
                                {challenge.title}
                            </h1>
                            <Badge variant={"outline"} className={`text-[9px] font-mono ${difficultyColors[challenge.difficulty]}`}>
                                {challenge.difficulty}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant={"outline"}
                            className="bg-transparent border-border/50 text-muted-foreground hover:text-foreground gap-1.5 text-xs"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Run
                        </Button>
                        <Button
                            size="sm"
                            variant={"outline"}
                            className="bg-transparent border-border/50 text-muted-foreground hover:text-foreground gap-1.5 text-xs"
                        >
                            <Send className="w-3.5 h-3.5" />
                            Submit
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex-1 grid lg:grid-cols-2 divide-x divide-border/40">
                <div className="flex flex-col overflow-hidden">
                    <Tabs className="bg-transparent h-10 p-0 gap-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
                            <div className="border-b border-border/40">
                                <TabsList className="bg-transparent h-10 gap-0 p-0">
                                    <TabsTrigger value="description" className="text-xs font-mono data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5" />
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger value="hints" className="text-xs font-mono data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 gap-1.5">
                                        <Lightbulb className="w-3.5 h-3.5" />
                                        Hints
                                    </TabsTrigger>
                                    <TabsTrigger value="submissions" className="text-xs font-mono data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 gap-1.5">
                                        <Terminal className="w-3.5 h-3.5" />
                                        Submissions
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <TabsContent value="description" className="p-6 m-0">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <Badge variant={"secondary"} className="text-[10px] font-mono bg-secondary/60 text-muted-foreground border-0">
                                            {challenge.category}
                                        </Badge>
                                        {challenge.tags.map((tag) => (
                                            <Badge key={tag} variant={"outline"} className="text-[10px] font-mono border-border/40 text-muted-foreground">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    
                                    <div className="prose prose-invert max-w-none mb-8">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {challenge.description}
                                        </ReactMarkdown>
                                    </div>

                                    <div className="space-y-6">
                                        {challenge.test_cases?.map((testCase, index) => (
                                            <div key={index} className="rounded-lg border border-border/40 bg-secondary/20 overflow-hidden">
                                                <div className="px-4 py-2 border-b border-border/30 bg-secondary">
                                                    <span className="text-xs font-mono text-muted-foreground">
                                                        Sample #{index + 1}
                                                    </span>                                                
                                                </div>
                                                <div className="p-4 space-y-2 font-mono text-sm">
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Input: 
                                                        </span>
                                                        <pre className="bg-transparent text-foreground p-2 rounded-md overflow-x-auto">
                                                            {testCase.input}
                                                        </pre>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Output: 
                                                        </span>
                                                        <pre className="bg-transparent text-foreground p-2 rounded-md overflow-x-auto">
                                                            {testCase.output}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-sm font-semibold text-foreground mb-3">
                                            Constraints
                                        </h3>
                                         <div className="prose prose-invert max-w-none mb-8">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {challenge.constraints}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}