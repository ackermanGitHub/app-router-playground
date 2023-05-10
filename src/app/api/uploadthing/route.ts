/** app/api/uploadthing/route.ts */
import { ourFileRouter } from './core';
import { createNextRouteHandler } from 'uploadthing/next';

// Export routes for Next App Router
export const { POST } = createNextRouteHandler({
  router: ourFileRouter,
});
