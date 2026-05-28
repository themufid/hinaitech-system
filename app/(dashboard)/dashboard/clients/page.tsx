'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'


export default function ClientsPage() {
  const { company } = useAppStore()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      if (!company?.id) return
      try {
        const response = await fetch(`/api/clients?company_id=${company.id}`)
        const { data } = await response.json()
        setClients(data || [])
      } catch (error) {
        console.error('[v0] Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [company?.id])

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Clients"
        subtitle="Manage your client relationships"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading clients...</p>
        </div>
      ) : clients.length === 0 ? (
        <Card className="border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            No clients yet. Start by adding clients through the sales module.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client: any) => (
            <Card key={client.id} className="border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {client.name}
              </h3>
              {client.industry && (
                <p className="text-sm text-muted-foreground">{client.industry}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
