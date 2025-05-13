import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import dbConnect from '../lib/db';
import Product from '../models/Product';

const productsData = [
  {
    name: "Homenagem",
    price: 150.00,
    description: "Placa de homenagem personalizada em MDF com acabamento premium",
    fullDescription: "Placa de homenagem fabricada em MDF de alta qualidade, com tamanho 30x40cm, impressão em alta resolução e acabamento à prova de umidade. Perfeita para presentear em formaturas, aniversários ou homenagens póstumas.",
    imageSrc: "/products/homenagem.jpg",
    category: "memoria",
    stock: 50,
    features: [
      "Material: MDF 6mm",
      "Dimensões: 30x40cm",
      "Inclui suporte para parede",
      "Personalização gratuita"
    ],
    active: true
  },
  {
    name: "QR Code Memorial",
    price: 45.00,
    description: "Adesivo de QR Code para memorial com link personalizável",
    fullDescription: "Adesivo resistente à intempéries contendo QR Code que direciona para uma página memorial personalizada. Ideal para lápides, nichos ou memoriais. Durabilidade de até 10 anos exposto ao sol e chuva.",
    imageSrc: "/products/qrcode.jpg",
    category: "tecnologia",
    stock: 200,
    features: [
      "Tamanho: 10x10cm",
      "Adesivo vinil premium",
      "Link editável por 1 ano",
      "Inclui 2 revisões de conteúdo"
    ],
    active: true
  },
  {
    name: "Chaveiro Memorial",
    price: 25.00,
    description: "Chaveiro em acrílico com foto e mensagem personalizada",
    fullDescription: "Chaveiro memorial em acrílico de 5cm com foto impressa em alta qualidade e mensagem personalizada. Fabricado em material resistente e acompanha argola metálica anti-ferrugem.",
    imageSrc: "/products/chaveiro.jpg",
    category: "lembranca",
    stock: 150,
    features: [
      "Material: Acrílico 3mm",
      "Dimensões: 5x5cm",
      "Impressão à prova de desbotamento",
      "Entrega em até 5 dias úteis"
    ],
    active: true
  }
];

async function seedDatabase() {
  try {
    console.log("🔌 Conectando ao banco de dados...");
    await dbConnect();
    console.log("📦 Limpando coleção de produtos...");
    await Product.deleteMany({});
    console.log("📥 Inserindo produtos...");
    await Product.insertMany(productsData);
    console.log("✅ Produtos adicionados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante o seed:");
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();