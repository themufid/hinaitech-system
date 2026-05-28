import { Card } from '@/components/ui/card'

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: string
}

export default function StatCard({
  label,
  value,
  change,
  icon,
}: StatCardProps) {
  return (
    <Card className="border border-border bg-card p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          <p className="text-xs text-primary">{change} from last month</p>
        </div>
      </div>
    </Card>
  )
}
