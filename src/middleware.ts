import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token) {
    // If the user is already authenticated and tries to access sign-in, sign-up, or verify pages, redirect to dashboard
    if (
      url.pathname === '/sign-in' ||
      url.pathname === '/sign-up' ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/'
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // If the user is not authenticated and tries to access the dashboard, redirect to sign-in
    if (url.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Allow the request to proceed if none of the conditions above are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*'],
};
