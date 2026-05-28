'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'
import LeadsKanban from '@/components/leads/leads-kanban'


export default function LeadsPage() {
  const { company } = useAppStore()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      if (!company?.id) return

      try {
        const response = await fetch(`/api/leads?company_id=${company.id}`)
        const { data } = await response.json()
        setLeads(data || [])
      } catch (error) {
        console.error('[v0] Error fetching leads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [company?.id])

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <DashboardHeader
          title="Leads"
          subtitle="Manage your sales pipeline"
        />
        <Link href="/dashboard/leads/new">
          <Button className="bg-primary hover:bg-primary/90">
            New Lead
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <Card className="border border-border bg-card p-12 text-center">
          <p className="mb-4 text-muted-foreground">No leads yet. Start by adding your first lead.</p>
          <Link href="/dashboard/leads/new">
            <Button className="bg-primary hover:bg-primary/90">
              Add First Lead
            </Button>
          </Link>
        </Card>
      ) : (
        <LeadsKanban leads={leads} />
      )}
    </div>
  )
}
