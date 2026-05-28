'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import {
  ArrowRight,
  Cpu,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from 'lucide-react'

import { createClient } from '@/lib/supabase/client'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

export default function Page() {
  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [repeatPassword, setRepeatPassword] =
    useState('')

  const [error, setError] = useState<
    string | null
  >(null)

  const [isLoading, setIsLoading] =
    useState(false)

  const handleSignUp = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError(null)

    if (password !== repeatPassword) {
      setError(
        'Passwords do not match'
      )

      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env
                .NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
              `${window.location.origin}/auth/callback`,
          },
        })

      if (error) {
        throw error
      }

      router.push(
        '/auth/sign-up-success'
      )

      router.refresh()
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to create account'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_35%),linear-gradient(to_bottom,rgba(24,24,27,1),rgba(0,0,0,1))]" />

        {/* Animated Glows */}
        <div className="absolute left-[-100px] top-[-100px] h-[420px] w-[420px] animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] animate-pulse rounded-full bg-purple-500/20 blur-3xl" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      {/* LEFT PANEL */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-between border-r border-white/10 p-12 lg:flex">
        {/* Logo */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/20 shadow-[0_0_45px_rgba(6,182,212,0.35)] backdrop-blur-xl">
              <Cpu className="h-8 w-8 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-4xl font-black tracking-tight">
                HEROIC OS
              </h1>

              <p className="text-sm text-zinc-400">
                Future Business Operating
                System
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="max-w-2xl">
            <h2 className="text-6xl font-black leading-tight tracking-tight">
              Build Your
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}
                Digital Empire
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              The next-generation ERP
              ecosystem designed for
              startups, enterprises, and
              modern teams with AI-powered
              automation.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/10">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-cyan-500/10 p-3">
                <ShieldCheck className="h-6 w-6 text-cyan-400" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Enterprise Security
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  Advanced authentication,
                  encrypted cloud systems,
                  and protected infrastructure.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-purple-500/10 p-3">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>

              <div>
                <h3 className="font-semibold">
                  AI Workflow Automation
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  Automate operations,
                  analytics, CRM, and
                  business intelligence in
                  one ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIGNUP */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
          {/* TOP LINE */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <CardContent className="p-8 md:p-10">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20">
                <Cpu className="h-6 w-6 text-cyan-400" />
              </div>

              <div>
                <h1 className="text-2xl font-black">
                  HEROIC OS
                </h1>

                <p className="text-xs text-zinc-400">
                  Business Operating
                  System
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300">
                <UserPlus className="h-4 w-4" />

                Create Secure Account
              </div>

              <h2 className="text-4xl font-black tracking-tight">
                Sign Up
              </h2>

              <p className="mt-3 text-zinc-400">
                Create your HEROIC OS
                account and start building
                your digital business
                ecosystem.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSignUp}
              className="space-y-6"
            >
              {/* EMAIL */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Email Address
                </Label>

                <Input
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-zinc-500 focus-visible:border-cyan-500 focus-visible:ring-cyan-500"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Password
                </Label>

                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-zinc-500 focus-visible:border-cyan-500 focus-visible:ring-cyan-500"
                />
              </div>

              {/* REPEAT PASSWORD */}
              <div className="space-y-2">
                <Label className="text-zinc-300">
                  Repeat Password
                </Label>

                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={repeatPassword}
                  onChange={(e) =>
                    setRepeatPassword(
                      e.target.value
                    )
                  }
                  className="h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-zinc-500 focus-visible:border-cyan-500 focus-visible:ring-cyan-500"
                />
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={isLoading}
                className="group h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-base font-semibold text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-400"
              >
                {isLoading
                  ? 'Creating Account...'
                  : 'Create Account'}

                {!isLoading && (
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </Button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center text-sm text-zinc-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Login
              </Link>
            </div>

            {/* Bottom Security */}
            <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500">
              <LockKeyhole className="h-4 w-4" />
              Protected with secure cloud
              authentication
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}