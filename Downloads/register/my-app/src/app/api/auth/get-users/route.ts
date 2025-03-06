import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    
    if (!mongoose.connection.db) {
      throw new Error('Conexão com o banco de dados não estabelecida');
    }

    const users = await mongoose.connection.db.collection('user').find({}).toArray();
    
    // Remover a senha dos usuários antes de enviar
    const usersWithoutPassword = users.map(user => ({
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt
    }));

    return NextResponse.json({ success: true, users: usersWithoutPassword });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'ID do usuário não fornecido' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    if (!mongoose.connection.db) {
      throw new Error('Conexão com o banco de dados não estabelecida');
    }

    const result = await mongoose.connection.db.collection('user').deleteOne({
      _id: new ObjectId(userId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar usuário' },
      { status: 500 }
    );
  }
} 