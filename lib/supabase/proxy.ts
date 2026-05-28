
import {
  createServerClient,
  type CookieOptions,
} from '@supabase/ssr'

import {
  NextResponse,
  type NextRequest,
} from 'next/server'

export async function updateSession(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  })

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const supabaseAnonKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY

  /**
   * Skip during build/runtime issue
   */
  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  /**
   * Create Supabase SSR Client
   */
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)
            ?.value
        },

        set(
          name: string,
          value: string,
          options: CookieOptions
        ) {
          request.cookies.set({
            name,
            value,
            ...options,
          })

          response = NextResponse.next({
            request,
          })

          response.cookies.set({
            name,
            value,
            ...options,
          })
        },

        remove(
          name: string,
          options: CookieOptions
        ) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })

          response = NextResponse.next({
            request,
          })

          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  /**
   * IMPORTANT:
   * Do not remove this
   */
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  /**
   * Prevent auth crash
   */
  if (error) {
    console.error(
      '[HEROIC OS] Auth Error:',
      error.message
    )
  }

  const pathname =
    request.nextUrl.pathname

  /**
   * Protected Routes
   */
  const protectedRoutes = [
    '/dashboard',
    '/protected',
    '/clients',
    '/finance',
    '/content',
    '/leads',
    '/settings',
  ]

  const isProtectedRoute =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

  /**
   * Auth Routes
   */
  const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/sign-up',
  ]

  const isAuthRoute =
    authRoutes.some((route) =>
      pathname.startsWith(route)
    )

  /**
   * Redirect unauthenticated users
   */
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()

    url.pathname = '/auth/login'

    return NextResponse.redirect(url)
  }

  /**
   * Redirect logged-in users away from auth pages
   */
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()

    url.pathname = '/dashboard'

    return NextResponse.redirect(url)
  }

  /**
   * Return synced response
   */
  return response
}

