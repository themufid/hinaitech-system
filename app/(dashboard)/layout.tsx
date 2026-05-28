
'use client'

import { useEffect, useState } from 'react'

import DashboardNav from '@/components/dashboard/nav'

import DashboardSidebar from '@/components/dashboard/sidebar'

import { useAppStore } from '@/lib/store'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /**
   * Zustand Store
   */
  const setUser = useAppStore(
    (state) => state.setUser
  )

  const setCompany = useAppStore(
    (state) => state.setCompany
  )

  const setLoading = useAppStore(
    (state) => state.setLoading
  )

  /**
   * Ready State
   */
  const [isReady, setIsReady] =
    useState(false)

  /**
   * Initialize
   */
  useEffect(() => {
    let mounted = true

    const initializeDashboard =
      async () => {
        try {
          setLoading(true)

          /**
           * Small delay
           */
          await new Promise((resolve) =>
            setTimeout(resolve, 300)
          )

          /**
           * Default User
           */
          setUser({
            id: 'heroic-user',

            email:
              'admin@hinaitech.com',

            first_name: 'Heroic',

            last_name: 'Admin',

            role: 'admin',

            company_id:
              'heroic-company',

            avatar_url: '',
          })

          /**
           * Default Company
           */
          setCompany({
            id: 'heroic-company',

            name:
              'PT. Heroic Inovasi Nusantara',

            slug: 'heroic-os',

            logo_url: '',

            industry: 'Technology',
          })

          if (mounted) {
            setIsReady(true)
          }
        } catch (error) {
          console.error(
            '[HEROIC OS] Layout Error:',
            error
          )

          if (mounted) {
            setIsReady(true)
          }
        } finally {
          if (mounted) {
            setLoading(false)
          }
        }
      }

    initializeDashboard()

    return () => {
      mounted = false
    }
  }, [
    setCompany,
    setLoading,
    setUser,
  ])

  /**
   * Loading Screen
   */
  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center overflow-hidden bg-black">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_40%)]" />

        {/* Loader */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6 h-16 w-16">
            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />

            <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-400" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            HEROIC OS
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Initializing dashboard...
          </p>
        </div>
      </div>
    )
  }

  /**
   * Main Layout
   */
  return (
    <div className="flex min-h-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navigation */}
        <DashboardNav />

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-zinc-950 via-black to-black">
          <div className="mx-auto w-full max-w-[1920px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

