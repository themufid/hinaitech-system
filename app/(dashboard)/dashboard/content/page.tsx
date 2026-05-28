'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'


export default function ContentPage() {
  const { company } = useAppStore()
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      if (!company?.id) return
      try {
        const response = await fetch(`/api/content?company_id=${company.id}`)
        const { data } = await response.json()
        setContent(data || [])
      } catch (error) {
        console.error('[v0] Error fetching content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [company?.id])

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Content"
        subtitle="Manage your content calendar"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading content...</p>
        </div>
      ) : content.length === 0 ? (
        <Card className="border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            No content scheduled yet. Create your first content piece.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.map((item: any) => (
            <Card key={item.id} className="border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {item.description}
              </p>
              <div className="space-y-2">
                <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300">
                  {item.content_type}
                </span>
                <p className="text-xs text-muted-foreground">
                  {item.scheduled_date
                    ? new Date(item.scheduled_date).toLocaleDateString()
                    : 'Not scheduled'}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
