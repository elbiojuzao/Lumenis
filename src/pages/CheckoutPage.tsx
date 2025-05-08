import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Check, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

type Address = {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, discount, total } = useCart();
  const { addresses, currentUser } = useAuth();
  
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'mercado-pago' | 'pix'>('mercado-pago');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializa com o endereço principal ou o primeiro disponível
  useEffect(() => {
    if (addresses.length > 0) {
      const mainAddress = addresses.find(addr => addr.isMain) || addresses[0];
      setSelectedAddressId(mainAddress.id);
    }
  }, [addresses]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAddressId) {
      setError('Selecione um endereço de entrega');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Criar preferência no Mercado Pago
      const response = await fetch('http://localhost:3000/api/create-mercado-pago-preference', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            title: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.price,
          })),
          userId: currentUser?.id,
          addressId: selectedAddressId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar pagamento');
      }

      const { preferenceId } = await response.json();

      // 2. Redirecionar para o checkout do Mercado Pago
      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;

    } catch (err) {
      console.error('Erro no checkout:', err);
      setError('Erro ao processar pagamento. Tente novamente.');
      setIsProcessing(false);
    }
  };

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  // Redireciona se o carrinho estiver vazio
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  // Caso não tenha endereços cadastrados
  if (addresses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Nenhum endereço cadastrado</h1>
          <p className="text-lg text-gray-600 mb-8">
            Você precisa cadastrar um endereço antes de finalizar a compra.
          </p>
          <button 
            onClick={() => navigate('/addresses')}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-150"
          >
            Cadastrar Endereço
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              {/* Seção de Endereço */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Endereço de Entrega</h2>
                
                <div className="space-y-4">
                  {addresses.map((address: Address) => (
                    <div key={address.id} className="flex items-start">
                      <input
                        type="radio"
                        id={`address-${address.id}`}
                        name="shipping-address"
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor={`address-${address.id}`} className="ml-3 block">
                        <div className="text-gray-900 font-medium">
                          {address.street}, {address.number}
                          {address.isMain && (
                            <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                              Principal
                            </span>
                          )}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {address.complement && `${address.complement}, `}
                          {address.neighborhood}, {address.city} - {address.state}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => navigate('/addresses')}
                  className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  + Adicionar novo endereço
                </button>
              </div>

              {/* Seção de Pagamento */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Método de Pagamento</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="mercado-pago"
                      name="payment-method"
                      checked={paymentMethod === 'mercado-pago'}
                      onChange={() => setPaymentMethod('mercado-pago')}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="mercado-pago" className="ml-3 block">
                      <div className="flex items-center text-gray-900 font-medium">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Mercado Pago
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        Cartão de crédito, débito ou boleto
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="pix"
                      name="payment-method"
                      checked={paymentMethod === 'pix'}
                      onChange={() => setPaymentMethod('pix')}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="pix" className="ml-3 block">
                      <div className="flex items-center text-gray-900 font-medium">
                        <Banknote className="mr-2 h-5 w-5" />
                        Pix
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        Pagamento instantâneo
                      </div>
                    </label>
                  </div>
                </div>

                {/* Informações de Segurança */}
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Pagamento Seguro</h3>
                      <p className="mt-1 text-sm text-blue-700">
                        Todos os pagamentos são processados pelo Mercado Pago, garantindo a segurança dos seus dados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de Finalizar Compra (Mobile) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition duration-150 disabled:bg-purple-400 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Finalizar Compra - R$ {total.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center mr-3 overflow-hidden">
                      {item.product.imageSrc ? (
                        <img 
                          src={item.product.imageSrc} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">Sem imagem</div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-R$ {discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3 mt-2">
                <div className="flex justify-between items-center font-semibold text-gray-900">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Endereço Selecionado */}
            {selectedAddress && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Enviar para:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{selectedAddress.street}, {selectedAddress.number}</p>
                  {selectedAddress.complement && <p>{selectedAddress.complement}</p>}
                  <p>{selectedAddress.neighborhood}</p>
                  <p>{selectedAddress.city} - {selectedAddress.state}</p>
                  <p>CEP: {selectedAddress.zipCode}</p>
                </div>
              </div>
            )}

            {/* Botão de Finalizar Compra (Desktop) */}
            <div className="mt-8 hidden lg:block">
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                onClick={handleSubmitOrder}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition duration-150 disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Finalizar Compra
                  </>
                )}
              </button>
            </div>

            {/* Selo de Segurança */}
            <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
              <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Compra segura - Seus dados estão protegidos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;