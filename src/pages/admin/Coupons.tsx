import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Edit, Check, X } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { mockCoupons, Coupon } from '../../data/products';

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    expiryDate: '',
    isActive: true
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const handleAddNewClick = () => {
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      isActive: true
    });
    setEditingCoupon(null);
    setShowForm(true);
  };
  
  const handleEditClick = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue.toString(),
      expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0],
      isActive: coupon.isActive
    });
    setEditingCoupon(coupon);
    setShowForm(true);
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
    
    const newCoupon = {
      id: editingCoupon ? editingCoupon.id : Math.random().toString(36).substr(2, 9),
      code: formData.code.toUpperCase(),
      discountType: formData.discountType as 'percentage' | 'fixed',
      discountValue: parseFloat(formData.discountValue),
      expiryDate: new Date(formData.expiryDate + 'T23:59:59Z').toISOString(),
      isActive: formData.isActive
    };
    
    if (editingCoupon) {
      // Update existing coupon
      setCoupons(coupons.map(c => 
        c.id === editingCoupon.id ? newCoupon : c
      ));
    } else {
      // Add new coupon
      setCoupons([...coupons, newCoupon]);
    }
    
    setShowForm(false);
    setEditingCoupon(null);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingCoupon(null);
  };
  
  const handleDelete = (couponId: string) => {
    setCoupons(coupons.filter(c => c.id !== couponId));
    setShowDeleteConfirm(null);
  };
  
  const handleToggleActive = (couponId: string) => {
    setCoupons(coupons.map(c => 
      c.id === couponId ? { ...c, isActive: !c.isActive } : c
    ));
  };
  
  // Check if coupon is expired
  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };
  
  return (
    <AdminLayout currentPage="coupons">
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Discount Coupons</h1>
            
            <button 
              onClick={handleAddNewClick}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-150 flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add Coupon
            </button>
          </div>
          
          {/* Coupon Form */}
          {showForm && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      required
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g. SUMMER25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      id="discountType"
                      name="discountType"
                      required
                      value={formData.discountType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Value {formData.discountType === 'percentage' ? '(%)' : '($)'}
                    </label>
                    <input
                      type="number"
                      id="discountValue"
                      name="discountValue"
                      required
                      min="0"
                      max={formData.discountType === 'percentage' ? '100' : undefined}
                      step={formData.discountType === 'percentage' ? '1' : '0.01'}
                      value={formData.discountValue}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                        Active (can be used by customers)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                  >
                    {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Coupons Table */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {coupons.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">
                          {coupon.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {coupon.discountType === 'percentage' 
                            ? `${coupon.discountValue}% off` 
                            : `$${coupon.discountValue.toFixed(2)} off`
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {new Date(coupon.expiryDate).toLocaleDateString()}
                            {isExpired(coupon.expiryDate) && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                Expired
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => handleToggleActive(coupon.id)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              coupon.isActive 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {coupon.isActive ? (
                              <>
                                <Check size={12} className="mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <X size={12} className="mr-1" />
                                Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-3">
                            <button 
                              onClick={() => handleEditClick(coupon)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => setShowDeleteConfirm(coupon.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                            
                            {/* Delete confirmation */}
                            {showDeleteConfirm === coupon.id && (
                              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="p-3">
                                  <p className="text-sm text-gray-700 mb-2">Delete this coupon?</p>
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      onClick={() => setShowDeleteConfirm(null)}
                                      className="px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleDelete(coupon.id)}
                                      className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No coupons found</p>
                <button 
                  onClick={handleAddNewClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                >
                  <Plus size={16} className="mr-2" />
                  Add Your First Coupon
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Coupons;