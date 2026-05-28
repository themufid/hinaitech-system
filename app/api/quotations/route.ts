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
      .from('quotations')
      .select('*')

    if (companyId) {
      query = query.eq('company_id', companyId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return Response.json({ data })
  } catch (error) {
    console.error('[v0] Error fetching quotations:', error)
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
    const { company_id, lead_id, quote_number, total_amount, tax_amount, discount_amount, valid_until } = body

    const { data, error } = await supabase
      .from('quotations')
      .insert({
        company_id,
        lead_id,
        quote_number,
        total_amount: parseFloat(total_amount),
        tax_amount: tax_amount ? parseFloat(tax_amount) : 0,
        discount_amount: discount_amount ? parseFloat(discount_amount) : 0,
        status: 'draft',
        valid_until,
        created_by: session.user.id,
      })
      .select()
      .single()

    if (error) throw error

    return Response.json({ data }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating quotation:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
