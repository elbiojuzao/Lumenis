import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function middleware(request: NextRequest) {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login', '/register', '/', '/shop', '/api/auth/login', '/api/auth/register'];
  
  // Verifica se é uma rota pública ou página de produto
  if (publicRoutes.includes(request.nextUrl.pathname) || 
      request.nextUrl.pathname.startsWith('/product/')) {
    return NextResponse.next();
  }

  // Rotas da API que não precisam de autenticação
  if (request.nextUrl.pathname.startsWith('/api/products') && request.method === 'GET') {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 