import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('company_id')

    let query = supabase
      .from('services')
      .select('*')

    if (companyId) {
      query = query.eq('company_id', companyId)
    }

    const { data, error } = await query

    if (error) throw error

    return Response.json({ data })
  } catch (error) {
    console.error('[v0] Error fetching services:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { company_id, name, description, category, pricing_type, base_price, duration_days } = body

    const { data, error } = await supabase
      .from('services')
      .insert({
        company_id,
        name,
        description,
        category,
        pricing_type,
        base_price: base_price ? parseFloat(base_price) : null,
        duration_days: duration_days ? parseInt(duration_days) : null,
        status: 'active',
      })
      .select()
      .single()

    if (error) throw error

    return Response.json({ data }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating service:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
