import { NextResponse, type NextRequest } from 'next/server';
import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server';

const publicPaths = ['/sign-in*', '/sign-up*', '/api*'];
const protectedPaths = ['/admin/*'];

const isPublic = (reqPath: string) => {
  return publicPaths.find((publicPath) =>
    reqPath.match(new RegExp(`^${publicPath}$`.replace('*$', '($|/)')))
  );
};

const isProtected = (reqPath: string) => {
  return protectedPaths.find((protectedPath) =>
    reqPath.match(new RegExp(`^${protectedPath}$`.replace('*$', '($|/)')))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (isProtected(request.nextUrl.pathname)) {
    const { userId } = getAuth(request);
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico|site.webmanifest).*)',
};
