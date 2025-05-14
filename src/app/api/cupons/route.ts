import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Cupom from '../../../models/Cupom';

export async function GET() {
  try {
    await connectDB();
    const cupons = await Cupom.find();
    return NextResponse.json(cupons);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar cupons' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Verifica se já existe um cupom com o mesmo código
    const existingCupom = await Cupom.findOne({ codigo: data.codigo });
    if (existingCupom) {
      return NextResponse.json(
        { error: 'Já existe um cupom com este código' },
        { status: 400 }
      );
    }

    // Validações básicas
    if (!data.codigo || !data.desconto || !data.validade) {
      return NextResponse.json(
        { error: 'Código, desconto e validade são obrigatórios' },
        { status: 400 }
      );
    }

    const cupom = await Cupom.create({
      ...data,
      usado: 0,
      ativo: true,
      dataCriacao: new Date(),
      ultimaAtualizacao: new Date()
    });

    return NextResponse.json(cupom, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar cupom' },
      { status: 400 }
    );
  }
} 