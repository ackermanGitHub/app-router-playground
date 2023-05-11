import { NextResponse, type NextRequest } from 'next/server';
import { withClerkMiddleware } from '@clerk/nextjs/server';

const publicPaths = ['/sign-in*', '/sign-up*', '/api*'];

const isPublic = (reqPath: string) => {
  return publicPaths.find((publicPath) =>
    reqPath.match(new RegExp(`^${publicPath}$`.replace('*$', '($|/)')))
  );
};

export default withClerkMiddleware(() => {
  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico|site.webmanifest).*)',
};
