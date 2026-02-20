"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Flame, Github, Loader2, Slack, Terminal } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { useLogin, useOAuthLogin } from "@/hooks/use-auth";

// todo: add metadata (refactor this into a server component later)
// export const metadata = {
//  title: "Sign up | CodeApex",
//  description: "Create your CodeApex account and start your coding journey today!"
//}

const signinSchema = z.object({
        password: z
            .string(),
        email: z
            .string()
            .min(1, "Email is required!")
            .email("Invalid email address."),
})

type SigninFormData = z.infer<typeof signinSchema>

export default function SigninPage() {
  const signinMutation = useLogin()
  const oauthMutation = useOAuthLogin()

  const {
    register, 
    handleSubmit, 
    formState: {
        errors, 
        isSubmitting
    },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema)
  })

  const onSubmit = async(data: SigninFormData) => {
    signinMutation.mutate(data)
  }

  const handleOAuth = (provider: "slack_oidc" | "github") => {
    oauthMutation.mutate(provider)
  }

  const isLoading = signinMutation.isPending || oauthMutation.isPending

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
            Welcome back!
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Happy to see you come back!
          </p>
        </div>
      </div>
      <Card className="bg-card/50 border-border/50 w-full max-w-md">
        <CardContent className="p-6">
          {signinMutation.isError && (
            <div className="mb-4 p-4 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                {signinMutation.error?.message || "Something went wrong."}
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={"outline"}
              type="button"
              disabled={isLoading}
              onClick={() => handleOAuth("github")}
              className="bg-transparent border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 gap-2"
            >
              {oauthMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ): (
                <Github className="w-4 h-4" />
              )}
              Github
            </Button>
            <Button
              variant={"outline"}
              type="button"
              disabled={isLoading}
              onClick={() => handleOAuth("slack_oidc")}
              className="bg-transparent border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 gap-2"
            >
              {oauthMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ): (
                <Slack className="w-4 h-4" />
              )}
              Slack
            </Button>
          </div>
          <div className="relative my-6">
            <Separator className="opacity-30" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="mt-4 text-center text-[11px] text-muted-foreground/60 leading-relaxed">
              Hi there, unfortunately email signin is in maintenance. Please bear with me! Until Nest is back up, continue with either Slack or Github.
            </p>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={true}
                placeholder="daemon@codeapex.dev"
                className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-sm focus-visible:ring-primary/50"
              />
              {errors.email && (
                    <p className="text-xs text-destructive">
                        {errors.email?.message}
                    </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                disabled={true}
                {...register("password")}
                className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 font-mono text-sm focus-visible:ring-primary/50"
              />
              {errors.password && (
                    <p className="text-xs text-destructive">
                        {errors.password?.message}
                    </p>
              )}
            </div>

            <Button
                type="submit"
                disabled={true}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 doom-glow"
            >
                {signinMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin " />
                ): (
                  <Flame className="w-4 h-4" />
                )}
                {signinMutation.isPending ? "Login in..." : "Login"}
            </Button>
          </form>

        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        You do not have an account?{" "}
        <Link
            href="/signup"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
            Sign up
        </Link>
      </p>

    </div>
  );
}
