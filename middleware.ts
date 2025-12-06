import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const config = {
  matcher: ['/dashboard/:path*', '/:token*'],
};

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. ADMIN LOGIN PROTECTION
  if (path.startsWith('/dashboard')) {
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      const authValue = authHeader.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASS) {
        return NextResponse.next();
      }
    }
    return new NextResponse('Auth Required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // 2. PUBLIC LINK REDIRECT
  if (path.startsWith('/_next') || path.startsWith('/api') || path === '/' || path.includes('.')) {
    return NextResponse.next();
  }

  const token = path.replace('/', '');
  // Redis se instant URL nikalo
  const destination = await kv.get<string>(`link:${token}`);

  if (destination) {
    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}
