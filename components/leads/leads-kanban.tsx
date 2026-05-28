'use client'

import { Card } from '@/components/ui/card'

const STATUSES = ['prospect', 'contacted', 'qualified', 'proposal', 'won', 'lost']

const STATUS_COLORS = {
  prospect: 'bg-slate-500/20 text-slate-300',
  contacted: 'bg-blue-500/20 text-blue-300',
  qualified: 'bg-purple-500/20 text-purple-300',
  proposal: 'bg-amber-500/20 text-amber-300',
  won: 'bg-green-500/20 text-green-300',
  lost: 'bg-red-500/20 text-red-300',
}

interface Lead {
  id: string
  name: string
  email?: string
  company_name?: string
  status: string
  priority: string
  estimated_value?: number
  ai_score?: number
}

interface LeadsKanbanProps {
  leads: Lead[]
}

export default function LeadsKanban({ leads }: LeadsKanbanProps) {
  const getLeadsByStatus = (status: string) => {
    return leads.filter((lead) => lead.status === status)
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {STATUSES.map((status) => {
          const statusLeads = getLeadsByStatus(status)
          return (
            <div key={status} className="w-80 flex-shrink-0">
              <div className="mb-4 space-y-2">
                <h3 className="font-semibold text-foreground capitalize">
                  {status}
                </h3>
                <div className="text-xs text-muted-foreground">
                  {statusLeads.length} leads
                </div>
              </div>

              <div className="space-y-3">
                {statusLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="border border-border bg-card p-4 cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">
                          {lead.name}
                        </h4>
                        {lead.ai_score !== undefined && (
                          <div className="flex-shrink-0">
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-xs font-bold">
                              {lead.ai_score}
                            </div>
                          </div>
                        )}
                      </div>

                      {lead.company_name && (
                        <p className="text-xs text-muted-foreground">
                          {lead.company_name}
                        </p>
                      )}

                      {lead.email && (
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.email}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        {lead.estimated_value && (
                          <span className="text-xs font-semibold text-primary">
                            ${lead.estimated_value.toFixed(2)}
                          </span>
                        )}
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-semibold capitalize ${
                            STATUS_COLORS[lead.priority as keyof typeof STATUS_COLORS] ||
                            'bg-muted/20 text-muted-foreground'
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
