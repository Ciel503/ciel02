import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '@0940Franciel';

export function middleware(request: NextRequest) {
  // Rotas que precisam de autenticação administrativa
  if (request.nextUrl.pathname.startsWith('/criar-usuario')) {
    const adminToken = request.cookies.get('admin_token')?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL('/login-adm', request.url));
    }

    try {
      const decoded = jwt.verify(adminToken, JWT_SECRET) as { isAdmin: boolean };
      if (!decoded.isAdmin) {
        return NextResponse.redirect(new URL('/login-adm', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login-adm', request.url));
    }
  }

  // Rotas que precisam de autenticação de usuário
  if (request.nextUrl.pathname.startsWith('/adicionar') || 
      request.nextUrl.pathname.startsWith('/deletar')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/criar-usuario/:path*', '/adicionar/:path*', '/deletar/:path*']
}; 