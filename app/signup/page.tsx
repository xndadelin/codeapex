import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Flame, Github, Slack, Terminal } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mb-8 self-start w-full max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 border border-primary/20">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Code<span className="text-primary">Apex</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Begin your coding journey!
          </p>
        </div>
      </div>
      <Card className="bg-card/50 border-border/50 doom-border-glow w-full max-w-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={"outline"}
              className="bg-transparent border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 gap-2"
            >
              <Github className="w-4 h-4" />
              Github
            </Button>
            <Button
              variant={"outline"}
              className="bg-transparent border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 gap-2"
            >
              <Slack className="w-4 h-4" />
              Slack
            </Button>
          </div>
          <div className="relative my-6">
            <Separator className="opacity-30" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              or
            </span>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-foreground">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Orpheus"
                className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-sm focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="daemon@codeapex.dev"
                className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-sm focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-sm focus-visible:ring-primary/50"
              />
            </div>

            <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 doom-glow"
            >
                <Flame className="w-4 h-4" />
                Create account
            </Button>
          </form>

          <p className="mt-4 text-center text-[11px] text-muted-foreground/60 leading-relaxed">
            Hi there! By creating an account, you agree to our{" "}
            <Link href="/tos" className="text-primary/70 hover:text-primary transition-colors">
                Terms of Service
            </Link>{" "}and{" "}
            <Link href="pp" className="text-primary/70 hover:text-primary transition-colors">
                Privacy policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
            Sign in
        </Link>
      </p>

    </div>
  );
}
