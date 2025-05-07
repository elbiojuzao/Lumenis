import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, RefreshCw, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { 
    items, 
    totalItems, 
    subtotal, 
    shipping, 
    total, 
    couponCode, 
    discount,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon
  } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    const success = applyCoupon(couponInput);
    
    if (success) {
      setCouponSuccess('Coupon applied successfully!');
      setCouponError('');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setCouponSuccess('');
      }, 3000);
    } else {
      setCouponError('Invalid coupon code');
      setCouponSuccess('');
    }
  };
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponInput('');
    setCouponError('');
    setCouponSuccess('');
  };
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-4">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Add some products to your cart to continue shopping
          </p>
          <Link 
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-150"
          >
            <ShoppingCart size={20} className="mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Carrinho de compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
              </h2>
            </div>
            
            {items.map((item) => (
              <div key={item.product.id} className="flex flex-col sm:flex-row py-6 border-b last:border-b-0">
                <div className="sm:w-24 sm:h-24 w-full h-40 mb-4 sm:mb-0 flex-shrink-0">
                  <img 
                    src={item.product.imageSrc} 
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="sm:ml-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        <Link to={`/product/${item.product.id}`} className="hover:text-purple-600">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{item.product.description}</p>
                    </div>
                    <div className="mt-1 sm:mt-0 flex flex-row-reverse sm:flex-col sm:items-end">
                      <p className="text-lg font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mr-2 sm:mr-0">${item.product.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-32">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150"
                      >
                        <Minus size={14} />
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-14 h-8 text-center focus:outline-none border-x border-gray-300"
                      />
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 transition duration-150 flex items-center"
                    >
                      <Trash2 size={18} className="mr-1" />
                      <span>Remover</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-8 flex justify-between items-center">
              <Link 
                to="/shop"
                className="flex items-center text-purple-600 hover:text-purple-800 transition duration-150"
              >
                <RefreshCw size={18} className="mr-2" />
                Continuar Compra
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Pedido</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-700">
                <span>Subtotal</span>
                <span>R${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-700">
                <span>Frete</span>
                <span>R${shipping.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <div className="flex items-center">
                    <span>Desconto</span>
                    {couponCode && (
                      <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        {couponCode}
                      </span>
                    )}
                  </div>
                  <span>-R${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-semibold text-lg text-gray-900">
                  <span>Total</span>
                  <span>R${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Coupon Form */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Coupom de desconto</h3>
              
              {!couponCode ? (
                <form onSubmit={handleCouponSubmit} className="flex items-start">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Cupom de desconto"
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    {couponError && <p className="mt-1 text-xs text-red-600">{couponError}</p>}
                    {couponSuccess && <p className="mt-1 text-xs text-green-600">{couponSuccess}</p>}
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition duration-150"
                  >
                    Aplicar
                  </button>
                </form>
              ) : (
                <div className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded-md">
                  <div>
                    <span className="text-sm font-medium text-purple-800">{couponCode}</span>
                    <span className="ml-2 text-xs text-purple-600">Aplicado</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500">
                <p>Try these coupons: WELCOME10, FREESHIP</p>
              </div>
            </div>
            
            {/* Checkout Button */}
            <div className="mt-8">
              <Link 
                to="/checkout"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center transition duration-150"
              >
                Proceguir com pagamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;