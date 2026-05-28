'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'


export default function FinancePage() {
  const { company } = useAppStore()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)

  useEffect(() => {
    const fetchFinanceData = async () => {
      if (!company?.id) return
      try {
        const response = await fetch(`/api/transactions?company_id=${company.id}`)
        const { data } = await response.json()
        setTransactions(data || [])

        const incomeTotal = data
          ?.filter((t: any) => t.transaction_type === 'income')
          .reduce((sum: number, t: any) => sum + (t.amount || 0), 0) || 0
        const expenseTotal = data
          ?.filter((t: any) => t.transaction_type === 'expense')
          .reduce((sum: number, t: any) => sum + (t.amount || 0), 0) || 0

        setIncome(incomeTotal)
        setExpenses(expenseTotal)
      } catch (error) {
        console.error('[v0] Error fetching finance data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFinanceData()
  }, [company?.id])

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Finance"
        subtitle="Monitor your financial performance"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading financial data...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Income</p>
              <h3 className="text-2xl font-bold text-green-400">
                ${income.toFixed(2)}
              </h3>
            </Card>
            <Card className="border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
              <h3 className="text-2xl font-bold text-red-400">
                ${expenses.toFixed(2)}
              </h3>
            </Card>
            <Card className="border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
              <h3 className="text-2xl font-bold text-primary">
                ${(income - expenses).toFixed(2)}
              </h3>
            </Card>
          </div>

          {transactions.length === 0 ? (
            <Card className="border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">
                No transactions yet. Start recording your income and expenses.
              </p>
            </Card>
          ) : (
            <Card className="border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Recent Transactions
              </h2>
              <div className="space-y-2">
                {transactions.slice(0, 10).map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-2 border-b border-border"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.transaction_type === 'income'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {transaction.transaction_type === 'income' ? '+' : '-'}$
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
