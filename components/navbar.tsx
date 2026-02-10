"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Terminal, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    const navLinks = [
        { label: "Challenges", href: "/challenges" },
        { label: "Submissions", href: "/submissions" },
        { label: "Leaderboard", href: "/leaderboard" },
    ]

    return (
        <header
            className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
        >
            <nav 
                className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
            >
                <Link 
                    href="/"
                    className="flex items-center gap-2 group"
                >   
                    <div
                        className="relative flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors"
                    >
                        <Terminal className="w-5 h-5 text-primary" />
                    </div>
                    <span
                        className="text-lg font-bold tracking-tight text-foreground"
                    >
                        Code<span className="text-primary">Apex</span>
                    </span>
                </Link>
                <div
                    className="hidden md:flex items-center gap-8"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div
                    className="hidden md:flex items-center gap-3"
                >
                    <Button
                        variant={"ghost"}
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        asChild
                    >
                        <Link href="/login">
                            Sign In
                        </Link>
                    </Button>
                    <Button
                        size={"sm"}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5" asChild
                    >
                        <Link href={"/signup"}>
                            <Flame className="w-4 h-4" />
                            Get started
                        </Link>
                    </Button>
                </div>

                <button
                    type="button"
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? 
                        <X className="w-5 h-5" /> : 
                        <Menu className="w-5 h-5" />
                    }
                </button>
            </nav>

            {mobileOpen && (
                <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
                    <div className="flex flex-col px-6 py-4 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => 
                                    setMobileOpen(false)
                                }
                                className="py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-4 border-5 border-border/50 mt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start text-muted-foreground"
                                asChild
                            >
                                <Link href={"/login"}>
                                    Sign In
                                </Link>
                            </Button>
                            <Button
                                size={"sm"}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5" asChild
                            >
                                <Link href={"/signup"}>
                                    <Flame className="w-4 h-4" />
                                    Get started
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}