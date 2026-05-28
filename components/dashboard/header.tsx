interface DashboardHeaderProps {
  title: string
  subtitle?: string
  company?: string
}

export default function DashboardHeader({
  title,
  subtitle,
  company,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
      {company && (
        <p className="text-sm text-primary">{company}</p>
      )}
    </div>
  )
}
