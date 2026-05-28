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
      .from('contracts')
      .select('*')

    if (companyId) {
      query = query.eq('company_id', companyId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return Response.json({ data })
  } catch (error) {
    console.error('[v0] Error fetching contracts:', error)
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
    const { company_id, quotation_id, contract_number, client_name, contract_value, start_date, end_date, terms } = body

    const { data, error } = await supabase
      .from('contracts')
      .insert({
        company_id,
        quotation_id,
        contract_number,
        client_name,
        contract_value: contract_value ? parseFloat(contract_value) : null,
        start_date,
        end_date,
        status: 'draft',
        terms,
        created_by: session.user.id,
      })
      .select()
      .single()

    if (error) throw error

    return Response.json({ data }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating contract:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
