import { Product } from '../models'

export const products: Partial<Product>[] = [
  {
    nome: 'Vela Aromática Lavanda',
    descricao: 'Vela aromática artesanal com fragrância de lavanda',
    preco: 45.90,
    categoria: 'Velas',
    imagens: ['/images/vela-lavanda.jpg'],
    estoque: 50
  },
  {
    nome: 'Difusor de Ambiente Vanilla',
    descricao: 'Difusor de ambiente com aroma de baunilha',
    preco: 89.90,
    categoria: 'Difusores',
    imagens: ['/images/difusor-vanilla.jpg'],
    estoque: 30
  }
] 