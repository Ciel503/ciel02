import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('Middleware - Rota acessada:', pathname);

  // Se estiver na página de login administrativo e já estiver autenticado, redirecionar para criar-usuario
  if (pathname === '/login-adm') {
    const adminToken = request.cookies.get('admin_token')?.value;
    console.log('Middleware - Token admin presente:', !!adminToken);

    if (adminToken) {
      console.log('Middleware - Redirecionando para criar-usuario');
      return NextResponse.redirect(new URL('/criar-usuario', request.url));
    }
    return NextResponse.next();
  }

  // Rotas que precisam de autenticação administrativa
  if (pathname.startsWith('/criar-usuario')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    console.log('Middleware - Verificando acesso a criar-usuario, token presente:', !!adminToken);

    if (!adminToken) {
      console.log('Middleware - Sem token admin, redirecionando para login');
      return NextResponse.redirect(new URL('/login-adm', request.url));
    }

    console.log('Middleware - Acesso permitido a criar-usuario');
    return NextResponse.next();
  }

  // Rotas que precisam de autenticação de usuário
  if (pathname.startsWith('/adicionar') || pathname.startsWith('/deletar')) {
    const token = request.cookies.get('token')?.value;
    console.log('Middleware - Verificando acesso a rotas protegidas, token presente:', !!token);

    if (!token) {
      console.log('Middleware - Sem token, redirecionando para login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('Middleware - Token presente, acesso permitido');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login-adm', '/criar-usuario/:path*', '/adicionar/:path*', '/deletar/:path*']
}; 