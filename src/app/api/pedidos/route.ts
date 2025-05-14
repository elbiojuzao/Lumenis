import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Pedido from '../../../models/Pedido';

export async function GET() {
  try {
    await connectDB();
    const pedidos = await Pedido.find()
      .populate('userId', 'nome email')
      .populate('enderecoEntrega')
      .populate('produtos.produto')
      .sort({ dataCriacao: -1 });
    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Validações básicas
    if (!data.userId || !data.produtos || !data.enderecoEntrega) {
      return NextResponse.json(
        { error: 'Usuário, produtos e endereço de entrega são obrigatórios' },
        { status: 400 }
      );
    }

    // Calcula o total do pedido
    const total = data.produtos.reduce((acc: number, item: any) => {
      return acc + (item.preco * item.quantidade);
    }, 0);

    // Aplica desconto do cupom se houver
    let totalFinal = total;
    if (data.cupom) {
      if (data.cupom.tipo === 'percentual') {
        totalFinal = total * (1 - data.cupom.desconto / 100);
      } else {
        totalFinal = total - data.cupom.desconto;
      }
    }

    const pedido = await Pedido.create({
      ...data,
      status: 'pendente',
      total,
      totalFinal,
      dataCriacao: new Date(),
      ultimaAtualizacao: new Date()
    });

    // Popula os dados relacionados no retorno
    await pedido.populate([
      { path: 'userId', select: 'nome email' },
      { path: 'enderecoEntrega' },
      { path: 'produtos.produto' }
    ]);

    return NextResponse.json(pedido, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 400 }
    );
  }
} 