import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAuthPath = path === '/login' || path === '/signup' 
  const isPublicPath = isAuthPath || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  // Logged in + on public page → redirect to profile

  if(isAuthPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  } 

  // Not logged in + on private page → redirect to login
  
  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ]

}