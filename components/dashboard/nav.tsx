'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function DashboardNav() {
  const router = useRouter()
  const supabase = createClient()
  const { user } = useAppStore()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-lg font-semibold text-foreground">HEROIC OS</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user?.email}
          </span>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
