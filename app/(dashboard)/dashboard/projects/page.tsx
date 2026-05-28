'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'


export default function ProjectsPage() {
  const { company } = useAppStore()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      if (!company?.id) return
      try {
        const response = await fetch(`/api/projects?company_id=${company.id}`)
        const { data } = await response.json()
        setProjects(data || [])
      } catch (error) {
        console.error('[v0] Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [company?.id])

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Projects"
        subtitle="Track your active projects"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <Card className="border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            No projects yet. Create your first project to get started.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <Card key={project.id} className="border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {project.description}
              </p>
              <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300">
                {project.status}
              </span>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
