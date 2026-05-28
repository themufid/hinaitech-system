'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'

interface QuotationData {
  id: string
  quote_number: string
  total_amount: number
  status: string
  created_at: string
}

interface InvoiceData {
  id: string
  invoice_number: string
  total_amount: number
  status: string
  due_date: string
}

interface ContractData {
  id: string
  contract_number: string
  client_name: string
  contract_value: number
  status: string
  start_date: string
  end_date: string
}


export default function SalesPage() {
  const { company } = useAppStore()
  const [quotations, setQuotations] = useState<QuotationData[]>([])
  const [invoices, setInvoices] = useState<InvoiceData[]>([])
  const [contracts, setContracts] = useState<ContractData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!company?.id) return

      try {
        const [quotRes, invRes, conRes] = await Promise.all([
          fetch(`/api/quotations?company_id=${company.id}`),
          fetch(`/api/invoices?company_id=${company.id}`),
          fetch(`/api/contracts?company_id=${company.id}`),
        ])

        const quotData = await quotRes.json()
        const invData = await invRes.json()
        const conData = await conRes.json()

        setQuotations(quotData.data || [])
        setInvoices(invData.data || [])
        setContracts(conData.data || [])
      } catch (error) {
        console.error('[v0] Error fetching sales data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSalesData()
  }, [company?.id])

  const getTotalRevenue = () => {
    return invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0)
  }

  const getPendingAmount = () => {
    return quotations
      .filter((q) => q.status === 'proposal')
      .reduce((sum, q) => sum + (q.total_amount || 0), 0)
  }

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Sales"
        subtitle="Manage quotations, invoices, and contracts"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading sales data...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-primary">
                ${getTotalRevenue().toFixed(2)}
              </h3>
            </Card>
            <Card className="border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Pending Proposals</p>
              <h3 className="text-2xl font-bold text-foreground">
                ${getPendingAmount().toFixed(2)}
              </h3>
            </Card>
            <Card className="border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Active Contracts</p>
              <h3 className="text-2xl font-bold text-foreground">
                {contracts.filter((c) => c.status === 'active').length}
              </h3>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Quotations */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Quotations ({quotations.length})
                </h2>
                <Link href="/dashboard/sales/quotations/new">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    New
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                {quotations.slice(0, 5).map((q) => (
                  <Card key={q.id} className="border border-border bg-card p-4">
                    <p className="font-semibold text-foreground text-sm">
                      {q.quote_number}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      ${q.total_amount.toFixed(2)}
                    </p>
                    <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300">
                      {q.status}
                    </span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Invoices */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Invoices ({invoices.length})
                </h2>
                <Link href="/dashboard/sales/invoices/new">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    New
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                {invoices.slice(0, 5).map((inv) => (
                  <Card key={inv.id} className="border border-border bg-card p-4">
                    <p className="font-semibold text-foreground text-sm">
                      {inv.invoice_number}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      ${inv.total_amount.toFixed(2)}
                    </p>
                    <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-300">
                      {inv.status}
                    </span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contracts */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Contracts ({contracts.length})
                </h2>
                <Link href="/dashboard/sales/contracts/new">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    New
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                {contracts.slice(0, 5).map((c) => (
                  <Card key={c.id} className="border border-border bg-card p-4">
                    <p className="font-semibold text-foreground text-sm">
                      {c.client_name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      ${c.contract_value?.toFixed(2) || '0.00'}
                    </p>
                    <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300">
                      {c.status}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
