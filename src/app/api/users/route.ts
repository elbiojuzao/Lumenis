import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('-senha');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Verifica se o email já existe
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.senha, salt);

    // Criar usuário
    const user = await User.create({
      ...data,
      senha: hashedPassword,
      dataCriacao: new Date(),
      ultimaAtualizacao: new Date()
    });

    // Remover senha do retorno
    const userResponse = user.toObject();
    delete userResponse.senha;

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 400 }
    );
  }
} 