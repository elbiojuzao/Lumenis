import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Tag, 
  CircleDollarSign,
  Menu, 
  X, 
  ChevronRight,
  LogOut,
  PenSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, current: currentPage === 'dashboard' },
    { name: 'Orders', href: '/admin/orders', icon: CircleDollarSign, current: currentPage === 'orders' },
    { name: 'Products', href: '/admin/products', icon: Package, current: currentPage === 'products' },
    { name: 'Coupons', href: '/admin/coupons', icon: Tag, current: currentPage === 'coupons' },
    { name: 'Users', href: '/admin/users', icon: Users, current: currentPage === 'users' },
    { name: 'Web Pages', href: '/admin/web-pages', icon: FileText, current: currentPage === 'web-pages' },
  ];
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 z-40 transition-opacity ease-linear duration-300`}>
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
      </div>
      
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 z-50 md:hidden`}>
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-gray-800">
          <div className="flex items-center">
            <PenSquare className="text-purple-400 h-6 w-6" />
            <span className="text-white font-medium ml-2">WebShop Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-purple-400' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="px-2 py-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="group flex items-center px-2 py-2 w-full text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Logout
            </button>
            <Link
              to="/"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white mt-2"
            >
              <ChevronRight className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-900">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
              <PenSquare className="text-purple-400 h-6 w-6" />
              <span className="text-white font-medium ml-2">WebShop Admin</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        item.current ? 'text-purple-400' : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="px-2 py-4 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="group flex items-center px-2 py-2 w-full text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
                  Logout
                </button>
                <Link
                  to="/"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white mt-2"
                >
                  <ChevronRight className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
                  Back to Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden px-4 text-gray-500 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-sm text-gray-700 mr-2">Admin User</span>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;