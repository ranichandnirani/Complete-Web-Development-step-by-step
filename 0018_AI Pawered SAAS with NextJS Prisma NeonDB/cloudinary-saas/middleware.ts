import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home"
])

const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])

export default clerkMiddleware(async (auth, req) => {
    const {userId} = await auth();
    const currentUrl = new URL(req.url);
        const isAccessingDashboard = currentUrl.pathname === "/home"
        const isApiRequest = currentUrl.pathname.startsWith("/api")

    if(userId && isPublicRoute(req) && !isAccessingDashboard) {

        return NextResponse.redirect(new URL("/home", req.url))
    }
    // not logged in 
    if(!userId) {

        // if the user is not logged in and is trying to access a protected route, redirect them to the signin page
        if(!isPublicRoute(req) && !isPublicRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }

        // if the request is for a protected API and the user is not logged in
        if(isApiRequest && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};