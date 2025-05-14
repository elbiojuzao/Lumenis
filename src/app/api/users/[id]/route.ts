import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const user = await User.findById(params.id).select('-senha');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuário' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Se houver atualização de senha, fazer o hash
    if (data.senha) {
      const salt = await bcrypt.genSalt(10);
      data.senha = await bcrypt.hash(data.senha, salt);
    }

    // Atualizar data de modificação
    data.ultimaAtualizacao = new Date();
    
    const user = await User.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    ).select('-senha');

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Usuário removido com sucesso' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover usuário' },
      { status: 500 }
    );
  }
} 