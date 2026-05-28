
import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const supabase = await createClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      )
    }

    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .eq('owner_id', session.user.id)
      .single()

    if (error) {
      console.error(
        '[HEROIC OS] GET Company Error:',
        error
      )

      return NextResponse.json(
        {
          error: 'Company not found',
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error(
      '[HEROIC OS] GET Company Fatal Error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const supabase = await createClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      )
    }

    const body = await request.json()

    const updatePayload = {
      name: body.name ?? null,

      slug: body.slug ?? null,

      legal_name:
        body.legal_name ?? null,

      description:
        body.description ?? null,

      logo_url:
        body.logo_url ?? null,

      website:
        body.website ?? null,

      industry:
        body.industry ?? null,

      company_size:
        body.company_size ?? null,

      status:
        body.status ?? 'active',

      updated_at:
        new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('companies')
      .update(updatePayload)
      .eq('id', id)
      .eq('owner_id', session.user.id)
      .select()
      .single()

    if (error) {
      console.error(
        '[HEROIC OS] UPDATE Company Error:',
        error
      )

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error(
      '[HEROIC OS] UPDATE Company Fatal Error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const supabase = await createClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      )
    }

    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id)
      .eq('owner_id', session.user.id)

    if (error) {
      console.error(
        '[HEROIC OS] DELETE Company Error:',
        error
      )

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      '[HEROIC OS] DELETE Company Fatal Error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

