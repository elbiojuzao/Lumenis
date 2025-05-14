import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Product from '../../../../models/Product';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const data = await request.json();
    
    const product = await Product.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Produto removido com sucesso' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover produto' },
      { status: 500 }
    );
  }
} 