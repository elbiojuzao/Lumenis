import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Address from '../../../models/Address';

export async function GET() {
  try {
    await connectDB();
    const addresses = await Address.find();
    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar endereços' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Se for definido como principal, desativa outros endereços principais do usuário
    if (data.isMain) {
      await Address.updateMany(
        { userId: data.userId, isMain: true },
        { isMain: false }
      );
    }

    const address = await Address.create({
      ...data,
      dataCriacao: new Date(),
      ultimaAtualizacao: new Date()
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar endereço' },
      { status: 400 }
    );
  }
} 