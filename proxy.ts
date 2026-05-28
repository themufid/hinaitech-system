
import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export async function proxy(
  _request: NextRequest
) {
  /**
   * Temporary stable proxy
   * Prevent auth redirect loops
   */

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
