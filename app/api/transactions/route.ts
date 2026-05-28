import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('company_id')

    let query = supabase.from('transactions').select('*')
    if (companyId) query = query.eq('company_id', companyId)
    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
