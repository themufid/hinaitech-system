import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

// AI Lead Scoring Logic
function scoreLead(lead: any): number {
  let score = 0

  // Email completeness: 20 points
  if (lead.email) score += 20

  // Phone completeness: 10 points
  if (lead.phone) score += 10

  // Company name provided: 15 points
  if (lead.company_name) score += 15

  // Service interested provided: 25 points
  if (lead.service_interested_id) score += 25

  // Priority bonus
  if (lead.priority === 'urgent') score += 20
  else if (lead.priority === 'high') score += 10
  else if (lead.priority === 'medium') score += 5

  // Status progression bonus
  if (lead.status === 'qualified') score += 15
  else if (lead.status === 'proposal') score += 20
  else if (lead.status === 'contacted') score += 5

  return Math.min(score, 100)
}

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
    const status = searchParams.get('status')

    let query = supabase
      .from('leads')
      .select('*')

    if (companyId) {
      query = query.eq('company_id', companyId)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    // Add AI scores to leads
    const leadsWithScores = data?.map((lead) => ({
      ...lead,
      ai_score: scoreLead(lead),
    })) || []

    return Response.json({ data: leadsWithScores })
  } catch (error) {
    console.error('[v0] Error fetching leads:', error)
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
    const { company_id, name, email, phone, company_name, service_interested_id, priority, source, notes, assigned_to } = body

    const { data, error } = await supabase
      .from('leads')
      .insert({
        company_id,
        name,
        email,
        phone,
        company_name,
        service_interested_id,
        status: 'prospect',
        priority: priority || 'medium',
        source,
        notes,
        assigned_to,
      })
      .select()
      .single()

    if (error) throw error

    const leadWithScore = {
      ...data,
      ai_score: scoreLead(data),
    }

    return Response.json({ data: leadWithScore }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating lead:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
