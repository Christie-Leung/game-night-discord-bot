import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ["/api/:path*", "/", "/request/:path*"]
});


export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"
  ],
}