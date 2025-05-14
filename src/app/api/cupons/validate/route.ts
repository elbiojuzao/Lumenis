import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Cupom from '../../../../models/Cupom';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { codigo } = await request.json();

    const cupom = await Cupom.findOne({ codigo });

    if (!cupom) {
      return NextResponse.json(
        { error: 'Cupom não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se o cupom está ativo
    if (!cupom.ativo) {
      return NextResponse.json(
        { error: 'Cupom inativo' },
        { status: 400 }
      );
    }

    // Verifica se o cupom está dentro da validade
    if (new Date() > new Date(cupom.validade)) {
      return NextResponse.json(
        { error: 'Cupom expirado' },
        { status: 400 }
      );
    }

    // Verifica limite de uso se houver
    if (cupom.limiteUso && cupom.usado >= cupom.limiteUso) {
      return NextResponse.json(
        { error: 'Limite de uso do cupom atingido' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valido: true,
      desconto: cupom.desconto,
      tipo: cupom.tipo // 'percentual' ou 'valor'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao validar cupom' },
      { status: 500 }
    );
  }
} 