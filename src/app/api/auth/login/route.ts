import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, senha } = await request.json();

    const user = await User.findOne({ email }).select('+senha');
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(senha, user.senha);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Senha inválida' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user._id,
      isAdmin: user.isAdmin
    });

    // Atualizar último login
    user.ultimoLogin = new Date();
    await user.save();

    // Remover senha do retorno
    const userResponse = user.toObject();
    delete userResponse.senha;

    return NextResponse.json({
      user: userResponse,
      token
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao realizar login' },
      { status: 500 }
    );
  }
} 