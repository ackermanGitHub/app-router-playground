import { withClerkMiddleware } from '@clerk/nextjs/server';

export default withClerkMiddleware();

// Stop Middleware running on static files and public folder
export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico|site.webmanifest).*)',
};
