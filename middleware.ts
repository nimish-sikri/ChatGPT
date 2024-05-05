import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './utils/supabase/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser();

  if (request.url.startsWith('/share')) {
    return res;
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return res;
}

export const config = {
  matcher: ['/'],
}