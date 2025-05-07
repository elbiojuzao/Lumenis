import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, Package, CircleDollarSign, Tag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { mockOrders, mockProducts, mockWebPages } from '../../data/products';

const Dashboard: React.FC = () => {
  // Calculate some stats
  const totalSales = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const activeProducts = mockProducts.filter(p => p.active).length;
  const totalUsers = 2; // Hardcoded for demo
  const activePages = mockWebPages.filter(p => p.isPublic).length;
  
  // Recent orders
  const recentOrders = [...mockOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  return (
    <AdminLayout currentPage="dashboard">
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Sales */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <CircleDollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Sales
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          ${totalSales.toFixed(2)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/admin/orders" className="font-medium text-purple-700 hover:text-purple-900 flex items-center">
                    View all orders
                    <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Active Products */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                    <Package className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Products
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {activeProducts}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/admin/products" className="font-medium text-amber-700 hover:text-amber-900 flex items-center">
                    Manage products
                    <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Total Users */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {totalUsers}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/admin/users" className="font-medium text-blue-700 hover:text-blue-900 flex items-center">
                    View all users
                    <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Active Web Pages */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Web Pages
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {activePages}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/admin/web-pages" className="font-medium text-green-700 hover:text-green-900 flex items-center">
                    View all pages
                    <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm font-medium text-purple-600 hover:text-purple-800">
                View all
              </Link>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/admin/orders`} className="text-purple-600 hover:text-purple-900">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Sales Overview */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Performance Chart Placeholder */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
                <div className="flex space-x-3">
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 px-3 py-1 rounded-md">
                    Weekly
                  </button>
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-800 bg-purple-100 px-3 py-1 rounded-md">
                    Monthly
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 px-3 py-1 rounded-md">
                    Yearly
                  </button>
                </div>
              </div>
              
              {/* Simplified Chart Placeholder */}
              <div className="h-64 relative">
                <div className="absolute bottom-0 left-0 w-full h-40 flex items-end space-x-6 px-2">
                  {[45, 30, 60, 80, 55, 90, 70, 65, 75, 50, 85, 40].map((height, index) => (
                    <div key={index} className="flex-grow">
                      <div 
                        className="bg-purple-500 rounded-t-md w-full transition-all duration-500 ease-in-out hover:bg-purple-600" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs text-center text-gray-500 mt-1">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-0 top-0 h-full border-l border-gray-200 flex flex-col justify-between text-xs text-gray-500 py-2">
                  <div>$1000</div>
                  <div>$750</div>
                  <div>$500</div>
                  <div>$250</div>
                  <div>$0</div>
                </div>
              </div>
            </div>
            
            {/* Top Products */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
                <Link to="/admin/products" className="text-sm font-medium text-purple-600 hover:text-purple-800">
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {mockProducts.slice(0, 4).map((product, index) => (
                  <div key={product.id} className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={product.imageSrc} 
                        alt={product.name} 
                        className="h-12 w-12 object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="text-sm font-medium text-gray-900 mb-1">{product.name}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">${product.price.toFixed(2)}</span>
                        <span className={`flex items-center text-xs font-medium ${
                          index % 2 === 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {index % 2 === 0 ? (
                            <>
                              <ArrowUpRight size={14} className="mr-0.5" />
                              {Math.floor(Math.random() * 10) + 1}%
                            </>
                          ) : (
                            <>
                              <ArrowDownRight size={14} className="mr-0.5" />
                              {Math.floor(Math.random() * 10) + 1}%
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;