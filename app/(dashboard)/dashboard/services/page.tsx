'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'

interface Service {
  id: string
  name: string
  category?: string
  description?: string
  base_price?: number
  duration_days?: number
  pricing_type?: string
  status: string
}


export default function ServicesPage() {
  const { company } = useAppStore()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      if (!company?.id) return

      try {
        const response = await fetch(`/api/services?company_id=${company.id}`)
        const { data } = await response.json()
        setServices(data || [])
      } catch (error) {
        console.error('[v0] Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [company?.id])

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <DashboardHeader
          title="Services"
          subtitle="Manage your service offerings"
        />
        <Link href="/dashboard/services/new">
          <Button className="bg-primary hover:bg-primary/90">
            New Service
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <Card className="border border-border bg-card p-12 text-center">
          <p className="mb-4 text-muted-foreground">No services yet. Create your first service offering.</p>
          <Link href="/dashboard/services/new">
            <Button className="bg-primary hover:bg-primary/90">
              Create Service
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="border border-border bg-card p-6 hover:border-primary transition-all">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {service.name}
              </h3>
              {service.category && (
                <p className="mb-2 text-sm text-muted-foreground">
                  {service.category}
                </p>
              )}
              {service.description && (
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              )}
              <div className="space-y-2">
                {service.base_price && (
                  <p className="text-sm font-semibold text-primary">
                    ${service.base_price.toFixed(2)}
                  </p>
                )}
                {service.duration_days && (
                  <p className="text-xs text-muted-foreground">
                    Duration: {service.duration_days} days
                  </p>
                )}
              </div>
              <div className="mt-4">
                <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-primary/20 text-primary">
                  {service.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
