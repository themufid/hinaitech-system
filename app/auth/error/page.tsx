'use client'

import { Suspense } from 'react'

import Link from 'next/link'

import { useSearchParams } from 'next/navigation'

import {
  AlertCircle,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/**
 * CONTENT
 */
function AuthErrorContent() {
  const searchParams = useSearchParams()

  const error =
    searchParams.get('error') ??
    'Authentication Error'

  const description =
    searchParams.get(
      'error_description'
    ) ??
    'An unexpected authentication error occurred.'

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-black px-6 py-10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow 1 */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

        {/* Glow 2 */}
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-3xl" />

        {/* Glow 3 */}
        <div className="absolute left-0 top-1/2 h-[350px] w-[350px] rounded-full bg-pink-500/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="overflow-hidden border border-red-500/20 bg-zinc-950/80 shadow-2xl backdrop-blur-2xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />

          <CardHeader className="relative z-10 text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 shadow-lg shadow-red-500/10">
              <ShieldAlert className="h-12 w-12 text-red-400" />
            </div>

            {/* Title */}
            <CardTitle className="text-3xl font-bold text-white">
              Authentication Error
            </CardTitle>

            {/* Subtitle */}
            <CardDescription className="mt-2 text-zinc-400">
              Something went wrong while
              processing your authentication.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            {/* Error */}
            <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4" />

                <span className="text-sm font-semibold">
                  {error}
                </span>
              </div>

              <p className="break-words text-sm leading-relaxed text-red-200">
                {description}
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="block"
              >
                <Button className="h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30">
                  Back to Login
                </Button>
              </Link>

              <Link
                href="/auth/sign-up"
                className="block"
              >
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-2xl border-zinc-700 bg-zinc-900/70 text-zinc-200 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800"
                >
                  Create New Account
                </Button>
              </Link>

              <Link
                href="/"
                className="block"
              >
                <Button
                  variant="ghost"
                  className="h-12 w-full rounded-2xl text-zinc-400 hover:bg-zinc-900 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />

                  Back to Homepage
                </Button>
              </Link>
            </div>

            {/* Footer */}
            <div className="pt-2 text-center">
              <p className="text-xs text-zinc-500">
                HEROIC OS Secure Authentication
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * PAGE
 */
export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-5">
            {/* Loader */}
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />

              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-400" />

              <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/10" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                HEROIC OS
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Loading authentication...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  )
}