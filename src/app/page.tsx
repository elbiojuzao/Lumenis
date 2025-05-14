import Link from 'next/link'
import { ShoppingBag, Heart, Gift } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-purple-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-purple-900 mb-6">
              Presentes que Encantam, Momentos que Ficam
            </h1>
            <p className="text-xl text-purple-700 mb-8">
              Descubra nossa coleção exclusiva de produtos artesanais e personalizados para tornar cada momento especial.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ShoppingBag className="mr-2" />
              Explorar Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Presentes Personalizados</h3>
              <p className="text-gray-600">Presentes únicos feitos especialmente para você</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lembranças Especiais</h3>
              <p className="text-gray-600">Itens que tornam momentos inesquecíveis</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kits Exclusivos</h3>
              <p className="text-gray-600">Combinações perfeitas para presentear</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Produto 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  src="/images/vela-lavanda.jpg"
                  alt="Vela Aromática Lavanda"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Vela Aromática Lavanda</h3>
                <p className="text-gray-600 mb-4">Fragrância relaxante para seu ambiente</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-bold">R$ 45,90</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                    Comprar
                  </button>
                </div>
              </div>
            </div>

            {/* Produto 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  src="/images/difusor-vanilla.jpg"
                  alt="Difusor de Ambiente Vanilla"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Difusor de Ambiente Vanilla</h3>
                <p className="text-gray-600 mb-4">Aroma suave e envolvente</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-bold">R$ 89,90</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Encontrar o Presente Perfeito?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore nossa coleção completa e descubra presentes únicos que combinam com cada ocasião especial.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </section>
    </div>
  )
} 