import { create } from 'zustand'

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: string
  company_id?: string
  avatar_url?: string
}

interface Company {
  id: string
  name: string
  slug: string
  logo_url?: string
  industry?: string
}

interface AppState {
  user: User | null
  company: Company | null
  loading: boolean
  setUser: (user: User | null) => void
  setCompany: (company: Company | null) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  company: null,
  loading: true,
  setUser: (user) => set({ user }),
  setCompany: (company) => set({ company }),
  setLoading: (loading) => set({ loading }),
}))
