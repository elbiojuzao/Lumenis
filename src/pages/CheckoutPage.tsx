import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { nanoid } from 'nanoid';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();
  const { addresses, currentUser } = useAuth();
  
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find(addr => addr.isMain)?.id || (addresses[0]?.id || '')
  );
  
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'bank-transfer'>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAddressId) {
      alert('Please select a shipping address');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Create new order
      const newOrder = {
        id: `ORD-${nanoid(6)}`,
        userId: currentUser?.id || '',
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        total,
        status: 'pending' as const,
        shippingAddress: addresses.find(addr => addr.id === selectedAddressId) || addresses[0],
        paymentMethod: paymentMethod === 'credit-card' ? 'Credit Card' : 'Bank Transfer',
        createdAt: new Date().toISOString()
      };
      
      // In a real app, we would save to database
      // mockOrders.push(newOrder);
      
      // Clear the cart
      clearCart();
      
      // Navigate to success page (dummy page, we'll show a confirmation instead)
      setIsProcessing(false);
      navigate('/profile', { state: { orderSuccess: true, orderId: newOrder.id } });
    }, 1500);
  };
  
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  if (addresses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Shipping Address</h1>
          <p className="text-lg text-gray-600 mb-8">
            You need to add a shipping address before you can checkout.
          </p>
          <button 
            onClick={() => navigate('/addresses')}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-150"
          >
            Add Address
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Endereço de entrega</h2>
                
                <div className="space-y-4">
                  {addresses.map(address => (
                    <div key={address.id} className="flex items-start">
                      <input
                        type="radio"
                        id={`address-${address.id}`}
                        name="shipping-address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor={`address-${address.id}`} className="ml-3 block">
                        <div className="text-gray-900 font-medium">
                          {address.street}, {address.number}
                          {address.isMain && (
                            <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                              Endereço Principal
                            </span>
                          )}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {address.complement && `${address.complement}, `}
                          {address.neighborhood}, {address.city}, {address.state} - {address.zipCode}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button 
                    type="button"
                    onClick={() => navigate('/addresses')}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    + Add novo endereço
                  </button>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Metodo de pagamento</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="credit-card" className="ml-3 block">
                      <div className="flex items-center text-gray-900 font-medium">
                        <CreditCard size={20} className="mr-2 text-gray-700" />
                        Cartão de Crédito
                      </div>
                      <div className="text-gray-600 text-sm">
                        Pagamento seguro com seu cartão de crédito
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="payment-method"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={() => setPaymentMethod('bank-transfer')}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="bank-transfer" className="ml-3 block">
                      <div className="flex items-center text-gray-900 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-700">
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <path d="M12 12h.01"></path>
                          <path d="M17 12h.01"></path>
                          <path d="M7 12h.01"></path>
                        </svg>
                        Transferencia bancaria (pix)
                      </div>
                      <div className="text-gray-600 text-sm">
                        Pagamento via transferencia bancaria
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Credit Card Form (simplified for demo purposes) */}
                {paymentMethod === 'credit-card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry-date"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="XXX"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardholder-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardholder-name"
                        placeholder="Name as it appears on card"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}
                
                {/* Bank Transfer Info */}
                {paymentMethod === 'bank-transfer' && (
                  <div className="mt-6 bg-blue-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Bank Transfer Instructions</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>After placing your order, please transfer the total amount to:</p>
                          <p className="mt-1">Bank: National Bank</p>
                          <p>Account Name: WebShop Inc.</p>
                          <p>Account Number: 1234567890</p>
                          <p>Reference: Your order number</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Checkout Button (Mobile) */}
              <div className="lg:hidden">
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full ${
                    isProcessing 
                      ? 'bg-purple-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition duration-150`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </>
                  ) : (
                    <>
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center mr-3">
                      <img 
                        src={item.product.imageSrc} 
                        alt={item.product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>Envio</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Shipping Address Summary */}
            {selectedAddress && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Enviar para:</h3>
                <div className="text-sm text-gray-600">
                  <p>
                    {selectedAddress.street}, {selectedAddress.number}
                    {selectedAddress.complement && `, ${selectedAddress.complement}`}
                  </p>
                  <p>{selectedAddress.neighborhood}</p>
                  <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipCode}</p>
                </div>
              </div>
            )}
            
            {/* Checkout Button (Desktop) */}
            <div className="mt-8 hidden lg:block">
              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                onClick={handleSubmitOrder}
                className={`w-full ${
                  isProcessing 
                    ? 'bg-purple-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition duration-150`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <Check size={20} className="mr-2" />
                    Place Order
                  </>
                )}
              </button>
            </div>
            
            {/* Secure Checkout Message */}
            <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Secure checkout - your data is protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;