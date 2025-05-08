import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, MapPin, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AddressPage: React.FC = () => {
  const { addresses, addAddress, updateAddress, removeAddress, setMainAddress } = useAuth();
  const navigate = useNavigate();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    isMain: false
  });
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const handleAddNewClick = () => {
    setFormData({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      isMain: addresses.length === 0 // Set as main if it's the first address
    });
    setEditingId(null);
    setShowForm(true);
  };
  
  const handleEditClick = (addressId: string) => {
    const address = addresses.find(addr => addr.id === addressId);
    
    if (address) {
      setFormData({
        street: address.street,
        number: address.number,
        complement: address.complement || '',
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        isMain: address.isMain
      });
      setEditingId(addressId);
      setShowForm(true);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing address
      updateAddress(editingId, formData);
    } else {
      // Add new address
      addAddress(formData);
    }
    
    setShowForm(false);
    setEditingId(null);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };
  
  const handleDelete = (addressId: string) => {
    removeAddress(addressId);
    setShowDeleteConfirm(null);
  };
  
  const handleSetMain = (addressId: string) => {
    setMainAddress(addressId);
  };
  
  // US states for the demo
  const states = [
    'Acre (AC)',
    'Alagoas (AL)',
    'Amapá (AP)',
    'Amazonas (AM)',
    'Bahia (BA)',
    'Ceará (CE)',
    'Distrito Federal (DF)',
    'Espírito Santo (ES)',
    'Goiás (GO)',
    'Maranhão (MA)',
    'Mato Grosso (MT)',
    'Mato Grosso do Sul (MS)',
    'Minas Gerais (MG)',
    'Pará (PA)',
    'Paraíba (PB)',
    'Paraná (PR)',
    'Pernambuco (PE)',
    'Piauí (PI)',
    'Rio de Janeiro (RJ)',
    'Rio Grande do Norte (RN)',
    'Rio Grande do Sul (RS)',
    'Rondônia (RO)',
    'Roraima (RR)',
    'Santa Catarina (SC)',
    'São Paulo (SP)',
    'Sergipe (SE)',
    'Tocantins (TO)'
  ];
  
  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Voltar para perfil
          </button>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Meus Endereços</h1>
        
        {/* Address List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Endereços salvos</h2>
            
            {addresses.length < 3 && (
              <button 
                onClick={handleAddNewClick}
                className="flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add novo endereço
              </button>
            )}
          </div>
          
          {addresses.length > 0 ? (
            <div className="space-y-6">
              {addresses.map(address => (
                <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                  {/* Actions dropdown */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {!address.isMain && (
                      <button 
                        onClick={() => handleSetMain(address.id)}
                        className="text-gray-500 hover:text-purple-600 p-1"
                        title="Set as main address"
                      >
                        <Home size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleEditClick(address.id)}
                      className="text-gray-500 hover:text-blue-600 p-1"
                      title="Edit address"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(address.id)}
                      className="text-gray-500 hover:text-red-600 p-1"
                      title="Delete address"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    {/* Delete confirmation */}
                    {showDeleteConfirm === address.id && (
                      <div className="absolute right-0 top-8 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                        <div className="p-3">
                          <p className="text-sm text-gray-700 mb-2">Excluir este endereço?</p>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleDelete(address.id)}
                              className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 p-2 rounded-full ${
                      address.isMain ? 'bg-purple-100' : 'bg-gray-100'
                    } mr-4`}>
                      <MapPin size={20} className={address.isMain ? 'text-purple-600' : 'text-gray-500'} />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-gray-900">
                          {address.street}, {address.number}
                        </h3>
                        {address.isMain && (
                          <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Home size={12} className="mr-1" />
                            Principal
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {address.complement && <p>{address.complement}</p>}
                        <p>{address.neighborhood}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 rounded-full p-3">
                  <MapPin size={24} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Sem endereços salvos</h3>
              <p className="text-gray-500 mb-6">Adicionar um endereço de entrega</p>
              <button 
                onClick={handleAddNewClick}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
              >
                <Plus size={18} className="mr-2" />
                Adicione seu primeiro endereço
              </button>
            </div>
          )}
        </div>
        
        {/* Address Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Rua
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                    Numero
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento (Opcional)
                  </label>
                  <input
                    type="text"
                    id="complement"
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                    placeholder="Apt, Suite, Unit, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    required
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    id="isMain"
                    name="isMain"
                    type="checkbox"
                    checked={formData.isMain}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isMain" className="ml-2 block text-sm text-gray-700">
                    Selecionar como meu endereço principal
                  </label>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                >
                  {editingId ? 'Salvar endereço' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressPage;