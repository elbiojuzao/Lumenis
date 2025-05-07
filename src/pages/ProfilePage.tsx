import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Mail, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/products';

const ProfilePage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const location = useLocation();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Orders for the current user
  const userOrders = mockOrders.filter(order => order.userId === currentUser?.id);
  
  useEffect(() => {
    // Check if redirected from checkout with success message
    if (location.state?.orderSuccess) {
      setShowOrderSuccess(true);
      setOrderId(location.state.orderId);
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowOrderSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && email.trim()) {
      updateUser({
        name,
        email
      });
      
      setIsEditing(false);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };
  
  if (!currentUser) {
    return <div>Carregando...</div>;
  }
  
  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Minha conta</h1>
        
        {showOrderSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
            <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Pedido realizado com sucesso!</p>
              <p className="text-sm">Obrigado pelo seu pedido. Seu pedido ID é: {orderId}</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    Editar
                  </button>
                )}
              </div>
              
              {showSuccessMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
                  <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Perfil atualizado com sucesso!</span>
                </div>
              )}
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button 
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setName(currentUser.name);
                          setEmail(currentUser.email);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                      >
                        Salvar alterações
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Username</div>
                    <div className="text-gray-900">@{currentUser.username}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Nome completo</div>
                    <div className="text-gray-900">{currentUser.name}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
                    <div className="text-gray-900">{currentUser.email}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Membro desde</div>
                    <div className="text-gray-900">
                      {new Date(currentUser.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Pedidos recentes</h2>
                <span className="text-sm text-gray-500">{userOrders.length} pedidos</span>
              </div>
              
              {userOrders.length > 0 ? (
                <div className="space-y-6">
                  {userOrders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Pedido #{order.id}</h3>
                          <p className="text-xs text-gray-500">
                            compra realizada na data {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 pb-2">
                        <h4 className="text-xs font-medium text-gray-500 mb-2">ITENS</h4>
                        <ul className="space-y-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span className="text-gray-800">
                                {item.quantity} x {item.name}
                              </span>
                              <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 flex justify-between">
                        <span className="text-sm font-medium text-gray-900">Total</span>
                        <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">Você ainda não fez nenhum pedido.</p>
                  <Link 
                    to="/shop"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                  >
                    Procurar por produtos
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gerenciar conta</h3>
              
              <nav className="space-y-2">
                <Link to="/addresses" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Gerenciar endereços
                </Link>
                
                <Link to="/my-pages" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Minhas Homenagens
                </Link>
                
                <Link to="/page-editor" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path>
                    <path d="M12 19v2"></path>
                    <path d="M12 3V1"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M19 12h2"></path>
                    <path d="M3 12h2"></path>
                    <path d="m17.66 6.34 1.41-1.41"></path>
                    <path d="m4.93 19.07 1.41-1.41"></path>
                  </svg>
                  Criar nova Homenagem
                </Link>
                
                <button className="flex items-center px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 w-full text-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sair
                </button>
              </nav>
            </div>
            
            <div className="bg-purple-50 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-purple-800 mb-3">Precisa de ajuda?</h3>
              <p className="text-sm text-purple-700 mb-4">
                Nosso time de suporte esta disponivel de segunda a sexta das 8:00 as 18:00 para auxiliar você em qualquer questão ou duvidas.
              </p>
              <a href="#" className="text-sm font-medium text-purple-700 hover:text-purple-800 inline-flex items-center">
                Contatar Suporte
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;