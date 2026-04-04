'use client'

import Loading from "@/app/loading";
import { useChallenge } from "@/hooks/use-challenges";
import { ArrowLeft, BookOpen, ChevronDown, Lightbulb, Play, Send, Terminal, XCircle, XSquare } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import Editor from "@monaco-editor/react"
import SubmissionResults from "@/components/submission-results";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSubmissionResultsLines } from "@/hooks/use-submissions";
import { TableHeader, Table, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// to do add hints dont forget, for now its hardcoded lmao

const difficultyColors: Record<string, string> = {
    "Easy": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    "Medium": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "Hard": "text-red-400 border-red-400/30 bg-red-400/10"
}

const possibleLanguages = [
    'Python 3',
    'C/C++'
]


interface TestResult {
    input: string,
    status: string,
    accepted: string,
    time: string | null,
    memory: number | null
    output: string
    status_id: number | null
}

interface SubmissionResultsProps {
    results: TestResult[]
    isLoading?: boolean,
    error: string | null
}

interface SubmissionLine {
    id: string,
    user_id: string,
    challenge_id: string, 
    status_id: string,
    created_at: Date,
    total_tests: number,
    passed_tests: number
    overall_status: string
}


export default function ChallengePage() {
    const { id } = useParams()
    const { data: challenge, isLoading } = useChallenge(id as string)
    const [activeTab, setActiveTab] = useState("description")
    const [language, setLanguage] = useState(possibleLanguages[0])
    const [code, setCode] = useState("")
    const [submissionResults, setResults] = useState<SubmissionResultsProps>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const { data: submissions, isLoading: isLoadingSubmissions, isError: isErrorSubmissions } = useSubmissionResultsLines(id as string)

    if(isLoading) {
        return <Loading />
    }

    if(!challenge) {
        return <Error statusCode={404} />
    }

    const onHandleSubmit = async () => {
        setIsSubmitting(true)
        setShowResults(true)
        const res = await fetch("/api/test_code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code,
                language,
                challengeId: id
            })
        })

        const data = await res.json()
        if(data.error) {
            setResults({
                results: [],
                error: data.error
            })
        } else {
            setResults({
                results: data.results,
                error: null
            })
        }
        setIsSubmitting(false)
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
                            className="bg-transparent cursor-pointer border-border/50 text-muted-foreground hover:text-foreground gap-1.5 text-xs"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Run
                        </Button>
                        <Button
                            size="sm"
                            variant={"outline"}
                            className="bg-transparent cursor-pointer border-border/50 text-muted-foreground hover:text-foreground gap-1.5 text-xs"
                            onClick={onHandleSubmit}
                        >
                            <Send className="w-3.5 h-3.5" />
                            Submit
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex-1 grid lg:grid-cols-2 divide-x divide-border/40">
                <div className="flex flex-col overflow-hidden">
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
                                    
                                    <div className="font-mono prose prose-invert max-w-none text-sm mb-8">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml={false}>
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
                                         <div className="max-w-none mb-8 font-mono">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {challenge.constraints}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </TabsContent>

                               <TabsContent value="hints" className="p-6 m-0">
                                    <div className="space-y-4">
                                        <Card className="bg-card/50 border-border/40">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Lightbulb className="w-3.5 h-3.5" />
                                                    <span className="text-sm font-semibold text-foreground">
                                                        Hint 1
                                                    </span>
                                                </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        idk man just do it
                                                    </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-card/50 border-border/40">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Lightbulb className="w-3.5 h-3.5" />
                                                    <span className="text-sm font-semibold text-foreground">
                                                        Hint 2
                                                    </span>
                                                </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        idk man just do it x2
                                                    </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                               </TabsContent>

                              <TabsContent value='submissions' className="p-6 m-0">
                                   {isLoadingSubmissions ? (
                                      <Loading />
                                   ): submissions && submissions.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="hover:bg-transparent border-border/40">
                                                    <TableHead className="w-[100px] text-[10px] uppercase font-mono">
                                                        Status
                                                    </TableHead>
                                                    <TableHead className="text-[10px] uppercase font-mono text-center">
                                                        Score
                                                    </TableHead>
                                                    <TableHead className="text-[10px] uppercase font-mono text-right">
                                                        Date
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {submissions.map((sub: SubmissionLine) => {
                                                    const percentage = sub.total_tests > 0 ? Math.round((sub.passed_tests / sub.total_tests) * 100) : 0
                                                    const isPassed = sub.overall_status === 'Accepted' || percentage === 100

                                                    return (
                                                        <TableRow key={sub.id} className="border-border/20 hover:bg-secondary/10 transition-all cursor-pointer drop">
                                                            <TableCell className="py-4 pl-6">
                                                                <div className="flex flex-col gap-1">
                                                                    <span className={`text-[11px] font-bold font-mono tracking-tight ${
                                                                        isPassed ? "text-emerald-400" : "text-red-400"
                                                                    }`}>
                                                                        {sub.overall_status || (percentage === 100 ? "Accepted" : "Failed" )}
                                                                    </span>
                                                                    <span className="text-[9px] text-muted-foreground font-mono">
                                                                        ID: {sub.id.slice(0,9)}
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <div className="flex flex-col items-center gap-1.5">
                                                                    <div className="flex items-end gap-1 font-mono">
                                                                        <span className="text-sm font-bold leading-none">
                                                                            {percentage}%
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">
                                                                        {sub.passed_tests} / {sub.total_tests} tests
                                                                    </span>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell className="py-4 pr-6 text-right">
                                                                <div className="flex flex-col items-end gap-1 font-mono">
                                                                    <span className="text-[11px] text-foreground">
                                                                        {new Date(sub.created_at).toLocaleDateString(undefined, {
                                                                            month: "short",
                                                                            day: "numeric"
                                                                        })}
                                                                    </span>
                                                                    <span className="text-[10px] text-muted-foreground">
                                                                        {new Date(sub.created_at).toLocaleDateString(undefined, {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                   ) : (
                                    <div className="flex flex-col items-center justify-center py-20 opacity-40">
                                        <XCircle className="w-10 h-10 mb-4 stroke-[1px]" />
                                        <p className="text-xs font-mono tracking-tighter">
                                            No attempts recorded for this challenge yet.
                                        </p>
                                    </div>
                                   )}
                              </TabsContent>

                            </div>
                        </Tabs>
                </div>

                <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border/40 px-4 py-2">
                            <div className="flex items-center gap-2">
                               <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-secondary/40 border border-border/50 text-xs font-mono px-2 rounded-md outline-none focus:border-primary transition-colors"
                                >
                                    {possibleLanguages.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                    ))}
                                </select>
                            </div>
                    </div>
                                         <div className="flex-1 overflow-auto">
                        <Editor
                            height={"100%"}
                            theme="vs-dark"
                            language={language === "Python 3" ? "python" : language === "C/C++" ? "cpp" : "plaintext"}
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                fontSize: 14,
                                fontFamily: 'JetBrains Mono, monospace',
                                minimap: {
                                    enabled: false
                                },
                                scrollBeyondLastLine: false,
                                automaticLayout: true
                            }}
                        />
                     </div>
                </div>
                <Dialog open={showResults} onOpenChange={setShowResults}>
                    <DialogContent className="w-[95vw] max-w-[95vw] max-w-[95vw]  max-h-[80vh] overflow-y-auto bg-background border-border/60">
                        <DialogHeader>
                            <DialogTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                                Submission results
                            </DialogTitle>
                        </DialogHeader>
                        <SubmissionResults results={submissionResults?.results || []} isLoading={isSubmitting} error={null} />
                        {(!submissionResults || submissionResults.error)  && !isSubmitting && (
                            <div className="flex flex-col items-center justify-center py-12 gap-3">
                                <XSquare className="w-12 h-12 text-red-400" />
                                <span className="text-sm text-muted-foreground">
                                    An error has occured while processing your submission. Please try again later.
                                    {submissionResults?.error && (
                                        <div className="mt-2 text-xs text-red-400 text-center">
                                            {submissionResults.error}
                                        </div>
                                    )}
                                </span>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}