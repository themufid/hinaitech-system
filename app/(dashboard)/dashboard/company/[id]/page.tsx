'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CompanyForm from '@/components/company/company-form'
import DashboardHeader from '@/components/dashboard/header'


export default function CompanyDetailPage() {
  const params = useParams()
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`/api/companies/${params.id}`)
        const { data } = await response.json()
        setCompany(data)
      } catch (error) {
        console.error('[v0] Error fetching company:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCompany()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading company details...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Company not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Edit Company"
        subtitle={company.name}
      />
      <CompanyForm
        initialData={company}
        isEditing={true}
        companyId={params.id as string}
      />
    </div>
  )
}
