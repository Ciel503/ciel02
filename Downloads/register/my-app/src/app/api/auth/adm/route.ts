import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { LoginAdm } from '@/models/LoginAdm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || '@0940Franciel';

export async function POST(request: Request) {
  try {
    console.log('Iniciando processo de login administrativo...');
    await dbConnect();
    const { email, senha } = await request.json();
    console.log('Email recebido:', email);

    // Buscar o administrador no banco de dados
    const admin = await LoginAdm.findOne({ email });
    console.log('Admin encontrado:', admin ? 'Sim' : 'Não');

    if (!admin) {
      console.log('Admin não encontrado');
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, admin.senha);
    console.log('Senha válida:', senhaValida);

    if (!senhaValida) {
      console.log('Senha incorreta');
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    // Criar token JWT
    const token = jwt.sign(
      { 
        id: admin._id,
        email: admin.email,
        isAdmin: true
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('Token gerado com sucesso');

    // Criar resposta com cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login realizado com sucesso'
    });

    // Configurar cookie com todas as opções necessárias
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: false, // Desabilitado para desenvolvimento local
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      domain: 'localhost'
    });
    console.log('Cookie configurado com sucesso');

    // Adicionar headers CORS necessários
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Erro detalhado no login administrativo:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
} 