'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

import DashboardHeader from '@/components/dashboard/header'
import RecentActivity from '@/components/dashboard/recent-activity'
import StatCard from '@/components/dashboard/stat-card'

import { useAppStore } from '@/lib/store'

type RealtimeMetric = {
  revenue: number
  leads: number
  projects: number
  activity: number
}

export default function DashboardPage() {
  /**
   * Zustand Store
   */
  const user = useAppStore(
    (state) => state.user
  )

  const company = useAppStore(
    (state) => state.company
  )

  /**
   * User Fullname
   */
  const fullName = [
    user?.first_name,
    user?.last_name,
  ]
    .filter(Boolean)
    .join(' ')

  /**
   * Live Clock
   */
  const [currentTime, setCurrentTime] =
    useState('')

  /**
   * Simulated Realtime Metrics
   */
  const [metrics, setMetrics] =
    useState<RealtimeMetric>({
      revenue: 152400000,
      leads: 284,
      projects: 18,
      activity: 96,
    })

  /**
   * Animate Revenue Growth
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        revenue:
          prev.revenue +
          Math.floor(Math.random() * 250000),

        leads:
          prev.leads +
          Math.floor(Math.random() * 2),

        projects:
          prev.projects,

        activity:
          90 + Math.floor(Math.random() * 10),
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  /**
   * Live Clock
   */
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()

      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }

    updateClock()

    const timer = setInterval(
      updateClock,
      1000
    )

    return () => clearInterval(timer)
  }, [])

  /**
   * Currency Format
   */
  const formattedRevenue = useMemo(() => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(metrics.revenue)
  }, [metrics.revenue])

  /**
   * Dashboard Stats
   */
  const stats = [
    {
      label: 'Total Revenue',
      value: formattedRevenue,
      change: '+18.4%',
      icon: 'trending-up',
    },

    {
      label: 'Active Leads',
      value: metrics.leads.toString(),
      change: '+24',
      icon: 'users',
    },

    {
      label: 'Open Projects',
      value: metrics.projects.toString(),
      change: '+3',
      icon: 'briefcase',
    },

    {
      label: 'Team Members',
      value: '24',
      change: '+5',
      icon: 'team',
    },
  ] as const

  /**
   * Quick Features
   */
  const quickFeatures = [
    {
      title: 'AI Automation',
      description:
        'Smart workflow automation & AI business assistant',
      icon: Zap,
    },

    {
      title: 'CRM Pipeline',
      description:
        'Manage clients, leads & sales conversion',
      icon: Users,
    },

    {
      title: 'Finance Tracking',
      description:
        'Realtime revenue, invoices & reports',
      icon: DollarSign,
    },

    {
      title: 'Project Control',
      description:
        'Monitor tasks, SOP & team productivity',
      icon: BriefcaseBusiness,
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Orbs */}
        <div className="absolute left-20 top-40 h-4 w-4 animate-pulse rounded-full bg-cyan-400" />

        <div className="absolute right-40 top-52 h-3 w-3 animate-ping rounded-full bg-blue-400" />

        <div className="absolute bottom-32 left-1/3 h-5 w-5 animate-pulse rounded-full bg-purple-400" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <DashboardHeader
          title="Welcome back"
          subtitle={
            fullName ||
            user?.email ||
            'Heroic Team'
          }
          company={
            company?.name ??
            'PT. Heroic Inovasi Nusantara'
          }
        />

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950/80 to-black p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
          {/* Animated Glow */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Top Bar */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />

              AI Powered Enterprise System
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5 py-3 backdrop-blur-xl">
              <CalendarClock className="h-5 w-5 text-cyan-400" />

              <div>
                <p className="text-xs text-zinc-400">
                  Live Server Time
                </p>

                <p className="font-semibold text-white">
                  {currentTime}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
            {/* Left */}
            <div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Next Generation
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Business Operating
                  System
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                HEROIC OS membantu
                perusahaan mengelola
                finance, CRM, projects,
                automation, HR, analytics,
                content management, AI
                workflow, dan business
                monitoring secara realtime
                dalam satu dashboard modern.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:scale-105">
                  Open Analytics

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 px-6 py-3 font-semibold text-zinc-300 transition-all hover:border-cyan-500/40 hover:bg-zinc-800">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  Live Monitoring
                </button>
              </div>

              {/* Quick Feature Cards */}
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {quickFeatures.map(
                  (feature, index) => {
                    const Icon =
                      feature.icon

                    return (
                      <div
                        key={index}
                        className="group rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-zinc-900/70"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                          <Icon className="h-6 w-6" />
                        </div>

                        <h3 className="font-semibold text-white">
                          {feature.title}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                          {
                            feature.description
                          }
                        </p>
                      </div>
                    )
                  }
                )}
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-5">
              {/* Revenue Card */}
              <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-zinc-900/80 p-6 backdrop-blur-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-emerald-300">
                      Total Revenue
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      {formattedRevenue}
                    </h2>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                      +18.4% this month
                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
                    <DollarSign className="h-7 w-7" />
                  </div>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <Users className="h-6 w-6 text-cyan-400" />

                    <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400">
                      Live
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold">
                    {metrics.leads}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Active Leads
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <BriefcaseBusiness className="h-6 w-6 text-blue-400" />

                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                      Active
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold">
                    {metrics.projects}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Projects
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <Activity className="h-6 w-6 text-orange-400" />

                    <span className="rounded-full bg-orange-500/10 px-2 py-1 text-xs text-orange-400">
                      Realtime
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold">
                    {metrics.activity}%
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    System Health
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />

                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                      Stable
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold">
                    99.9%
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Uptime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              change={item.change}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Analytics + Activity */}
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Analytics */}
          <div className="xl:col-span-2">
            <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-2xl">
              {/* Header */}
              <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    Business Analytics
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    Live realtime monitoring
                    for company growth &
                    performance
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                  <TrendingUp className="h-4 w-4" />
                  Live Analytics
                </div>
              </div>

              {/* Fake Live Graph */}
              <div className="relative overflow-hidden rounded-[28px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8">
                {/* Glow */}
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Animated Bars */}
                <div className="relative z-10 flex h-[320px] items-end justify-between gap-3">
                  {[40, 60, 45, 80, 55, 95, 75, 110, 90, 140].map(
                    (
                      height,
                      index
                    ) => (
                      <div
                        key={index}
                        className="relative flex flex-1 items-end"
                      >
                        <div
                          className="w-full animate-pulse rounded-t-2xl bg-gradient-to-t from-cyan-500 via-blue-500 to-cyan-300 shadow-lg shadow-cyan-500/20"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}