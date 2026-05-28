
import { createClient } from '@/lib/supabase/server'

type CreateCompanyBody = {
  name: string
  slug?: string
  legal_name?: string
  description?: string
  logo_url?: string
  website?: string
  industry?: string
  company_size?: string
}

export async function GET() {
  try {
    /**
     * CREATE SERVER CLIENT
     */
    const supabase = await createClient()

    /**
     * VALIDATE USER
     */
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return Response.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      )
    }

    /**
     * FETCH COMPANIES
     */
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      console.error(
        '[HEROIC OS] Fetch Companies Error:',
        error
      )

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      )
    }

    return Response.json(
      {
        success: true,
        data: data ?? [],
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error(
      '[HEROIC OS] GET Companies Fatal Error:',
      error
    )

    return Response.json(
      {
        success: false,
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(
  request: Request
) {
  try {
    /**
     * CREATE SERVER CLIENT
     */
    const supabase = await createClient()

    /**
     * VALIDATE AUTH
     */
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return Response.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      )
    }

    /**
     * REQUEST BODY
     */
    const body =
      (await request.json()) as CreateCompanyBody

    /**
     * VALIDATION
     */
    if (!body.name?.trim()) {
      return Response.json(
        {
          success: false,
          error: 'Company name is required',
        },
        {
          status: 400,
        }
      )
    }

    /**
     * ENSURE PROFILE EXISTS
     * IMPORTANT FOR FK
     */
    const { data: existingProfile } =
      await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!existingProfile) {
      const { error: profileError } =
        await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            role: 'admin',
          })

      if (profileError) {
        console.error(
          '[HEROIC OS] Profile Create Error:',
          profileError
        )

        return Response.json(
          {
            success: false,
            error:
              'Failed to create user profile',
          },
          {
            status: 500,
          }
        )
      }
    }

    /**
     * SAFE SLUG
     */
    const generatedSlug =
      body.slug?.trim() ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

    /**
     * INSERT COMPANY
     */
    const { data, error } = await supabase
      .from('companies')
      .insert({
        name: body.name.trim(),

        slug: generatedSlug,

        legal_name:
          body.legal_name?.trim() || null,

        description:
          body.description?.trim() || null,

        logo_url:
          body.logo_url?.trim() || null,

        website:
          body.website?.trim() || null,

        industry:
          body.industry?.trim() || null,

        company_size:
          body.company_size?.trim() || null,

        owner_id: user.id,
      })
      .select()
      .single()

    /**
     * HANDLE INSERT ERROR
     */
    if (error) {
      console.error(
        '[HEROIC OS] Create Company Error:',
        error
      )

      /**
       * DUPLICATE SLUG
       */
      if (error.code === '23505') {
        return Response.json(
          {
            success: false,
            error:
              'Company slug already exists',
          },
          {
            status: 409,
          }
        )
      }

      /**
       * FOREIGN KEY ERROR
       */
      if (error.code === '23503') {
        return Response.json(
          {
            success: false,
            error:
              'User profile relation failed',
          },
          {
            status: 500,
          }
        )
      }

      /**
       * RLS ERROR
       */
      if (error.code === '42501') {
        return Response.json(
          {
            success: false,
            error:
              'Row level security policy blocked request',
          },
          {
            status: 403,
          }
        )
      }

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      )
    }

    /**
     * SUCCESS
     */
    return Response.json(
      {
        success: true,
        data,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(
      '[HEROIC OS] POST Companies Fatal Error:',
      error
    )

    return Response.json(
      {
        success: false,
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

