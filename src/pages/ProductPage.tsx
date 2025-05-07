import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Plus, Minus, Check } from 'lucide-react';
import { mockProducts, Product } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Redirect to shop if product not found
      navigate('/shop');
    }
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAddedToCart(true);
      
      // Reset added state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };
  
  const handleQuantityChange = (value: number) => {
    // Ensure quantity is between 1 and 10
    const newQuantity = Math.min(Math.max(1, value), 10);
    setQuantity(newQuantity);
  };
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center text-gray-600 hover:text-purple-600 transition duration-150"
          >
            <ChevronLeft size={20} className="mr-1" />
            Voltar para Shop
          </button>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.imageSrc} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-xl font-bold text-purple-600 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-700">{product.fullDescription}</p>
            </div>
            
            {/* Stock Status */}
            <div className="mb-6">
              <p className="text-gray-700">
                Disponibilidade: 
                <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {product.stock > 0 ? 'Em estoque' : 'Indisponivel'}
                </span>
              </p>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-36">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 h-10 text-center focus:outline-none border-x border-gray-300"
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150"
                  disabled={quantity >= 10}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center transition duration-200 ${
                  addedToCart 
                    ? 'bg-green-600 text-white' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Adicionado ao carrinho
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    Adicionar ao carrinho
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;