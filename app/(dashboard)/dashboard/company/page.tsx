'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Building2,
  ExternalLink,
  Globe,
  Plus,
  Sparkles,
} from 'lucide-react'

import DashboardHeader from '@/components/dashboard/header'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

interface Company {
  id: string

  name: string

  slug: string

  industry?: string | null

  website?: string | null

  company_size?: string | null

  status: string
}

export default function CompanyPage() {
  const router = useRouter()

  const [companies, setCompanies] =
    useState<Company[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    let mounted = true

    const fetchCompanies = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          '/api/companies',
          {
            cache: 'no-store',
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch companies'
          )
        }

        const result =
          await response.json()

        if (!mounted) return

        setCompanies(result.data || [])
      } catch (error) {
        console.error(
          '[HEROIC OS] Fetch Companies Error:',
          error
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchCompanies()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <DashboardHeader
            title="Company"
            subtitle="Manage your company profiles"
          />

          <Button
            onClick={() =>
              router.push(
                '/dashboard/company/new'
              )
            }
            className="h-11 rounded-2xl bg-cyan-500 text-black transition-all hover:scale-[1.02] hover:bg-cyan-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Company
          </Button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900/40"
                />
              )
            )}
          </div>
        ) : companies.length === 0 ? (
          /* Empty State */
          <Card className="overflow-hidden border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
            <CardContent className="relative flex flex-col items-center justify-center px-6 py-20 text-center">
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_45%)]" />

              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-500/20 bg-cyan-500/10">
                  <Building2 className="h-12 w-12 text-cyan-400" />
                </div>

                <h2 className="text-3xl font-bold">
                  No Companies Yet
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                  Create your first company
                  profile to manage legal
                  documents, branding,
                  finance, projects, content,
                  and business operations
                  inside HEROIC OS.
                </p>

                <Button
                  onClick={() =>
                    router.push(
                      '/dashboard/company/new'
                    )
                  }
                  className="mt-8 h-12 rounded-2xl bg-cyan-500 px-8 text-black hover:bg-cyan-400"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Company
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Company Grid */
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {companies.map((company) => (
              <Card
                key={company.id}
                onClick={() =>
                  router.push(
                    `/dashboard/company/${company.id}`
                  )
                }
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardContent className="relative z-10 p-6">
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                        <Building2 className="h-7 w-7 text-cyan-400" />
                      </div>

                      <h3 className="truncate text-xl font-bold text-white">
                        {company.name}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        {company.industry ||
                          'Technology'}
                      </p>
                    </div>

                    <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                      {company.status ||
                        'active'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                      <div>
                        <p className="text-xs text-zinc-500">
                          Company Size
                        </p>

                        <p className="mt-1 text-sm font-medium text-white">
                          {company.company_size ||
                            '1-10'}
                        </p>
                      </div>

                      <Sparkles className="h-5 w-5 text-cyan-400" />
                    </div>

                    {company.website && (
                      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                            <Globe className="h-5 w-5 text-cyan-400" />
                          </div>

                          <div>
                            <p className="text-xs text-zinc-500">
                              Website
                            </p>

                            <p className="max-w-[160px] truncate text-sm text-white">
                              {company.website}
                            </p>
                          </div>
                        </div>

                        {/* FIX NESTED A */}
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="flex items-center gap-1 text-sm text-cyan-400 hover:underline"
                        >
                          Visit

                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}