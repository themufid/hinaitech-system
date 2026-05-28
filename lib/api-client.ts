import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export interface FetchOptions {
  signal?: AbortSignal
}

/**
 * Generic fetch wrapper for API calls with Supabase auth
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit & FetchOptions
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get current user session
 */
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Get current user profile
 */
export async function getCurrentProfile() {
  const session = await getSession()
  if (!session) return null

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is OK
      throw error
    }
    return data || null
  } catch (error) {
    console.error('[v0] Error fetching profile:', error)
    return null
  }
}

/**
 * Get user's company
 */
export async function getUserCompany() {
  const profile = await getCurrentProfile()
  if (!profile?.company_id) return null

  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', profile.company_id)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }
    return data || null
  } catch (error) {
    console.error('[v0] Error fetching company:', error)
    return null
  }
}
