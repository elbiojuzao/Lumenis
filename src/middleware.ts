import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Rotas públicas
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/products',
    '/api/cupons/validate',
  ];

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Verificar token de autenticação
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Token não fornecido' },
      { status: 401 }
    );
  }

  try {
    const decoded = await verifyToken(token);
    
    // Adicionar informações do usuário ao request
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id);
    requestHeaders.set('x-user-role', decoded.isAdmin ? 'admin' : 'user');

    // Verificar rotas de admin
    const adminRoutes = [
      '/api/users',
      '/api/cupons',
      '/api/pedidos/admin',
    ];

    if (adminRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !decoded.isAdmin) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
}; 