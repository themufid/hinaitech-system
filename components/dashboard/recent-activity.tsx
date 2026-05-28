import { Card } from '@/components/ui/card'

export default function RecentActivity() {
  return (
    <Card className="border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Recent Activity
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          No recent activity yet. Start by creating your first company profile or adding leads.
        </p>
      </div>
    </Card>
  )
}
