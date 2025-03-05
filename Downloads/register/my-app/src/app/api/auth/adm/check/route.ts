import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '@0940Franciel';

export async function GET(request: Request) {
  try {
    const adminToken = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
    
    if (!adminToken) {
      return NextResponse.json(
        { success: false, message: 'Token não encontrado' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(adminToken, JWT_SECRET) as { isAdmin: boolean };
    
    if (!decoded.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Usuário não é administrador' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Autenticado como administrador'
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return NextResponse.json(
      { success: false, message: 'Token inválido' },
      { status: 401 }
    );
  }
} 