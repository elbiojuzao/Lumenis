import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { mockProducts, Product } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ShopPage: React.FC = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique categories from products
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));
  
  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };
  
  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Produtos de homenagens</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre aqui na nossa loja produtos para você criar uma homenagem e ter recordações.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Procurar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center md:hidden bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm"
            >
              <Filter size={20} className="mr-2 text-gray-600" />
              <span>Filtros</span>
            </button>
            
            <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
              <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Categorias
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Todas as categorias</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.imageSrc} 
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-purple-600 transition duration-150">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold text-xl">${product.price.toFixed(2)}</span>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/product/${product.id}`}
                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-150"
                      >
                        Detalhes
                      </Link>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition duration-150 flex items-center"
                      >
                        <ShoppingCart size={18} className="mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-600 text-lg mb-4">Nem um produto encontrado com este filtro</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-150"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;