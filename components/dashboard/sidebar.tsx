'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Company', href: '/dashboard/company', icon: '🏢' },
  { name: 'Services', href: '/dashboard/services', icon: '⚙️' },
  { name: 'Leads', href: '/dashboard/leads', icon: '👥' },
  { name: 'Sales', href: '/dashboard/sales', icon: '💼' },
  { name: 'Clients', href: '/dashboard/clients', icon: '🤝' },
  { name: 'Projects', href: '/dashboard/projects', icon: '📋' },
  { name: 'Finance', href: '/dashboard/finance', icon: '💰' },
  { name: 'Content', href: '/dashboard/content', icon: '📝' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex flex-col h-full">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-primary">HEROIC</h2>
          <p className="text-xs text-muted-foreground">Business OS</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
