import { connectDB } from '../db'
import { Product } from '../models'
import { products } from '../data/products'

async function seedProducts() {
  try {
    await connectDB()
    
    // Limpar produtos existentes
    await Product.deleteMany({})
    
    // Inserir novos produtos
    await Product.insertMany(products)
    
    console.log('Produtos inseridos com sucesso!')
    process.exit(0)
  } catch (error) {
    console.error('Erro ao inserir produtos:', error)
    process.exit(1)
  }
}

seedProducts() 